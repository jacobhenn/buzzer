use std::time::{Duration, Instant};

use crate::registry::{Connect, Disconnect, Registry};
use crate::structs::CmdSer;
use actix::{Actor, AsyncContext, Context, Handler};
use log::debug;
use util::{Buzzer, command::Command};
use util::state::GameState;

const TIMER_LENGTH: Duration = Duration::from_secs(7);

pub struct ServerState {
    game_state: GameState,
    registry: Registry,
    last_opened: Instant,
}

impl ServerState {
    pub fn new() -> Self {
        Self {
            game_state: GameState::new(),
            registry: Registry::default(),
            last_opened: Instant::now(),
        }
    }
}

impl Actor for ServerState {
    type Context = Context<Self>;
}

impl Handler<Command> for ServerState {
    type Result = ();

    fn handle(&mut self, msg: Command, ctx: &mut Context<Self>) {
        let opt = self.game_state.apply_command(msg.clone());

        if opt.is_some() {
            if match msg {
                Command::OpenBuzzer | Command::OwnerIncorrect => true,
                Command::Undo => {
                    let last_cmd_from_host = self.game_state.history.iter().find(|c| c.from_host());
                    match last_cmd_from_host {
                        Some(Command::OpenBuzzer) => true,
                        Some(Command::OwnerIncorrect) => true,
                        _ => false,
                    }
                }
                _ => false,
            } {
                self.last_opened = Instant::now();
                ctx.run_later(TIMER_LENGTH, |act, ctx| {
                    if let Buzzer::Open = act.game_state.buzzer {
                        if act.last_opened.elapsed() >= TIMER_LENGTH {
                            ctx.address().do_send(Command::EndRound);
                        }
                    }
                });
            }

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
        let cmd = Command::SetState {
            state: self.game_state.clone(),
        };
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
