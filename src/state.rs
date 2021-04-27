use actix::{Handler, Actor, Context};
use crate::structs::CmdSer;
use log::debug;
use util::state::GameState;
use util::command::Command;
use crate::registry::{Connect, Disconnect, Registry};

pub struct ServerState {
    game_state: GameState,
    registry: Registry,
}

impl ServerState {
    pub fn new() -> Self {
        Self {
            game_state: GameState::new(),
            registry: Registry::default(),
        }
    }
}

impl Actor for ServerState {
    type Context = Context<Self>;
}

impl Handler<Command> for ServerState {
    type Result = ();

    fn handle(&mut self, msg: Command, _ctx: &mut Context<Self>) {
        let opt = self.game_state.apply_command(msg.clone());

        if opt.is_some() {
            if let Ok(cmdser) = CmdSer::new(&msg) {
                for socket in self.registry.0.values() {
                    socket.do_send(cmdser.clone());
                }
            }
        }
    }
}

impl Handler<Connect> for ServerState {
    type Result = ();

    fn handle(&mut self, Connect(id, conn): Connect, _ctx: &mut Context<Self>) {
        debug!("registering {}", id);

        // Send the current state to the connected player
        let cmd = Command::SetState { state: self.game_state.clone() };
        if let Ok(cmdser) = CmdSer::new(&cmd) {
            conn.do_send(cmdser);
        }

        self.registry.0.insert(id, conn);
    }
}

impl Handler<Disconnect> for ServerState {
    type Result = ();

    fn handle(&mut self, Disconnect(id): Disconnect, _ctx: &mut Context<Self>) {
        debug!("deregistering {}", id);
        self.registry.0.remove(&id);
    }
}
