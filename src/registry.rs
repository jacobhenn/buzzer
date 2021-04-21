use crate::command::Command;
use crate::structs::CmdStr;
use crate::websockets::Connection;
use actix::{Actor, Addr, Context, Handler, Message};
use actix_web_actors::ws::{CloseCode, CloseReason};
use log::{debug, warn};
use std::collections::HashMap;
use uuid::Uuid;

type Socket = Addr<Connection>;

// A message to the registry to register a client at Socket with id Uuid.
#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct Connect(pub Uuid, pub Socket);

// A message to the registry to deregister the client at Uuid.
#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect(pub Uuid);

// A message to a Connection to send a close frame.
#[derive(Message)]
#[rtype(result = "()")]
pub struct Close(pub CloseReason);

// The Registry stores a map of client ids to their sockets. Connections relay
// commands they recieve to the registry, which in turn retransmits them to all
// registered clients.
pub struct Registry(pub HashMap<Uuid, Socket>);

impl Drop for Registry {
    fn drop(&mut self) {
        warn!("registry dropped, cleaning up open sockets");
        let Self(sockets) = self;
        for socket in sockets.values() {
            socket.do_send(Close(CloseReason {
                code: CloseCode::Normal,
                description: Some(
                    "The game is over. Thank you for playing!".to_string(),
                ),
            }));
        }
    }
}

impl Default for Registry {
    fn default() -> Self {
        Self(HashMap::new())
    }
}

impl Actor for Registry {
    type Context = Context<Self>;
}

// Redistribute a command to all registered players
impl Handler<Command> for Registry {
    type Result = ();

    fn handle(&mut self, msg: Command, _ctx: &mut Context<Self>) {
        debug!("resending command `{}` to all players", msg);

        let cmdstr_res = CmdStr::new(&msg);

        if let Ok(cmdstr) = cmdstr_res {
            let Self(sockets) = self;
            for (_, socket) in sockets.iter() {
                socket.do_send(cmdstr.clone());
            }
        }
    }
}

impl Handler<Connect> for Registry {
    type Result = ();

    fn handle(&mut self, Connect(id, conn): Connect, _ctx: &mut Context<Self>) {
        debug!("registering {}", id);
        let Self(sockets) = self;
        sockets.insert(id, conn);
    }
}

impl Handler<Disconnect> for Registry {
    type Result = ();

    fn handle(&mut self, Disconnect(id): Disconnect, _ctx: &mut Context<Self>) {
        debug!("deregistering {}", id);
        let Self(sockets) = self;
        sockets.remove(&id);
    }
}
