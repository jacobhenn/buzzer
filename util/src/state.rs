use crate::command::Command;
use crate::{Buzzer, HistEntry, History, Player};
use log::info;
use serde::{Serialize, Deserialize};

////////////////////////////////////////////////////////////////////////////////
// A GameState represents the basic state of the game at a point in time. It
// will be wrapped on the server and client side by ServerState and ClientState,
// respectively. Those wrappers are for the purpose of containing extra data
// only relevant to the client (such as Contestants) or the server (such as
// Registry).
#[derive(Clone, Serialize, Deserialize)]
pub struct GameState {
    pub buzzer: Buzzer,
    pub players: Vec<Player>,
    pub history: Vec<HistEntry>,
    pub ptvalues: Vec<i32>,
    pub ptsindex: usize,
}

impl Default for GameState {
    fn default() -> Self {
        Self {
            buzzer: Buzzer::Closed,
            players: Vec::new(),
            history: Vec::new(),
            ptvalues: vec![200, 400, 600, 800, 1000],
            ptsindex: 0,
        }
    }
}

impl GameState {
    pub fn new() -> Self {
        Self::default()
    }

    fn set_score(&mut self, index: usize, score: i32) -> Option<()> {
        let player = self.players.get_mut(index)?;
        info!(" -> player {} is {}", index, player.name);
        player.score = score;
        self.history.log(index, score - player.score);
        Some(())
    }

    fn end_round(&mut self) {
        for player in &mut self.players { player.blocked = false; }
        self.buzzer.close();
        self.ptsindex += 1;
        self.ptsindex %= self.ptvalues.len();
    }

    fn open_buzzer(&mut self) {
        // If everyone's blocked, OpenBuzzer ends the round instead.
        if self.players.iter().all(|p| p.blocked) {
            self.end_round();
        } else {
            self.buzzer.open();
        }
    }

    fn add_player(&mut self, name: String) {
        let mut score = 0;
        for entry in &self.history {
            if self.players.get(entry.player).map(|p| &p.name) == Some(&name) {
                score += entry.delta;
            }
        }

        self.players.push( Player { name, score, blocked: false } );
    }

    fn edit_history(&mut self, index: usize, delta: i32) -> Option<()> {
        let e = self.history.get_mut(index)?;
        // How much did we add to/subtract from this player's score?
        let diff = delta - e.delta;
        e.delta = delta;

        // Add that diff to the current score of this player
        let p = self.players.get_mut(e.player)?;
        p.score += diff;

        Some(())
    }

    fn remove_history(&mut self, index: usize) -> Option<()> {
        let e = self.history.get(index)?;

        let p = self.players.get_mut(e.player)?;
        p.score -= e.delta;

        self.history.remove(index);
        Some(())
    }

    fn owner_correct(&mut self) -> Option<()> {
        if let Buzzer::TakenBy { owner } = &self.buzzer {
            let ptsworth = self.ptvalues.get(self.ptsindex)?;
            info!(" -> adding {} to {}", ptsworth, owner);
            self.players.get_mut(*owner)?.score += ptsworth;
            self.history.log(*owner, *ptsworth);
            self.end_round();
        } else {
            info!(" -> but there is no owner!");
            None?;
        }

        Some(())
    }

    fn buzz(&mut self, index: usize) -> Option<()> {
        let mut player = self.players.get_mut(index)?;
        info!(" -> player {} is {}", index, player.name);

        if player.blocked {
            info!(" -> they are blocked");
            None?;
        }

        match &self.buzzer {
            Buzzer::TakenBy { owner } => {
                info!(" -> {} already buzzed in", self.players.get(*owner)?.name);
                None?;
            }
            Buzzer::Closed => {
                info!(" -> the buzzer is closed");
                None?;
            }
            Buzzer::Open => {
                info!(" -> they succeeded");
                player.blocked = true;
                self.buzzer.take(index);
            }
        }

        Some(())
    }

    // Takes a Command and a mutable reference to the state and applies the
    // command to the state. Returns None if the command couldn't be executed
    // for some reason.
    pub fn apply_command(&mut self, cmd: Command) -> Option<()> {
        info!("{}", cmd);

        match cmd {
            Command::EditHistory { index, delta } => self.edit_history(index, delta)?,
            Command::SetScore { index, score }    => self.set_score(index, score)?,
            Command::RemoveHistory { index }      => self.remove_history(index)?,
            Command::RemovePlayer { index }       => { self.players.remove(index); },
            Command::SetPtValues { values }       => self.ptvalues = values,
            Command::SetPtsIndex { index }        => self.ptsindex = index,
            Command::AddPlayer { name }           => self.add_player(name),
            Command::Unblock { index }            => self.players.get_mut(index)?.blocked = false,
            Command::SetState { .. }              => (),
            Command::Buzz { index }               => self.buzz(index)?,
            Command::OwnerCorrect                 => self.owner_correct()?,
            Command::OpenBuzzer                   => self.open_buzzer(),
            Command::EndRound                     => self.end_round(),
        };

        Some(())
    }
}
