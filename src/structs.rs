use crate::command::Command;
use actix::Message;
use chrono::{Timelike, Utc};
use log::{error, LevelFilter};
use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::time::Instant;

////////////////////////////////////////////////////////////////////////////////
// Wrapper around a serialized command which can be passed to a Connection
#[derive(Debug, Clone, Message)]
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
#[derive(Clone, Serialize, PartialEq)]
#[serde(tag = "state")]
pub enum Buzzer {
    Open {
        #[serde(skip_serializing)]
        opened: Instant,
    },
    Closed,
    TakenBy {
        owner: String,
    },
}

impl Buzzer {
    pub fn open(&mut self) {
        let now = Instant::now();
        *self = Self::Open { opened: now };
    }

    pub fn close(&mut self) {
        *self = Self::Closed;
    }

    pub fn take(&mut self, owner: String) {
        *self = Self::TakenBy { owner };
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Clone, Serialize)]
pub struct HistEntry {
    pub time: (u8, u8), // HH:MM
    pub player: String, // player's name
    pub delta: i32,     // how much their score changed
}

pub trait History {
    fn log(&mut self, player: String, score: i32);
}

impl History for Vec<HistEntry> {
    fn log(&mut self, player: String, delta: i32) {
        if delta != 0 {
            let now = Utc::now().time();
            let time = (now.hour() as u8, now.minute() as u8);
            self.insert(0, HistEntry { time, player, delta });
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
#[derive(Clone, Serialize)]
pub struct Player {
    pub score: i32,
    pub blocked: bool,
}
