//! Several items related to [`GameState`].

use crate::command::Command;
use crate::{Buzzer, Player};
use log::info;
use serde::{Deserialize, Serialize};

/// A GameState represents the basic state of the game at a point in time. It
/// will be wrapped on the server and client side by ServerState and ClientState,
/// respectively. Those wrappers are for the purpose of containing extra data
/// only relevant to the client (such as Contestants) or the server (such as
/// Registry).
#[derive(Clone, Serialize, Deserialize)]
pub struct GameState {
    /// The current state of the buzzer.
    pub buzzer: Buzzer,
    /// All players currently participating in the game.
    pub players: Vec<Player>,
    /// All commands which have been sent to the server this game.
    pub history: Vec<Command>,
    /// The current list of possible point values. In the normal Jeopardy! round, this list is
    /// `200, 400, 600, 800, 1000`, and in Double Jeopardy!, it is `400, 800, 1200, 1600, 2000`.
    pub ptvalues: Vec<i32>,
    /// The current points worth, represented as an index into `ptvalues`.
    /// [`Command::OwnerCorrect`] will get the element of `ptvalues` at this index and add that
    /// amount to the score of the buzzed-in player.
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
    /// Return a default state
    pub fn new() -> Self {
        Self::default()
    }

    fn set_score(&mut self, index: usize, score: i32) -> Option<()> {
        let player = self.players.get_mut(index)?;
        info!(" -> player {} is {}", index, player.name);
        player.score = score;
        Some(())
    }

    fn end_round(&mut self) {
        for player in &mut self.players {
            player.blocked = false;
        }
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
        self.players.push(Player {
            name,
            score: 0,
            blocked: false,
        });
    }

    fn owner_correct(&mut self) -> Option<()> {
        if let Buzzer::TakenBy { owner } = &self.buzzer {
            let ptsworth = self.ptvalues.get(self.ptsindex)?;
            info!(
                " -> adding {} to {}",
                ptsworth,
                self.players.get(*owner)?.name
            );
            self.players.get_mut(*owner)?.score += ptsworth;
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

    fn add_pts_index(&mut self) -> Option<()> {
        if self.ptsindex + 1 < self.ptvalues.len() {
            self.ptsindex += 1;
            info!(" -> new points worth is {}", self.ptvalues[self.ptsindex]);
            Some(())
        } else {
            info!(" -> points worth already at maximum");
            None
        }
    }

    fn sub_pts_index(&mut self) -> Option<()> {
        if self.ptsindex != 0 {
            self.ptsindex -= 1;
            info!(" -> new points worth is {}", self.ptvalues[self.ptsindex]);
            Some(())
        } else {
            info!(" -> points worth already at minimum");
            None
        }
    }

    fn undo_set_pt_values(&mut self) {
        let mut found = false;
        for cmd in &self.history {
            if let Command::SetPtValues { values } = cmd {
                found = true;
                self.ptvalues = values.clone();
                break;
            }
        }

        if !found {
            self.ptvalues = Self::new().ptvalues;
        }

        info!(
            " -> reverted point values to previous value {:?}",
            self.ptvalues
        );
    }

    fn undo_owner_correct(&mut self) {
        for cmd in &self.history {
            if let Command::Buzz { index } = cmd {
                self.buzzer = Buzzer::TakenBy { owner: *index };
                self.ptsindex -= 1;
                self.ptsindex %= self.ptvalues.len();
                if let Some(ptsworth) = self.ptvalues.get(self.ptsindex) {
                    if let Some(player) = self.players.get_mut(*index) {
                        player.score -= ptsworth;
                    }
                }
                for cmd in &self.history {
                    match cmd {
                        Command::Buzz { index } => {
                            if let Some(player) = self.players.get_mut(*index) {
                                player.blocked = true;
                            }
                        }
                        Command::OpenBuzzer => break,
                        _ => (),
                    }
                }
                break;
            }
        }
    }

    fn undo_owner_incorrect(&mut self) {
        for cmd in &self.history {
            if let Command::Buzz { index } = cmd {
                self.buzzer = Buzzer::TakenBy { owner: *index };
                break;
            }
        }
    }

    fn undo_open_buzzer(&mut self) -> Option<()> {
        self.buzzer.close();
        for player in &mut self.players {
            player.blocked = false;
        }
        Some(())
    }

    fn undo_end_round(&mut self) {
        self.buzzer = Buzzer::Open;
        self.ptsindex -= 1;
        self.ptsindex %= self.ptvalues.len();

        for cmd in &self.history {
            match cmd {
                Command::Buzz { index } => {
                    if let Some(player) = self.players.get_mut(*index) {
                        player.blocked = true;
                    }
                }
                Command::OpenBuzzer => break,
                _ => (),
            }
        }
    }

    fn fast_forward(&mut self) -> Option<()> {
        let mut new_state = Self::new();
        info!(" ---- FAST-FORWARDING ----");
        for cmd in &self.history {
            new_state.apply_command(cmd.clone())?;
        }
        *self = new_state;
        info!(" ---- FINISHED FAST-FORWARDING ----");
        Some(())
    }

    fn undo(&mut self) -> Option<()> {
        let mut last_cmd_opt = None;

        for index in 0..self.history.len() {
            let cmd = self.history[index].clone();
            if cmd.from_host() {
                last_cmd_opt = Some(cmd);
                self.history.remove(index);
                break;
            }
        }

        match last_cmd_opt {
            Some(cmd) => {
                info!(" -> undoing {}", cmd);
                match cmd {
                    Command::SetPtValues { .. } => self.undo_set_pt_values(),
                    Command::OwnerIncorrect => self.undo_owner_incorrect(),
                    Command::OwnerCorrect => self.undo_owner_correct(),
                    Command::AddPtsIndex => self.ptsindex -= 1,
                    Command::SubPtsIndex => self.ptsindex += 1,
                    Command::OpenBuzzer => self.undo_open_buzzer()?,
                    Command::EndRound => self.undo_end_round(),
                    _ => self.fast_forward()?,
                }
                Some(())
            }
            None => {
                info!(" -> but there is no previous command!");
                None
            }
        }
    }

    /// Apply a [`Command`] to the state. This is called on the state whenever a [`Command`] is
    /// recieved.
    pub fn apply_command(&mut self, cmd: Command) -> Option<()> {
        info!("{}", cmd);

        let opt = match cmd.clone() {
            Command::SetScore { index, score } => self.set_score(index, score),
            Command::SetPtValues { values } => Some(self.ptvalues = values),
            Command::AddPlayer { name } => Some(self.add_player(name)),
            Command::SetState { .. } => None,
            Command::Buzz { index } => self.buzz(index),
            Command::OwnerCorrect => self.owner_correct(),
            Command::AddPtsIndex => self.add_pts_index(),
            Command::SubPtsIndex => self.sub_pts_index(),
            Command::OpenBuzzer | Command::OwnerIncorrect => Some(self.open_buzzer()),
            Command::EndRound => Some(self.end_round()),
            Command::Undo => self.undo(),
        };

        if opt.is_some() {
            self.history.insert(0, cmd);
        }

        opt
    }

    fn format_set_score(&self, index: &usize, score: &i32) -> Option<String> {
        let name = &self.players.get(*index)?.name;
        Some(format!("setting {}'s score to {}'", name, score))
    }

    fn format_owner_correct(&self) -> Option<String> {
        for cmd in &self.history {
            match cmd {
                Command::Buzz { index } => {
                    let name = &self.players.get(*index)?.name;
                    return Some(format!("marking {} correct", name));
                }
                Command::OpenBuzzer => break,
                _ => (),
            }
        }

        None
    }

    fn format_owner_incorrect(&self) -> Option<String> {
        for cmd in &self.history {
            match cmd {
                Command::Buzz { index } => {
                    let name = &self.players.get(*index)?.name;
                    return Some(format!("marking {} incorrect", name));
                }
                Command::OpenBuzzer => break,
                _ => (),
            }
        }

        None
    }

    /// Properly display the nth command in the history (that was sent by the host) using player
    /// names instead of numbers and such.
    pub fn format_nth_command(&self, index: usize) -> Option<String> {
        self.history
            .iter()
            .filter(|cmd| cmd.from_host())
            .nth(index)
            .and_then(|cmd| match cmd {
                Command::SetScore { index, score } => self.format_set_score(index, score),
                Command::SetPtValues { .. } => Some("toggling double jeopardy".into()),
                Command::OwnerCorrect => self.format_owner_correct(),
                Command::AddPtsIndex => Some("incrementing the points worth".into()),
                Command::SubPtsIndex => Some("decrementing the points worth".into()),
                Command::OpenBuzzer => Some("opening the buzzer".into()),
                Command::EndRound => Some("ending the round".into()),
                Command::OwnerIncorrect => self.format_owner_incorrect(),
                _ => None,
            })
    }
}
