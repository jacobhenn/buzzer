use serde::Serialize;
use std::fmt;

#[derive(Serialize, Debug)]
pub struct Team {
    pub name: String,
    pub score: i32,
}

impl fmt::Display for Team {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.name, self.score)
    }
}

pub fn add_score(teams: &mut Vec<Team>, name: &str, score: i32) {
    teams.iter_mut().for_each(|x| {
        if x.name == *name {
            x.score += score;
        }
    });
}

pub fn set_score(teams: &mut Vec<Team>, name: &str, score: i32) {
    teams.iter_mut().for_each(|x| {
        if x.name == *name {
            x.score = score;
        }
    });
}
