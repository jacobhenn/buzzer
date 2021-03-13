use serde::{Serialize, Deserialize};
use log::LevelFilter;
use chrono::{Local, Timelike};
use std::collections::HashMap;

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
        *self = Self::TakenBy{owner: name};
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Serialize, Debug)]
pub struct HistEntry {
    pub time: (u8, u8), // HH:MM
    pub name: String,
    pub score: i32,
}

pub trait History {
    fn log(&mut self, name: String, score: i32);
}

impl History for Vec<HistEntry> {
    fn log(&mut self, name: String, score: i32) {
        if self.iter().any(|e| e.name == name && e.score == score) { return; }
        let now = Local::now().time();
        let time = (now.hour() as u8, now.minute() as u8);
        self.insert(0, HistEntry{time, name, score});
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Serialize)]
pub struct Player {
    pub score: i32,
    pub blocked: bool,
}

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players' scores (along with whether or not
// they're blocked, see `scorekeeper::Player`), and a random `u8` marker which
// is randomly regenerated every time the state changes to inform the clients
// to perform the "pull" phase of their polling.
pub struct State {
    pub buzzer:  Buzzer,
    pub scores:  HashMap<String, Player>,
    pub history: Vec<HistEntry>,
    pub marker:  u8,
}

impl State {
    pub fn new() -> Self {
        Self {
            buzzer:  Buzzer::Closed,
            scores:  HashMap::new(),
            history: Vec::new(),
            marker:  rand::random(),
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
