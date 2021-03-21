use serde::Deserialize;
use std::fmt;

////////////////////////////////////////////////////////////////////////////////
// Command represents an instruction by Host to change the State
// Commands can be deserialized from a JSON request
#[derive(Deserialize, Debug)]
#[serde(tag = "action")]
pub enum Command {
    AddScore { name: String, score: i32 },
    SetScore { name: String, score: i32 },
    EndRound,
    OpenBuzzer,
    RemovePlayer { name: String },
    AddPlayer { name: String },
    ClearPlayers,
    ClearBlocked,
    Block { name: String },
    Unblock { name: String },
    CloseBuzzer,
    EditHistory { index: usize, score: i32 },
    RemoveHistory { index: usize },
    ClearHistory,
    SetPtsWorth { pts: i32 },
    OwnerCorrect,
}

impl fmt::Display for Command {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let cmd_str = match self {
            Self::AddScore { name, score } => {
                format!("adding {} to {}", score, name)
            }
            Self::SetScore { name, score } => {
                format!("setting {}'s score to {}", name, score)
            }
            Self::EndRound => "ending the round".to_string(),
            Self::OpenBuzzer => "opening the buzzer".to_string(),
            Self::RemovePlayer { name } => format!("removing {}", name),
            Self::AddPlayer { name } => format!("adding {}", name),
            Self::ClearPlayers => "removing all players".to_string(),
            Self::ClearBlocked => "unblocking all players".to_string(),
            Self::Block { name } => format!("blocking {} from buzzing", name),
            Self::Unblock { name } => format!("unblocking {}", name),
            Self::CloseBuzzer => "closing buzzer".to_string(),
            Self::EditHistory { index, score: _ } => {
                format!("changing history entry #{}", index + 1)
            }
            Self::RemoveHistory { index } => {
                format!("removing history entry #{}", index + 1)
            }
            Self::ClearHistory => "clearing history".to_string(),
            Self::SetPtsWorth { pts } => {
                format!("setting points worth to {}", pts)
            }
            Self::OwnerCorrect => "adding current points worth to buzzed in player".to_string(),
        };
        write!(f, "{}", cmd_str)
    }
}
