pub mod command;
pub mod state;

use serde::{Serialize, Deserialize};

////////////////////////////////////////////////////////////////////////////////
// the Buzzer can either be open, closed, or taken by a player.
// the Buzzer state can be serialized and sent as JSON
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Buzzer {
    Open,
    Closed,
    TakenBy { owner: usize },
}

impl Buzzer {
    pub fn open(&mut self) {
        *self = Self::Open;
    }

    pub fn close(&mut self) {
        *self = Self::Closed;
    }

    pub fn take(&mut self, owner: usize) {
        *self = Self::TakenBy { owner };
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistEntry {
    pub player: usize,   // player's index
    pub delta: i32,      // how much their score changed
}

pub trait History {
    fn log(&mut self, player: usize, score: i32);
}

impl History for Vec<HistEntry> {
    fn log(&mut self, player: usize, delta: i32) {
        if delta != 0 {
            self.insert(0, HistEntry { player, delta });
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Player {
    pub name: String,
    pub score: i32,
    pub blocked: bool,
}
