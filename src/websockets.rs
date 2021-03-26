use crate::command::Command;
use crate::structs::{CmdStr, State};
use crate::registry::{Registry, Connect, Disconnect};
use std::time::{Duration, Instant};
use std::sync::{Arc, RwLock};
use serde_json;
use actix::{Actor, StreamHandler, ActorContext, AsyncContext, Handler, Addr};
use actix_web_actors::{ws, ws::{CloseCode, CloseReason}};
use uuid::Uuid;
use log::{trace, debug, info, warn, error};

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(10);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(15);

pub struct Connection {
    pub last_beat: Instant,
    pub state: Arc<RwLock<State>>,
    pub registry: Addr<Registry>,
    pub id: Uuid,
}

impl Connection {
    fn beat_heart(&mut self) {
        self.last_beat = Instant::now();
    }

    fn start_beat(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.last_beat) > CLIENT_TIMEOUT {
                warn!("{} timed out, disconnecting", act.id);
                act.registry.do_send(Disconnect(act.id));
                ctx.stop();
            } else {
                trace!("pinging {}", act.id);
                ctx.ping(b"");
            }
        });
    }
}

impl Actor for Connection {
    type Context = ws::WebsocketContext<Self>;

    // Register a new client and send them the current state
    fn started(&mut self, ctx: &mut Self::Context) {
        info!("a new client is connecting as {}", self.id);
        let tx = ctx.address().recipient();
        let r = self.state.read().unwrap();
        let cmdstr_res = CmdStr::new(&Command::SetState { state: r.clone() });
        if let Ok(cmdstr) = cmdstr_res {
            match tx.do_send(cmdstr) {
                Ok(_) => debug!("sending current state to {}", self.id),
                Err(e) => {
                    error!("couldn't send the state to {}: {}", self.id, e);
                }
            }
        }
        self.registry.do_send(Connect(self.id, tx));
        self.start_beat(ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        self.registry.do_send(Disconnect(self.id));
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Connection {
    fn handle(
        &mut self,
        msg: Result<ws::Message, ws::ProtocolError>,
        ctx: &mut Self::Context,
    ) {
        match msg {
            Ok(ws::Message::Text(txt)) => {
                let cmd_res: serde_json::Result<Command> =
                    serde_json::from_str(&txt);

                match cmd_res {
                    Ok(cmd) => {
                        let opt = self.state
                            .write().unwrap().apply_command(cmd.clone());
                        if opt.is_some() {
                            self.registry.do_send(cmd);
                        } else {
                            debug!(" -> couldn't execute command");
                        }
                    }
                    Err(e) => {
                        warn!(
                            "recieved invalid data from {} ({})",
                            self.id, e
                        );
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
                    self.id,
                );
                ctx.close(Some(CloseReason {
                    code: CloseCode::Unsupported,
                    description: Some(
                        "this endpoint doesn't accept binary data".to_string()
                    ),
                }));
                ctx.stop();
            }
            Ok(ws::Message::Continuation(_)) => {
                info!(
                    "recieved a continuation frame from {}, closing socket...",
                    self.id,
                );
                ctx.close(Some(CloseReason {
                    code: CloseCode::Size,
                    description: Some(
                        "this endpoint doesn't accept continuation frames"
                            .to_string()
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
                        self.id,
                        description.unwrap_or(format!("{:?}", code)),
                    );
                } else {
                    info!("{} has closed for an unknown reason", self.id);
                }
            }
            Ok(ws::Message::Nop) => (),
            Err(e) => {
                warn!(
                    "protocol error in a frame from {}: {}, closing socket...",
                    self.id, e
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
