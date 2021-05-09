//! This module defines the [`Command`] enum, a simple message type used to communicate between
//! the client and the server.

use crate::state::GameState;
use derive_more::Display;
use serde::{Deserialize, Serialize};

#[cfg(feature = "actix")]
use actix::Message;

/// An atomic message which serve two purposes: (1) communication from the host client to the
/// server, instructing it to change the state, and (2) communication from the server to all
/// clients to notify them of changes to the state.
#[derive(Clone, Serialize, Deserialize, Display)]
#[cfg_attr(feature = "actix", derive(Message), rtype(result = "()"))]
pub enum Command {
    /// Set the score of a player. This command is sent from the host to the
    /// server when they use the `<input>` surrounding a player's score display to change
    /// someone's score, for example in Final Jeopardy!.
    #[display(fmt = "setting player {}'s score to {}", index, score)]
    SetScore {
        /// The index of the player whose score we need to change.
        index: usize,
        /// The new score that this player is to take.
        score: i32
    },
    /// End the round. This is sent by the host when they click the "end round" button which
    /// is available while the buzzer is open.
    #[display(fmt = "ending the round")]
    EndRound,
    /// Open the buzzer. This is sent by the host when they click the "open buzzer" button which
    /// is available while the buzzer is closed.
    #[display(fmt = "opening the buzzer")]
    OpenBuzzer,
    /// Add a player. This is sent by all clients with contestants on their side when they press
    /// "play" to tell the server to add them to the player list.
    ///
    /// ### Possible race condition
    ///
    /// If two clients are connected to the server and press the "play" button within twice
    /// the latency of the client with least latency, one of them will store an incorrect
    /// index in their contestant data.
    #[display(fmt = "adding {}", name)]
    AddPlayer {
        /// The name of the player to add.
        name: String,
    },
    /// Increment the points worth index. This is sent when the host presses the
    /// "+" button next to the points worth display.
    #[display(fmt = "incrementing points worth index")]
    AddPtsIndex,
    /// Decrement the points worth index. This is sent when the host presses the
    /// "-" button next to the points worth display.
    #[display(fmt = "decrementing the points worth index")]
    SubPtsIndex,
    /// Change the list of possible point values. This is sent by the host when they
    /// press the "☑ double Jeopardy!" button.
    #[display(fmt = "setting the list of point values to {:?}", values)]
    SetPtValues {
        /// The new list of values to set the possible point values to.
        values: Vec<i32>,
    },
    /// Add the points worth to the buzzed in player. This is sent when the host presses the
    /// "correct" button displayed when a player has buzzed in.
    #[display(fmt = "adding points worth to buzzed in player")]
    OwnerCorrect,
    /// Re-open the buzzer after someone has buzzed in. This is sent when the host presses the
    /// "incorrect" button displayed when a player has buzzed in.
    #[display(fmt = "marking the buzzed in player incorrect")]
    OwnerIncorrect,
    /// Set the state. This is sent to a client whenever they first connect to the server, and is
    /// simply a noop on the server side.
    #[display(fmt = "set the state")]
    SetState {
        /// The current state
        state: GameState,
    },
    /// Buzz in. This is sent from a client when one of their contestants has pressed their buzz
    /// key.
    #[display(fmt = "player {} is attempting to buzz in", index)]
    Buzz {
        /// The index of the player who wants to buzz in.
        index: usize,
    },
    /// Undo the latest command sent to the server.
    #[display(fmt = "undoing the latest command")]
    Undo,
}

impl Command {
    /// Is this command from the host?
    pub fn from_host(&self) -> bool {
        match &self {
            Command::SetPtValues { .. } => true,
            Command::SetScore { .. } => true,
            Command::OwnerCorrect => true,
            Command::AddPtsIndex => true,
            Command::SubPtsIndex => true,
            Command::OpenBuzzer => true,
            Command::EndRound => true,
            Command::OwnerIncorrect => true,
            _ => false,
        }
    }
}
