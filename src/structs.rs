use crate::command::Command;
use chrono::{Local, Timelike};
use log::{debug, info, warn, error, LevelFilter};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;
use actix::Message;
use serde_json::Result;

////////////////////////////////////////////////////////////////////////////////
// Wrapper around a serialized command which can be passed to a Connection
#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct CmdStr(pub String);

impl CmdStr {
    pub fn new(cmd: &Command) -> Result<Self> {
        let json_res = serde_json::to_string(cmd);
        match json_res {
            Ok(json) => Ok(Self(json)),
            Err(e) => {
                error!("couldn't serialize command `{:?}`: {}", cmd, e);
                Err(e)
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// Config represents the values expected to be present in conf.json
#[derive(Serialize, Deserialize)]
pub struct Config {
    pub log_level: LevelFilter,
    pub address: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            log_level: LevelFilter::Warn,
            address: "127.0.0.1:8080".to_string(),
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// the Buzzer can either be open, closed, or taken by a player.
// the Buzzer state can be serialized and sent as JSON
#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(tag = "state")]
pub enum Buzzer {
    Open,
    Closed,
    TakenBy { owner: String },
}

impl Buzzer {
    pub fn open(&mut self) {
        *self = Self::Open;
    }

    pub fn close(&mut self) {
        *self = Self::Closed;
    }

    pub fn take(&mut self, name: String) {
        *self = Self::TakenBy { owner: name };
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Clone, Serialize, Debug)]
pub struct HistEntry {
    pub time: (u8, u8), // HH:MM
    pub name: String,
    pub score: i32,
}

impl fmt::Display for HistEntry {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "[history] {:02}:{:02} - {}: {}",
            self.time.0, self.time.1, self.name, self.score
        )
    }
}

pub trait History {
    fn log(&mut self, name: String, score: i32);
    fn print(&self);
}

impl History for Vec<HistEntry> {
    fn log(&mut self, name: String, score: i32) {
        // if self.iter().any(|e| e.name == name && e.score == score) {
        //     return;
        // }
        let now = Local::now().time();
        let time = (now.hour() as u8, now.minute() as u8);
        self.insert(0, HistEntry { time, name, score });
    }

    fn print(&self) {
        for entry in self {
            debug!("{}", entry);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Clone, Debug, Serialize)]
pub struct Player {
    pub score: i32,
    pub blocked: bool,
}

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players' scores (along with whether or not
// they're blocked, see `scorekeeper::Player`), and a random `u8` marker which
// is randomly regenerated every time the state changes to inform the clients
// to perform the "pull" phase of their polling.
#[derive(Clone, Debug, Serialize)]
pub struct State {
    pub buzzer: Buzzer,
    pub scores: HashMap<String, Player>,
    pub history: Vec<HistEntry>,
    pub ptsworth: i32,
}

impl State {
    pub fn new() -> Self {
        Self {
            buzzer: Buzzer::Closed,
            scores: HashMap::new(),
            history: Vec::new(),
            ptsworth: 200,
        }
    }

    // Takes a Command and a mutable reference to the state and applies the command
    // to the state. Returns None if a nonexistant player was named or the command
    // was OwnerCorrect and the buzzer wasn't TakenBy anyone.
    #[allow(clippy::too_many_lines)]
    pub fn apply_command(&mut self, cmd: Command) -> Option<()> {
        info!("{}", cmd);

        match cmd {
            Command::AddScore { name, score } => {
                let p = self.scores.get_mut(&name)?;
                p.score += score;
                self.history.log(name, p.score);
                Some(())
            }
            Command::SetScore { name, score } => {
                self.history.log(name.clone(), score);
                self.scores.get_mut(&name).map(|p| p.score = score)
            }
            Command::EndRound => {
                // Unblock everyone.
                self
                    .scores
                    .values_mut()
                    .for_each(|p| p.blocked = false);
                self.buzzer.close();
                Some(())
            }
            Command::OpenBuzzer => {
                // If everyone's blocked, OpenBuzzer closes the buzzer instead.
                if self.scores.values().all(|p| p.blocked) {
                    self.buzzer.close();
                    self
                        .scores
                        .values_mut()
                        .for_each(|p| p.blocked = false);
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
            Command::ClearPlayers => {
                self.scores.drain();
                Some(())
            }
            Command::ClearBlocked => {
                self
                    .scores
                    .values_mut()
                    .for_each(|p| p.blocked = false);
                Some(())
            }
            Command::Block { name } => {
                self.scores.get_mut(&name).map(|p| p.blocked = true)
            }
            Command::Unblock { name } => {
                self.scores.get_mut(&name).map(|p| p.blocked = false)
            }
            Command::CloseBuzzer => {
                self.buzzer.close();
                Some(())
            }
            Command::EditHistory { index: i, score } => {
                let e = self.history.get(i)?;
                // How much did we add to/subtract from this player's score?
                let diff: i32 = score - e.score;

                // Add that diff to the current score of this player
                if let Some(p) = self.scores.get_mut(&e.name) {
                    p.score += diff;
                }

                // Add that diff to all this player's later history entries
                let name = e.name.clone();
                self
                    .history
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

                if let Some(p) = self.scores.get_mut(&name) {
                    p.score -= diff;
                }

                self.history.remove(i);
                self
                    .history
                    .iter_mut()
                    .take(i)
                    .filter(|x| x.name == name)
                    .for_each(|x| x.score -= score);
                Some(())
            }
            Command::ClearHistory => {
                self.history.clear();
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
                    self
                        .scores
                        .values_mut()
                        .for_each(|p| p.blocked = false);
                    self.buzzer.close();
                    Some(())
                } else {
                    info!(" -> but there is no owner!");
                    None
                }
            }
            Command::SetState { .. } => {
                warn!("SetState should only ever be sent to a client");
                None
            }
            Command::Buzz { name } => {
                let p = self.scores.get(&name)?;
                if p.blocked {
                    info!(" -> but they were blocked!");
                    return None;
                }
                match &self.buzzer {
                    Buzzer::TakenBy { owner } => {
                        info!(" -> but {} already buzzed in!", owner);
                        None
                    }
                    Buzzer::Closed => {
                        info!(" -> but the buzzer is closed!");
                        None
                    }
                    Buzzer::Open => {
                        info!(" -> they succeeded!");
                        self.buzzer.take(name);
                        Some(())
                    }
                }
            }
        }
    }
}
