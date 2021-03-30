use crate::command::Command;
use actix::Message;
use chrono::{Local, Timelike};
use log::{debug, error, LevelFilter};
use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::fmt;

////////////////////////////////////////////////////////////////////////////////
// Wrapper around a serialized command which can be passed to a Connection
#[derive(Clone, Message)]
#[rtype(result = "()")]
pub struct CmdStr(pub String);

impl CmdStr {
    pub fn new(cmd: Command) -> Result<Self> {
        let json_res = serde_json::to_string(&cmd);
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
