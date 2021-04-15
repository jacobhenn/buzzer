use crate::command::Command;
use crate::registry::{Connect, Disconnect, Registry};
use crate::structs::{Buzzer, CmdStr, HistEntry, History, Player};
use actix::{Actor, Addr, Context, Handler, Message};
use log::{debug, info, warn};
use serde::Serialize;
use std::collections::HashMap;
use std::time::Duration;

const TIMER_LENGTH: Duration = Duration::from_secs(5);

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players' scores (along with whether or not
// they're blocked, see `scorekeeper::Player`), and a random `u8` marker which
// is randomly regenerated every time the state changes to inform the clients
// to perform the "pull" phase of their polling.
#[derive(Clone, Debug, Serialize, Message)]
#[rtype(result = "")]
pub struct State {
    pub buzzer: Buzzer,
    pub scores: HashMap<String, Player>,
    pub history: Vec<HistEntry>,
    #[serde(skip_serializing)]
    pub registry: Addr<Registry>,
    pub ptsworth: i32,
}

impl Default for State {
    fn default() -> Self {
        Self {
            buzzer: Buzzer::Closed,
            scores: HashMap::new(),
            history: Vec::new(),
            registry: Registry::default().start(),
            ptsworth: 200,
        }
    }
}

impl Actor for State {
    type Context = Context<Self>;
}

impl Handler<Command> for State {
    type Result = ();

    fn handle(&mut self, msg: Command, _: &mut Context<Self>) {
        let opt = self.apply_command(msg.clone());

        if opt.is_some() {
            self.registry.do_send(msg);
        } else {
            debug!(" -> couldn't execute command");
        }
    }
}

impl Handler<Connect> for State {
    type Result = ();

    fn handle(&mut self, msg: Connect, _: &mut Context<Self>) {
        self.registry.do_send(msg.clone());

        // Send the current state to the connected player
        let Connect(_, socket) = msg;
        self.check_timer();
        let cmd = Command::SetState {
            state: self.clone(),
        };
        if let Ok(cmdstr) = CmdStr::new(cmd) {
            socket.do_send(cmdstr).unwrap();
        }
    }
}

impl Handler<Disconnect> for State {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _: &mut Context<Self>) {
        self.registry.do_send(msg);
    }
}

impl State {
    pub fn check_timer(&mut self) {
        if let Buzzer::Open { opened } = self.buzzer {
            if opened.elapsed() >= TIMER_LENGTH {
                self.buzzer.close();
                self.scores.values_mut().for_each(|p| p.blocked = false);
            }
        }
    }

    // Takes a Command and a mutable reference to the state and applies the command
    // to the state. Returns None if a nonexistant player was named or the command
    // was OwnerCorrect and the buzzer wasn't TakenBy anyone.
    #[allow(clippy::too_many_lines)]
    pub fn apply_command(&mut self, cmd: Command) -> Option<()> {
        info!("{}", cmd);

        match cmd {
            Command::SetScore { name, score } => {
                let p = self.scores.get_mut(&name)?;
                self.history.log(name, score - p.score);
                p.score = score;
            }
            Command::EndRound => {
                // Unblock everyone.
                self.scores.values_mut().for_each(|p| p.blocked = false);
                self.buzzer.close();
            }
            Command::OpenBuzzer => {
                // if the buzzer closed due to a timeout, make sure to unblock everyone
                if let Buzzer::Open { opened } = self.buzzer {
                    if opened.elapsed() >= TIMER_LENGTH {
                        self.scores.values_mut().for_each(|p| p.blocked = false);
                    }
                }

                // If everyone's blocked, OpenBuzzer closes the buzzer instead.
                if self.scores.values().all(|p| p.blocked) {
                    self.buzzer.close();
                    self.scores.values_mut().for_each(|p| p.blocked = false);
                } else {
                    self.buzzer.open();
                }
            }
            Command::AddPlayer { name } => {
                self.scores.insert(name, Player { score: 0, blocked: false, });
            }
            Command::RemovePlayer { name } => {
                self.scores.remove(&name)?;
            }
            Command::Unblock { name } => self.scores.get_mut(&name).map(|p| p.blocked = false)?,
            Command::EditHistory { index, delta } => {
                let e = self.history.get_mut(index)?;
                // How much did we add to/subtract from this player's score?
                let diff = delta - e.delta;
                e.delta = delta;

                // Add that diff to the current score of this player
                let p = self.scores.get_mut(&e.name)?;
                p.score += diff;
            }
            Command::RemoveHistory { index } => {
                let e = self.history.get(index)?;

                let p = self.scores.get_mut(&e.name)?;
                p.score -= e.delta;

                self.history.remove(index);
            }
            Command::SetPtsWorth { pts } => {
                self.ptsworth = pts;
            }
            Command::OwnerCorrect => {
                if let Buzzer::TakenBy { owner } = &self.buzzer {
                    info!(" -> adding {} to {}", self.ptsworth, owner);
                    let p = self.scores.get_mut(owner)?;
                    p.score += self.ptsworth;
                    self.history.log(owner.to_string(), self.ptsworth);
                    self.scores.values_mut().for_each(|p| p.blocked = false);
                    self.buzzer.close();
                } else {
                    info!(" -> but there is no owner!");
                    None?;
                }
            }
            Command::SetState { .. } => {
                warn!(" -> SetState should only ever be sent to a client");
                None?;
            }
            Command::Buzz { name } => {
                self.check_timer();

                let p = self.scores.get_mut(&name)?;
                if p.blocked {
                    info!(" -> but they are blocked!");
                    None?;
                }

                match &self.buzzer {
                    Buzzer::TakenBy { owner } => {
                        info!(" -> but {} already buzzed in!", owner);
                        None?;
                    }
                    Buzzer::Closed => {
                        info!(" -> but the buzzer is closed!");
                        None?;
                    }
                    Buzzer::Open { .. } => {
                        info!(" -> they succeeded!");
                        p.blocked = true;
                        self.buzzer.take(name);
                    }
                }
            }
        }

        Some(())
    }
}
