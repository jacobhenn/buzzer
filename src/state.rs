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
                p.score = score;
                self.history.log(name, score);
                Some(())
            }
            Command::EndRound => {
                // Unblock everyone.
                self.scores.values_mut().for_each(|p| p.blocked = false);
                self.buzzer.close();
                Some(())
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
                Some(())
            }
            Command::AddPlayer { name } => {
                // If the history contains a prior score for this player, use
                // that score instead of 0.
                let score = self
                    .history
                    .iter()
                    .find(|e| e.name == name)
                    .map(|e| e.score)
                    .unwrap_or_default();
                self.scores.insert(
                    name.clone(),
                    Player {
                        score,
                        blocked: false,
                    },
                );
                self.history.log(name, score);
                Some(())
            }
            Command::RemovePlayer { name } => {
                self.scores.remove(&name)?;
                Some(())
            }
            Command::Unblock { name } => self.scores.get_mut(&name).map(|p| p.blocked = false),
            Command::EditHistory { index: i, score } => {
                let e = self.history.get(i)?;
                // How much did we add to/subtract from this player's score?
                let diff: i32 = score - e.score;

                // Add that diff to the current score of this player
                let p = self.scores.get_mut(&e.name)?;
                p.score += diff;

                // Add that diff to all this player's later history entries
                let name = e.name.clone();
                self.history
                    .iter_mut()
                    .take(i + 1)
                    .filter(|x| x.name == name)
                    .for_each(|x| x.score += diff);
                Some(())
            }
            Command::RemoveHistory { index: i } => {
                let e = self.history.get(i)?;
                let name = e.name.clone();
                let score = e.score;
                // What was the last history entry of this player before the
                // one we are deleting? If none, 0.
                let prev_score = self
                    .history
                    .iter()
                    .skip(i + 1)
                    .find(|e| e.name == name)
                    .map(|e| e.score)
                    .unwrap_or_default();
                let diff = score - prev_score;

                let p = self.scores.get_mut(&name)?;
                p.score -= diff;

                self.history.remove(i);
                self.history
                    .iter_mut()
                    .take(i)
                    .filter(|x| x.name == name)
                    .for_each(|x| x.score -= diff);
                Some(())
            }
            Command::SetPtsWorth { pts } => {
                self.ptsworth = pts;
                Some(())
            }
            Command::OwnerCorrect => {
                if let Buzzer::TakenBy { owner } = &self.buzzer {
                    info!(" -> adding {} to {}", self.ptsworth, owner);
                    let p = self.scores.get_mut(owner)?;
                    p.score += self.ptsworth;
                    self.history.log(owner.to_string(), p.score);
                    self.scores.values_mut().for_each(|p| p.blocked = false);
                    self.buzzer.close();
                    Some(())
                } else {
                    info!(" -> but there is no owner!");
                    None
                }
            }
            Command::SetState { .. } => {
                warn!(" -> SetState should only ever be sent to a client");
                None
            }
            Command::Buzz { name } => {
                let p = self.scores.get(&name)?;
                if p.blocked {
                    info!(" -> but they are blocked!");
                    return None;
                }

                self.check_timer();
                match &self.buzzer {
                    Buzzer::TakenBy { owner } => {
                        info!(" -> but {} already buzzed in!", owner);
                        None
                    }
                    Buzzer::Closed => {
                        info!(" -> but the buzzer is closed!");
                        None
                    }
                    Buzzer::Open { .. } => {
                        info!(" -> they succeeded!");
                        self.scores.get_mut(&name).map(|p| p.blocked = true);
                        self.buzzer.take(name);
                        Some(())
                    }
                }
            }
        }
    }
}
