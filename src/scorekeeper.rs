use serde::Serialize;
use std::fmt;
use log::debug;

#[derive(Serialize, Debug)]
pub struct Player {
    pub name: String,
    pub score: u32,
    pub blocked: bool,
}

impl fmt::Display for Player {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.name, self.score)
    }
}

pub trait PlayerList {
    fn add_score (&mut self, name: &str, score: u32);
    fn set_score (&mut self, name: &str, score: u32);
    fn block     (&mut self, name: &str);
    fn unblock   (&mut self, name: &str);

    fn unblock_all(&mut self);

    fn get_score (&self, name: &str) -> Option<u32>;
    fn is_blocked(&self, name: &str) -> bool;
}

impl PlayerList for Vec<Player> {
    fn add_score(&mut self, name: &str, score: u32) {
        self.iter().position(|p| p.name == name)
            .map(|i| self[i].score += score);
        self.sort_by_key(|x| x.score);
        self.reverse();
    }

    fn set_score(&mut self, name: &str, score: u32) {
        self.iter().position(|p| p.name == name)
            .map(|i| self[i].score = score);
        self.sort_by_key(|x| x.score);
        self.reverse();
    }

    fn block(&mut self, name: &str) {
        self.iter().position(|p| p.name == name)
            .map(|i| self[i].blocked = true);
    }

    fn unblock(&mut self, name: &str) {
        self.iter().position(|p| p.name == name)
            .map(|i| self[i].blocked = false);
    }

    fn unblock_all(&mut self) {
        for player in self {
            player.blocked = false;
        }
    }

    fn get_score(&self, name: &str) -> Option<u32> {
        self.iter().position(|p| p.name == name)
            .map(|i| self[i].score)
    }

    fn is_blocked(&self, name: &str) -> bool {
        self.iter().any(|p| p.name == name && p.blocked)
    }
}
