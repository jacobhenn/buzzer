#![deny(clippy::all)]
#![deny(clippy::pedantic)]
#![deny(clippy::nursery)]
#![deny(clippy::cargo)]
#![allow(clippy::module_name_repetitions)]
#![allow(clippy::items_after_statements)]
#![allow(clippy::multiple_crate_versions)]
#![allow(clippy::cargo_common_metadata)]

mod scorekeeper;
mod command;
mod structs;

use crate::scorekeeper::{Player, PlayerList};
use crate::command::Command;
use crate::structs::{Config, State};
use actix_files;
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use serde_json;
use std::sync::Mutex;
use log::{trace, debug, warn, info};
use env_logger::Env;
use std::error::Error;
use std::fs;
use std::path::Path;

#[cfg(target_family = "unix")]
const DIR: &str = env!("PWD");

#[cfg(target_family = "windows")]
const DIR: &str = env!("CD");

////////////////////////////////////////////////////////////////////////////////
// Full Server URI List:
//     - "/": serves the svelte app
//     - "/state/buzzer": responds with Buzzer in JSON form to GET
//     - "/blocked/{name}": nonempty GET response if {name} is blocked
//     - "/state/scores": provides JSON list of scores
//     - "/buzz": contestants can POST their names to buzz in
//     - "/command": client can POST a JSON Command to execute it
//     - "/textcommand": client can POST a text Command to execute it
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// home page - redirects you to ./client/public/index.html
async fn serve_index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(
            "<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv='refresh'
                          content='0; URL=/static/index.html'>
                </head>
            </html>"
        )
}

#[get("/marker")]
async fn serve_marker(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().body((state_lock.marker as char).to_string())
}

////////////////////////////////////////////////////////////////////////////////
// returns the current state of the buzzer in JSON form
#[get("/state/buzzer")]
async fn serve_state(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    trace!("serving /state/buzzer");
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.buzzer)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting their names to "/buzz" to buzz in
#[post("/buzz")]
async fn serve_buzz(
    name: String,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse {
    let mut state_lock = app_state.lock().unwrap();

    if state_lock.scores.is_blocked(&name) {
        debug!("{} tried to buzz in but was blocked", name);
    } else {
        info!("{} has buzzed in", name);
        state_lock.scores.block(&name);
        state_lock.buzzer.take(name);
        state_lock.update_marker();
    }
    HttpResponse::NoContent().finish()
}

fn match_command(cmd: Command, state_lock: &mut State) -> HttpResponse {
    info!("{}", cmd);
    match cmd {
        Command::AddScore { name, score } => {
            state_lock.scores.add_score(&name, score);
            info!(
                "    ({}'s score is now {})",
                name,
                state_lock.scores.get_score(&name).unwrap_or_default(),
            );
        },
        Command::SetScore { name, score } =>
            state_lock.scores.set_score(&name, score),
        Command::EndRound => {
            state_lock.scores.unblock_all();
            state_lock.buzzer.close();
        },
        Command::OpenBuzzer => state_lock.buzzer.open(),
        Command::AddPlayer { name } =>
            if !state_lock.scores.iter().any(|p| p.name == name) {
                state_lock.scores.push(
                    Player { name, score: 0, blocked: false }
                );
            },
        Command::RemovePlayer { name } =>
            state_lock.scores.retain(|x| x.name != name),
        Command::ClearPlayers => state_lock.scores.clear(),
        Command::ClearBlocked => state_lock.scores.unblock_all(),
        Command::RemoveBlocked { name } =>
            state_lock.scores.unblock(&name),
        Command::AddBlocked { name } => state_lock.scores.block(&name),
        Command::CloseBuzzer => state_lock.buzzer.close(),
    };
    state_lock.update_marker();
    HttpResponse::NoContent().finish()
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting JSON Commands
#[post("/command")]
async fn serve_command(
    command: web::Json<Command>,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse
{
    let command_inner = command.into_inner();
    let mut state_lock = app_state.lock().unwrap();
    match_command(command_inner, &mut state_lock)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting text Commands
#[post("/textcommand")]
async fn serve_text_command(
    cmd_str: String,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse
{
    let mut state_lock = app_state.lock().unwrap();
    match cmd_str.parse::<Command>() {
        Ok(cmd) => match_command(cmd, &mut state_lock),
        Err(err) => {
            warn!(r#"couldn't parse text command "{}": {}"#, cmd_str, err);
            HttpResponse::BadRequest().finish()
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// returns "truthy" nonempty string if {name} isn't in State.blocked
#[get("/blocked/{name}")]
async fn serve_blocked(
    name: web::Path<String>,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse
{
    trace!("serving /blocked/{}", &name);
    let state_lock = app_state.lock().unwrap();
    let res = if state_lock.scores.is_blocked(&name) { "!" } else { "" };
    HttpResponse::Ok().body(res)
}

////////////////////////////////////////////////////////////////////////////////
// returns State.scores in JSON
#[get("/state/scores")]
async fn serve_scores(app_state: web::Data<Mutex<State>>) -> HttpResponse {
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
        println!("no conf.json found, writing default config to {:#?}", cfg_path);
        let def: Config = Default::default();
        fs::write(cfg_path, serde_json::to_string(&def)?)?;
        Ok(def)
    }
}

////////////////////////////////////////////////////////////////////////////////
// `main` runs `go` and pretty-prints any errors it returns
#[actix_web::main]
async fn main() {
    go().await.unwrap_or_else(|err| println!("error: {}", err));
}

async fn go() -> Result<(), Box<dyn Error>> {
    let cfg = read_cfg()?;

    let env = Env::default()
        .default_filter_or(cfg.log_level.as_str());
    env_logger::try_init_from_env(env)?;

    let app_state = web::Data::new(Mutex::new(State::new()));

    return Ok(HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(actix_files::Files::new("/static", "./client/public/"))
            .route("/", web::get().to(serve_index))
            .service(serve_marker)
            .service(serve_buzz)
            .service(serve_command)
            .service(serve_text_command)
            .service(serve_state)
            .service(serve_blocked)
            .service(serve_scores)
    })
    .bind(cfg.address)?
    .run()
    .await?);
}
