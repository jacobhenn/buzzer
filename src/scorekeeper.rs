use serde::Serialize;
use std::fmt;

#[derive(Serialize, Debug)]
pub struct Player {
    pub name: String,
    pub score: i32,
}

impl fmt::Display for Player {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.name, self.score)
    }
}

pub fn add_score(players: &mut Vec<Player>, name: &str, score: i32) {
    players.iter_mut().for_each(|x| {
        if x.name == *name {
            x.score += score;
        }
    });
}

pub fn set_score(players: &mut Vec<Player>, name: &str, score: i32) {
    players.iter_mut().for_each(|x| {
        if x.name == *name {
            x.score = score;
        }
    });
}

pub fn sort_players(players: &mut Vec<Player>) {
    players.sort_by_key(|x| x.score);
    players.reverse();
}
