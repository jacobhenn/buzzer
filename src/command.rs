use crate::state::State;
use actix::Message;
use derive_more::Display;
use serde::{Deserialize, Serialize};

////////////////////////////////////////////////////////////////////////////////
// Command represents an instruction by Host to change the State
// Commands can be deserialized from a JSON request
#[derive(Clone, Serialize, Deserialize, Debug, Display)]
#[serde(tag = "action")]
#[derive(Message)]
#[rtype(result = "()")]
pub enum Command {
    #[display(fmt = "adding {} to {}", score, name)]
    AddScore { name: String, score: i32 },
    #[display(fmt = "setting {}'s score to {}", name, score)]
    SetScore { name: String, score: i32 },
    #[display(fmt = "ending the round")]
    EndRound,
    #[display(fmt = "opening the buzzer")]
    OpenBuzzer,
    #[display(fmt = "removing {}", name)]
    RemovePlayer { name: String },
    #[display(fmt = "adding {}", name)]
    AddPlayer { name: String },
    #[display(fmt = "clearing players")]
    ClearPlayers,
    #[display(fmt = "unblocking all players")]
    ClearBlocked,
    #[display(fmt = "blocking {}", name)]
    Block { name: String },
    #[display(fmt = "unblocking {}", name)]
    Unblock { name: String },
    #[display(fmt = "closing the buzzer")]
    CloseBuzzer,
    #[display(fmt = "changing history entry #{} to {} points", index, score)]
    EditHistory { index: usize, score: i32 },
    #[display(fmt = "removing history entry #{}", index)]
    RemoveHistory { index: usize },
    #[display(fmt = "clearing the history")]
    ClearHistory,
    #[display(fmt = "setting points worth to {}", pts)]
    SetPtsWorth { pts: i32 },
    #[display(fmt = "adding points worth to buzzed in player")]
    OwnerCorrect,
    // This command should only ever be sent to a client.
    #[display(fmt = "Set the state")]
    #[serde(skip_deserializing)]
    SetState { state: State },
    #[display(fmt = "{} is attempting to buzz in", name)]
    Buzz { name: String },
}
