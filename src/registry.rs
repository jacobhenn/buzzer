use crate::websockets::Connection;
use actix_web_actors::ws::{CloseCode, CloseReason};
use actix::{Addr, Message};
use log::warn;
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
#[derive(Default)]
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
