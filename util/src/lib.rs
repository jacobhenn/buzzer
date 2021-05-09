//! Common items related to the behind-the-scenes mechanics of the Buzzer game imported by both
//! the client and server.
//!
//! The point of the util crate is that every new command or behavior of the game itself need only
//! to be implemented once here, instead of once on the client and once on the server.
#![warn(missing_docs)]

pub mod command;
pub mod state;

#[cfg(test)]
mod tests;

use serde::{Serialize, Deserialize};

/// The current state of the buzzer itself.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum Buzzer {
    /// The buzzer is open, and anyone may buzz in (unless they have already buzzed in this round).
    ///
    /// ### Valid transitions
    ///
    /// * [`command::Command::EndRound`] -> [`Buzzer::Closed`]
    /// * [`command::Command::Buzz`] -> [`Buzzer::TakenBy`]
    Open,
    /// The buzzer is closed.
    ///
    /// ### Valid transitions
    ///
    /// * [`command::Command::OpenBuzzer`] -> [`Buzzer::Open`]
    Closed,
    /// Someone has sucessfully buzzed in.
    ///
    /// ### Valid transitions
    ///
    /// * [`command::Command::OpenBuzzer`] -> [`Buzzer::Open`] or [`Buzzer::Closed`] (if all
    /// players are blocked)
    /// * [`command::Command::OwnerCorrect`] -> [`Buzzer::Closed`]
    TakenBy {
        /// The index of the player who has buzzed in.
        owner: usize,
    },
}

impl Buzzer {
    /// Unconditionally open the buzzer
    pub fn open(&mut self) {
        *self = Self::Open;
    }

    /// Unconditionally close the buzzer
    pub fn close(&mut self) {
        *self = Self::Closed;
    }

    /// Unconditionally buzz a player in.
    pub fn take(&mut self, owner: usize) {
        *self = Self::TakenBy { owner };
    }
}

/// A single player. Contestants may have more than one player playing through their connection.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Player {
    /// The name of the player.
    pub name: String,
    /// The player's current score.
    pub score: i32,
    /// Has the player buzzed in already in the current round?
    pub blocked: bool,
}
