use crate::registry::{Close, Connect, Disconnect};
use crate::state::ServerState;
use crate::structs::CmdSer;
use actix::{Actor, ActorContext, Addr, AsyncContext, Handler, StreamHandler};
use actix_web_actors::{
    ws,
    ws::{CloseCode, CloseReason},
};
use log::{info, trace, warn};
use std::time::{Duration, Instant};
use util::command::Command;
use uuid::Uuid;

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(10);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(15);

pub struct Connection {
    pub state: Addr<ServerState>,
    pub id: Uuid,
    /// The last time a pong was sent from the client at the other end.
    last_beat: Instant,
}

impl Connection {
    pub fn new(state: Addr<ServerState>) -> Self {
        Self {
            state,
            id: Uuid::new_v4(),
            last_beat: Instant::now(),
        }
    }

    fn beat_heart(&mut self) {
        self.last_beat = Instant::now();
    }

    fn start_beat(ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.last_beat) > CLIENT_TIMEOUT {
                warn!("{} timed out, disconnecting", act.id);
                act.state.do_send(Disconnect(act.id));
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
        let tx = ctx.address();
        self.state.do_send(Connect(self.id, tx));
        Self::start_beat(ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        self.state.do_send(Disconnect(self.id));
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Connection {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(_)) => {
                info!(
                    "recieved unsuppourted data from {}, closing socket...",
                    self.id,
                );
                ctx.close(Some(CloseReason {
                    code: CloseCode::Unsupported,
                    description: Some("this endpoint doesn't accept text data".to_string()),
                }));
                ctx.stop();
            }
            Ok(ws::Message::Binary(bin)) => {
                let cmd_res: Result<Command, rmp_serde::decode::Error> =
                    rmp_serde::from_read_ref(&bin);

                match cmd_res {
                    Ok(cmd) => {
                        trace!("{} sent command `{}`", self.id, cmd);
                        self.state.do_send(cmd);
                    }
                    Err(e) => {
                        warn!("recieved invalid data from {} ({})", self.id, e);
                        ctx.close(Some(CloseReason {
                            code: CloseCode::Protocol,
                            description: Some(format!("{}", e)),
                        }));
                        ctx.stop();
                    }
                }
            }
            Ok(ws::Message::Continuation(_)) => {
                info!(
                    "recieved a continuation frame from {}, closing socket...",
                    self.id,
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

impl Handler<CmdSer> for Connection {
    type Result = ();

    fn handle(&mut self, msg: CmdSer, ctx: &mut Self::Context) {
        ctx.binary(msg.0);
    }
}

impl Handler<Close> for Connection {
    type Result = ();

    fn handle(&mut self, Close(reason): Close, ctx: &mut Self::Context) {
        trace!("closing connection to {}", self.id);
        ctx.close(Some(reason));
        ctx.stop();
    }
}
