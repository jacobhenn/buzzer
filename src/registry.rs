use crate::command::Command;
use crate::structs::CmdStr;
use actix::{Actor, Context, Handler, Message, Recipient};
use log::debug;
use std::collections::HashMap;
use uuid::Uuid;

// This type alias essentially represents the recipient part of an adress of
// a Connection. It points to the rx end of a Connection actor.
type Socket = Recipient<CmdStr>;

// A message to the registry to register a client at Socket with id Uuid.
#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct Connect(pub Uuid, pub Socket);

// A message to the registry to deregister the client at Uuid.
#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect(pub Uuid);

// The Registry stores a map of client ids to their sockets. Connections relay
// commands they recieve to the registry, which in turn retransmits them to all
// registered clients.
#[derive(Debug)]
pub struct Registry(pub HashMap<Uuid, Socket>);

impl Default for Registry {
    fn default() -> Registry {
        Registry(HashMap::new())
    }
}

impl Actor for Registry {
    type Context = Context<Self>;
}

// Redistribute a command to all registered players
impl Handler<Command> for Registry {
    type Result = ();

    fn handle(&mut self, msg: Command, _: &mut Context<Self>) {
        debug!("resending command `{}` to all players", msg);

        let cmdstr_res = CmdStr::new(msg);

        if let Ok(cmdstr) = cmdstr_res {
            let Self(sockets) = self;
            for socket in sockets.values() {
                socket.do_send(cmdstr.clone()).unwrap();
            }
        }
    }
}

impl Handler<Connect> for Registry {
    type Result = ();

    fn handle(&mut self, Connect(id, conn): Connect, _: &mut Context<Self>) {
        debug!("registering {}", id);
        let Self(sockets) = self;
        sockets.insert(id, conn);
    }
}

impl Handler<Disconnect> for Registry {
    type Result = ();

    fn handle(&mut self, Disconnect(id): Disconnect, _: &mut Context<Self>) {
        debug!("deregistering {}", id);
        let Self(sockets) = self;
        sockets.remove(&id);
    }
}
