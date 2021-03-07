#![deny(clippy::all)]
#![deny(clippy::pedantic)]
#![deny(clippy::nursery)]
#![deny(clippy::cargo)]
#![allow(clippy::module_name_repetitions)]
#![allow(clippy::items_after_statements)]
#![allow(clippy::multiple_crate_versions)]
#![allow(clippy::cargo_common_metadata)]

mod scorekeeper;

use crate::scorekeeper::Player;
use actix_files;
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};
use serde_json;
use std::sync::Mutex;
use log::{trace, info, warn, error, set_max_level, LevelFilter};
use env_logger::Env;
use std::error::Error;
use std::fs;
use std::path::Path;

#[cfg(target_family = "unix")]
const DIR: &str = env!("PWD");

#[cfg(target_family = "windows")]
const DIR: &str = env!("CD");

#[derive(Deserialize)]
struct Config {
    log_level: LevelFilter,
    address: String,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            log_level: LevelFilter::Warn,
            address: "127.0.0.1:8080".to_string(),
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// Full Server URI List:
//     - "/": serves the svelte app
//     - "/state/buzzer": responds with Buzzer in JSON form to GET
//     - "/blocked/{name}": nonempty GET response if {name} is blocked
//     - "/state/scores": provides scores in text form
//     - "/buzz": contestants can POST to buzz
//     - "/command": client can POST a Command to execute it
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// the Buzzer can either be open, closed, or taken by a player.
// the Buzzer state can be serialized and sent as JSON
#[derive(Serialize, PartialEq)]
#[serde(tag = "state")]
enum Buzzer {
    Open,
    Closed,
    TakenBy { owner: String },
}

impl Buzzer {
    fn open (&mut self)               { *self = Self::Open;   }
    fn close(&mut self)               { *self = Self::Closed; }
    fn take (&mut self, name: String) { *self = Self::TakenBy { owner: name }; }
}

////////////////////////////////////////////////////////////////////////////////
// State contains a Buzzer, a list of players who have already buzzed, and a
// list of players' scores
struct State {
    buzzer: Buzzer,
    scores: Vec<Player>,
    blocked: Vec<String>,
}

impl State {
    const fn new() -> Self {
        let new_scores:  Vec<Player> = Vec::new();
        let new_blocked: Vec<String> = Vec::new();

        Self {
            buzzer: Buzzer::Closed,
            scores: new_scores,
            blocked: new_blocked,
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
    RemovePlayer { name: String },
    AddPlayer { name: String },
    // special commands
    ClearPlayers,
    ClearBlocked,
    RemoveBlocked { name: String },
    AddBlocked { name: String },
    CloseBuzzer,
}

////////////////////////////////////////////////////////////////////////////////
// home page - redirects you to /static/new/index.html
async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body("<!DOCTYPE html><html><head><meta http-equiv='refresh' content='0; URL=/static/new/index.html'></head></html>")
}


////////////////////////////////////////////////////////////////////////////////
// returns the current state of the buzzer in JSON form
#[get("/state/buzzer")]
async fn state(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    trace!("serving /state/buzzer");
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.buzzer)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting their names to "/buzz" to buzz in
#[post("/buzz")]
async fn buzz(
    name: String,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse {
    let mut state_lock = app_state.lock().unwrap();
    let is_blocked = state_lock.blocked.contains(&name);

    if state_lock.buzzer == Buzzer::Open && !is_blocked {
        info!("{} has sucessfully buzzed in", &name);
        state_lock.blocked.push(name.clone());
        state_lock.buzzer.take(name);
    } else { info!("{} tried to buzz in and was blocked", &name); }

    HttpResponse::Ok().json(&state_lock.buzzer)
}

fn match_command(op_command: Command, state_lock: &mut State) -> HttpResponse {
    match op_command {
        Command::AddScore { name, score } => {
            scorekeeper::add_score(&mut state_lock.scores, &name, score);
            scorekeeper::sort_players(&mut state_lock.scores);
            HttpResponse::NoContent().body("")
        }
        Command::SetScore { name, score } => {
            scorekeeper::set_score(&mut state_lock.scores, &name, score);
            scorekeeper::sort_players(&mut state_lock.scores);
            HttpResponse::NoContent().body("")
        }
        Command::EndRound => {
            state_lock.blocked.clear();
            state_lock.buzzer.close();
            HttpResponse::NoContent().body("")
        }
        Command::OpenBuzzer => {
            state_lock.buzzer.open();
            HttpResponse::NoContent().body("")
        }
        Command::AddPlayer { name } => {
            if state_lock.scores.iter().all(|p| p.name != name) {
                state_lock.scores.push(Player { name, score: 0 });
            }
            HttpResponse::NoContent().body("")
        }
        Command::RemovePlayer { name } => {
            state_lock.scores.retain(|x| x.name != name);
            HttpResponse::NoContent().body("")
        }
        Command::ClearPlayers => {
            state_lock.scores.clear();
            HttpResponse::NoContent().body("")
        }
        Command::ClearBlocked => {
            state_lock.blocked.clear();
            HttpResponse::NoContent().body("")
        }
        Command::RemoveBlocked { name } => {
            state_lock.blocked.retain(|x| *x != name);
            HttpResponse::NoContent().body("")
        }
        Command::AddBlocked { name } => {
            state_lock.blocked.push(name);
            HttpResponse::NoContent().body("")
        }
        Command::CloseBuzzer => {
            state_lock.buzzer.close();
            HttpResponse::NoContent().body("")
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting JSON Commands
#[post("/command")]
async fn command(
    command: web::Json<Command>,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse
{
    let command_inner = command.into_inner();
    info!("executing command: {:?}", &command_inner);
    let mut state_lock = app_state.lock().unwrap();
    match_command(command_inner, &mut state_lock)
}

////////////////////////////////////////////////////////////////////////////////
// returns "truthy" nonempty string if {name} isn't in State.blocked
#[get("/blocked/{name}")]
async fn blocked(
    name: web::Path<String>,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse
{
    trace!("serving /blocked/{}", &name);
    let state_lock = app_state.lock().unwrap();
    if state_lock.blocked.contains(&name) { HttpResponse::Ok().body("!") }
    else                                  { HttpResponse::Ok().body("")  }
}

////////////////////////////////////////////////////////////////////////////////
// returns State.scores in JSON
#[get("/state/scores")]
async fn scores(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    trace!("serving /state/scores");
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.scores)
}

////////////////////////////////////////////////////////////////////////////////
// deserialize a Config from the conf.json file, or create one if it's missing
fn read_cfg() -> Result<Config, Box<dyn Error>> {
    let cfg_path = Path::new(DIR).join("conf.json");

    if cfg_path.is_file() {
        let cfg_str = fs::read_to_string(cfg_path)?;
        return Ok(serde_json::from_str(&cfg_str)?);
    } else {
        warn!("no conf.json found, writing default config to {:#?}", cfg_path);
        fs::write(
            cfg_path,
            r#"{"log_level":"Warn","address":"127.0.0.1:8080"}"#
        )?;
        Ok(Default::default())
    }
}

////////////////////////////////////////////////////////////////////////////////
// `main` runs `go` and pretty-prints any errors it returns
#[actix_web::main]
async fn main() {
    go().await.unwrap_or_else(|err| error!("{}", err));
}

async fn go() -> Result<(), Box<dyn Error>> {
    let env = Env::default()
        .default_filter_or("warn");
    env_logger::try_init_from_env(env)?;

    let cfg = read_cfg()?;
    set_max_level(cfg.log_level);

    let app_state = web::Data::new(Mutex::new(State::new()));

    return Ok(HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(actix_files::Files::new("/static", "./static"))
            .route("/", web::get().to(index))
            .service(buzz)
            .service(command)
            .service(state)
            .service(blocked)
            .service(scores)
    })
    .bind(&cfg.address)?
    .run()
    .await?);
}
