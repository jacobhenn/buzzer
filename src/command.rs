use serde::Deserialize;
use std::error::Error;
use std::fmt;
use std::str::FromStr;

////////////////////////////////////////////////////////////////////////////////
// Command represents an instruction by Host to change the State
// Commands can be deserialized from a JSON request
#[derive(Deserialize, Debug)]
#[serde(tag = "action")]
pub enum Command {
    AddScore { name: String, score: u32 },
    SetScore { name: String, score: u32 },
    EndRound,
    OpenBuzzer,
    RemovePlayer { name: String },
    AddPlayer { name: String },
    ClearPlayers,
    ClearBlocked,
    RemoveBlocked { name: String },
    AddBlocked { name: String },
    CloseBuzzer,
}

impl fmt::Display for Command {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let cmd_str = match self {
            Self::AddScore{name, score} =>
                format!("adding {} to {}", score, name),
            Self::SetScore{name, score} =>
                format!("setting {}'s score to {}", name, score),
            Self::EndRound => "ending the round".to_string(),
            Self::OpenBuzzer => "opening the buzzer".to_string(),
            Self::RemovePlayer{name} => format!("removing {}", name),
            Self::AddPlayer{name} => format!("adding {}", name),
            Self::ClearPlayers => "removing all players".to_string(),
            Self::ClearBlocked => "unblocking all players".to_string(),
            Self::RemoveBlocked{name} => format!("unblocking {}", name),
            Self::AddBlocked{name} => format!("blocking {} from buzzing", name),
            Self::CloseBuzzer => "closing buzzer".to_string(),
        };
        write!(f, "{}", cmd_str)
    }
}

impl FromStr for Command {
    type Err = ParseCmdErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut args = s.split(' ').map(|s| s.to_string());
        let cmd = args.next().ok_or(ParseCmdErr::NoCmd)?;
        match cmd.to_lowercase().as_str() {
            "addscore" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                let score = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 2})?
                    .parse::<u32>()
                    .map_err(|_| ParseCmdErr::InvalidArg{index: 2})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 3}),
                    None => Ok(Self::AddScore{name, score}),
                }
            },
            "setscore" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                let score = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 2})?
                    .parse::<u32>()
                    .map_err(|_| ParseCmdErr::InvalidArg{index: 2})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 3}),
                    None => Ok(Self::SetScore{name, score}),
                }
            },
            "endround" => match args.next() {
                Some(_) => Err(ParseCmdErr::ExtraArg{index: 1}),
                None => Ok(Self::EndRound),
            },
            "openbuzzer" => match args.next() {
                Some(_) => Err(ParseCmdErr::ExtraArg{index: 1}),
                None => Ok(Self::OpenBuzzer),
            },
            "removeplayer" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 2}),
                    None => Ok(Self::RemovePlayer{name}),
                }
            },
            "addplayer" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 2}),
                    None => Ok(Self::AddPlayer{name}),
                }
            },
            "clearplayers" => match args.next() {
                Some(_) => Err(ParseCmdErr::ExtraArg{index: 1}),
                None => Ok(Self::ClearPlayers),
            },
            "clearblocked" => match args.next() {
                Some(_) => Err(ParseCmdErr::ExtraArg{index: 1}),
                None => Ok(Self::ClearBlocked),
            },
            "removeblocked" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 2}),
                    None => Ok(Self::RemoveBlocked{name}),
                }
            },
            "addblocked" => {
                let name = args.next()
                    .ok_or(ParseCmdErr::MissingArg{index: 1})?;
                match args.next() {
                    Some(_) => Err(ParseCmdErr::ExtraArg{index: 2}),
                    None => Ok(Self::AddBlocked{name}),
                }
            },
            "closebuzzer" => match args.next() {
                Some(_) => Err(ParseCmdErr::ExtraArg{index: 1}),
                None => Ok(Self::CloseBuzzer),
            },
            _ => Err(ParseCmdErr::NotACmd),
        }
    }
}

#[derive(Debug)]
pub enum ParseCmdErr {
    NoCmd,
    NotACmd,
    MissingArg { index: usize },
    ExtraArg { index: usize },
    InvalidArg { index: usize },
}

impl fmt::Display for ParseCmdErr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let err_str = match self {
            Self::NoCmd => "no command was given".to_string(),
            Self::NotACmd => "command given is not a command".to_string(),
            Self::MissingArg{index: i} => format!("missing arg #{}", i),
            Self::ExtraArg{index: i} => format!("extra arg at position {}", i),
            Self::InvalidArg{index: i} => format!("invalid value for arg #{}", i),
        };
        write!(f, "{}", err_str)
    }
}

impl Error for ParseCmdErr {
    fn source(&self) -> Option<&(dyn Error + 'static)> { None }
}