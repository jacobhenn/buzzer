use crate::state::GameState;
use derive_more::Display;
use serde::{Deserialize, Serialize};

#[cfg(feature = "actix")]
use actix::Message;

////////////////////////////////////////////////////////////////////////////////
// Commands are what the client and server use to efficiently communicate about
// changes to the state.
#[derive(Clone, Serialize, Deserialize, Display)]
#[cfg_attr(feature = "actix", derive(Message), rtype(result = "()"))]
pub enum Command {
    #[display(fmt = "setting player {}'s score to {}", index, score)]
    SetScore { index: usize, score: i32 },
    #[display(fmt = "ending the round")]
    EndRound,
    #[display(fmt = "opening the buzzer")]
    OpenBuzzer,
    #[display(fmt = "removing player {}", index)]
    RemovePlayer { index: usize },
    #[display(fmt = "adding {}", name)]
    AddPlayer { name: String },
    #[display(fmt = "unblocking player {}", index)]
    Unblock { index: usize },
    #[display(fmt = "changing history entry #{} to {} points", index, delta)]
    EditHistory { index: usize, delta: i32 },
    #[display(fmt = "removing history entry #{}", index)]
    RemoveHistory { index: usize },
    #[display(fmt = "setting the points worth index to {}", index)]
    SetPtsIndex { index: usize },
    #[display(fmt = "setting the list of point values to {:?}", values)]
    SetPtValues { values: Vec<i32> },
    #[display(fmt = "adding points worth to buzzed in player")]
    OwnerCorrect,
    #[display(fmt = "set the state")]
    SetState { state: GameState },
    #[display(fmt = "player {} is attempting to buzz in", index)]
    Buzz { index: usize },
}
