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
// State contains a Buzzer, a list of players' scores (along with whether or not
// they're blocked, see `scorekeeper::Player`), and a random `u8` marker which
// is regenerated every time the state changes
pub struct State {
    pub buzzer: Buzzer,
    pub scores: Vec<Player>,
    pub marker: u8,
}

impl State {
    pub fn new() -> Self {
        Self {
            buzzer: Buzzer::Closed,
            scores: Vec::new(),
            marker: rand::random(),
        }
    }

    pub fn update_marker(&mut self) {
        let old_marker = self.marker;
        loop {
            self.marker = rand::random();
            if self.marker != old_marker { break; }
        }
    }
}
