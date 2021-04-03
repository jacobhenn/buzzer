use crate::command::Command;
use crate::registry::{Connect, Disconnect};
use crate::state::State;
use crate::structs::CmdStr;
use actix::{Actor, ActorContext, Addr, AsyncContext, Handler, StreamHandler};
use actix_web_actors::{
    ws,
    ws::{CloseCode, CloseReason},
};
use log::{info, trace, warn};
use serde_json;
use std::time::{Duration, Instant};
use uuid::Uuid;
use std::fmt;

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(10);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(15);

pub struct Connection {
    pub last_beat: Instant,
    pub state: Addr<State>,
    pub id: Uuid,
    pub players: Vec<String>,
}

impl Connection {
    pub fn identify(&self) -> String {
        if self.players.len() != 0 {
            self.players.join(" & ")
        } else {
            self.id.to_string()
        }
    }

    fn beat_heart(&mut self) {
        self.last_beat = Instant::now();
    }

    fn start_beat(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.last_beat) > CLIENT_TIMEOUT {
                warn!("{} timed out, disconnecting", act.identify());
                act.state.do_send(Disconnect(act.id));
                ctx.stop();
            } else {
                trace!("pinging {}", act.identify());
                ctx.ping(b"");
            }
        });
    }
}

impl Actor for Connection {
    type Context = ws::WebsocketContext<Self>;

    // Register a new client and send them the current state
    fn started(&mut self, ctx: &mut Self::Context) {
        info!("a new client is connecting as {}", self.identify());
        let tx = ctx.address().recipient();
        self.state.do_send(Connect(self.id, tx));
        self.start_beat(ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        self.state.do_send(Disconnect(self.id));
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Connection {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(txt)) => {
                let cmd_res: serde_json::Result<Command> = serde_json::from_str(&txt);

                match cmd_res {
                    Ok(cmd) => {
                        if let Command::AddPlayer { ref name } = cmd {
                            self.players.push(name.to_string());
                        }
                        self.state.do_send(cmd);
                    }
                    Err(e) => {
                        warn!("recieved invalid data from {} ({})", self.identify(), e);
                        ctx.close(Some(CloseReason {
                            code: CloseCode::Protocol,
                            description: Some(format!("{}", e)),
                        }));
                        ctx.stop();
                    }
                }
            }
            Ok(ws::Message::Binary(_)) => {
                info!(
                    "recieved unsuppourted data from {}, closing socket...",
                    self.identify(),
                );
                ctx.close(Some(CloseReason {
                    code: CloseCode::Unsupported,
                    description: Some("this endpoint doesn't accept binary data".to_string()),
                }));
                ctx.stop();
            }
            Ok(ws::Message::Continuation(_)) => {
                info!(
                    "recieved a continuation frame from {}, closing socket...",
                    self.identify(),
                );
                ctx.close(Some(CloseReason {
                    code: CloseCode::Size,
                    description: Some(
                        "this endpoint doesn't accept continuation frames".to_string(),
                    ),
                }));
                ctx.stop();
            }
            Ok(ws::Message::Ping(msg)) => {
                self.beat_heart();
                ctx.pong(&msg);
            }
            Ok(ws::Message::Pong(_)) => self.beat_heart(),
            Ok(ws::Message::Close(reason)) => {
                if let Some(CloseReason { code, description }) = reason {
                    info!(
                        "{} closed their connection: {}",
                        self.identify(),
                        description.unwrap_or(format!("{:?}", code)),
                    );
                } else {
                    info!("{} has closed for an unknown reason", self.identify());
                }
            }
            Ok(ws::Message::Nop) => (),
            Err(e) => {
                warn!(
                    "protocol error in a frame from {}: {}, closing socket...",
                    self.identify(), e
                );
            }
        }
    }
}

impl Handler<CmdStr> for Connection {
    type Result = ();

    fn handle(&mut self, CmdStr(msg): CmdStr, ctx: &mut Self::Context) {
        ctx.text(msg);
    }
}
