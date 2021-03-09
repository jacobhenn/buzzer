use crate::scorekeeper::Player;

use serde::{Serialize, Deserialize};
use log::LevelFilter;

////////////////////////////////////////////////////////////////////////////////
// Config represents the values expected to be present in conf.json
#[derive(Serialize, Deserialize)]
pub struct Config {
    pub log_level: LevelFilter,
    pub address: String,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            log_level: LevelFilter::Warn,
            address: "127.0.0.1:8080".to_string(),
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// the Buzzer can either be open, closed, or taken by a player.
// the Buzzer state can be serialized and sent as JSON
#[derive(Serialize, PartialEq)]
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
        if *self == Self::Open {
            *self = Self::TakenBy{owner: name};
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players who have already buzzed, and a
// list of players' scores
pub struct State {
    pub buzzer: Buzzer,
    pub scores: Vec<Player>,
}

impl State {
    pub const fn new() -> Self {
        let new_scores:  Vec<Player> = Vec::new();

        Self {
            buzzer: Buzzer::Closed,
            scores: new_scores,
        }
    }
}
