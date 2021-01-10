mod scorekeeper;

use actix_web::{get, post, web, App, HttpServer, HttpResponse};
use serde::{Deserialize, Serialize};
use crate::scorekeeper::Team;
use actix_files as fs;
use std::sync::Mutex;

////////////////////////////////////////////////////////////////////////////////
// What the client needs to GET:
//     - whether they are blocked from buzzing
//     - the current state of the buzzer
// What the client needs to POST:
//     - (player) that they've buzzed
//     - (reader) open the buzzer
//     - (reader) close the buzzer
//     - (reader) clear the blocked players
//     - (reader) mainpulate scores
//
// Server URIs:
//     - "/": asks user if they are Contestant or Host
//     - "/static/name.html": gets user's name
//     - "/static/host.html": host interface
//     - "/static/contestant.html": contestant interface
//     - "/state/buzzer": responds with Buzzer in JSON form to GET
//     - "/state/blocked/{name}": nonempty GET response if {name} is blocked
//     - "/state/scores": provides scores in text form
//     - "/buzz": contestants can POST to buzz
//     - "/command": host can POST a Command to execute it

////////////////////////////////////////////////////////////////////////////////
// the Buzzer can either be open, closed, or taken by a player.
// the Buzzer state can be serialized and sent as JSON
#[derive(Serialize, PartialEq)]
#[serde(tag = "state")]
enum Buzzer {
    Open,
    Closed,
    TakenBy { player: String },
}

impl Buzzer {
    fn open(&mut self) {
        *self = Buzzer::Open;
    }

    fn close(&mut self) {
        *self = Buzzer::Closed;
    }

    fn take(&mut self, name: String) {
        *self = Buzzer::TakenBy { player: name };
    }
}

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players who have already buzzed, and a
// list of teams' scores
struct State {
    buzzer: Buzzer,
    scores: Vec<Team>,
    blocked: Vec<String>,
}

impl State {
    fn new() -> State {
        let new_scores: Vec<Team> = Vec::new();
        let new_blocked: Vec<String> = Vec::new();

        State {
            buzzer: Buzzer::Closed,
            scores: new_scores,
            blocked: new_blocked
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// Command represents an instruction by Host to change the State
// Commands can be deserialized from a JSON request
#[derive(Deserialize, Debug)]
#[serde(tag = "action")]
enum Command {
    // regular commands
    AddScore { name: String, score: i32 },
    SetScore { name: String, score: i32 },
    EndRound,
    OpenBuzzer,
    RemoveTeam { name: String },
    AddTeam { name: String },
    // special commands
    EmptyTeams,
    EmptyBlocked,
    RemoveBlocked { name: String },
    AddBlocked { name: String },
    CloseBuzzer,
}

////////////////////////////////////////////////////////////////////////////////
// asks you if you'll be an reader or a player.
async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(include_str!("../static/index.html"))
}

////////////////////////////////////////////////////////////////////////////////
// returns the current state of the buzzer
#[get("/state/buzzer")]
async fn state(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.buzzer)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting their names to "/buzz" to buzz in
#[post("/buzz")]
async fn buzz(
    name: String,
    app_state: web::Data<Mutex<State>>
) -> HttpResponse {
    let mut state_lock = app_state.lock().unwrap();

    if state_lock.buzzer == Buzzer::Open {
        state_lock.blocked.push(name.clone());
        state_lock.buzzer.take(name);
    }
    HttpResponse::Ok().json(&state_lock.buzzer)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting JSON Commands to "/command"
#[post("/command")]
async fn command(
    command: web::Json<Command>,
    app_state: web::Data<Mutex<State>>
) -> HttpResponse {
    let mut state_lock = app_state.lock().unwrap();

    match command.into_inner() {
        Command::AddScore { name, score } => {
            scorekeeper::add_score(&mut state_lock.scores, name, score);
            HttpResponse::NoContent().body("")
        },
        Command::SetScore { name, score } => {
            scorekeeper::set_score(&mut state_lock.scores, name, score);
            HttpResponse::NoContent().body("")
        },
        Command::EndRound => {
            state_lock.blocked.clear();
            state_lock.buzzer.close();
            HttpResponse::NoContent().body("")
        },
        Command::OpenBuzzer => {
            state_lock.buzzer.open();
            HttpResponse::NoContent().body("")
        },
        Command::AddTeam { name } => {
            state_lock.scores.push(
                Team {
                    name: name,
                    score: 0
                }
            );
            HttpResponse::NoContent().body("")
        },
        Command::RemoveTeam { name } => {
            state_lock.scores.retain(
                |x| x.name != name
            );
            HttpResponse::NoContent().body("")
        },
        _ => HttpResponse::BadRequest().body(""),
    }
}

////////////////////////////////////////////////////////////////////////////////
// returns "truthy" nonempty string if {name} isn't in State.blocked
#[post("/blocked/{name}")]
async fn blocked(
    name: String, app_state: web::Data<Mutex<State>>
) -> HttpResponse {
    let state_lock = app_state.lock().unwrap();

    if state_lock.blocked.contains(&name) {
        HttpResponse::Ok().body(" ")
    } else {
        HttpResponse::Ok().body("")
    }
}

////////////////////////////////////////////////////////////////////////////////
// returns text rendering of the current State.scores at "/state/scores"
#[get("/state/scores")]
async fn scores(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    let state_lock = app_state.lock().unwrap();

    let formatted_scores = format!("{:#?}", state_lock.scores);

    HttpResponse::Ok().body(formatted_scores)
}

////////////////////////////////////////////////////////////////////////////////
// main
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(Mutex::new(State::new()));
    
    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(fs::Files::new("/static", "./static").show_files_listing())
            .route("/", web::get().to(index))
            .service(buzz)
            .service(command)
            .service(state)
            .service(blocked)
            .service(scores)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
