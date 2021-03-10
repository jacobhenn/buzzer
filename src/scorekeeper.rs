use serde::Serialize;
use std::fmt;

#[derive(Serialize, Debug)]
pub struct Player {
    pub name: String,
    pub score: i32,
    pub blocked: bool,
}

impl fmt::Display for Player {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.name, self.score)
    }
}

pub trait PlayerList {
    fn add_score (&mut self, name: &str, score: i32);
    fn set_score (&mut self, name: &str, score: i32);
    fn block     (&mut self, name: &str);
    fn unblock   (&mut self, name: &str);

    fn unblock_all(&mut self);

    fn get_score (&self, name: &str) -> Option<i32>;
    fn is_blocked(&self, name: &str) -> bool;
}

impl PlayerList for Vec<Player> {
    fn add_score(&mut self, name: &str, score: i32) {
        if let Some(i) = self.iter().position(|p| p.name == name) {
            self[i].score += score;
        }
        self.sort_by_key(|x| x.score);
        self.reverse();
    }

    fn set_score(&mut self, name: &str, score: i32) {
        if let Some(i) = self.iter().position(|p| p.name == name) {
            self[i].score = score;
        }
        self.sort_by_key(|x| x.score);
        self.reverse();
    }

    fn block(&mut self, name: &str) {
        if let Some(i) = self.iter().position(|p| p.name == name) {
            self[i].blocked = true;
        }
    }

    fn unblock(&mut self, name: &str) {
        if let Some(i) = self.iter().position(|p| p.name == name) {
            self[i].blocked = false;
        }
    }

    fn unblock_all(&mut self) {
        for player in self {
            player.blocked = false;
        }
    }

    fn get_score(&self, name: &str) -> Option<i32> {
        self.iter().find(|p| p.name == name).map(|i| i.score)
    }

    fn is_blocked(&self, name: &str) -> bool {
        self.iter().any(|p| p.name == name && p.blocked)
    }
}
