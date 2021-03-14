#![deny(clippy::all)]
#![deny(clippy::pedantic)]
#![deny(clippy::nursery)]
#![deny(clippy::cargo)]
#![allow(clippy::module_name_repetitions)]
#![allow(clippy::items_after_statements)]
#![allow(clippy::multiple_crate_versions)]
#![allow(clippy::cargo_common_metadata)]

mod command;
mod structs;

use crate::command::Command;
use crate::structs::{Buzzer, Config, History, Player, State};
use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use env_logger::Env;
use log::{debug, error, info, trace, warn};
use std::error::Error;
use std::fs;
use std::path::Path;
use std::sync::Mutex;

#[cfg(target_family = "unix")]
const DIR: &str = env!("PWD");

#[cfg(target_family = "windows")]
const DIR: &str = env!("CD");

////////////////////////////////////////////////////////////////////////////////
// Full Server URI List:
//     - "/": serves the svelte app
//     - "/state/buzzer": responds with Buzzer in JSON form to GET
//     - "/state/scores": provides JSON list of scores
//     - "/state/history": provides editable list of changes to scores
//     - "/buzz": contestants can POST their names to buzz in
//     - "/command": client can POST a JSON Command to execute it
//     - "/textcommand": client can POST a text Command to execute it
//     - "/marker": responds with the state marker (see structs::State)
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// home page - redirects you to ./client/public/index.html
async fn serve_index() -> HttpResponse {
    HttpResponse::Ok().content_type("text/html").body(
        "<!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv='refresh'
                          content='0; URL=/static/index.html'>
                </head>
            </html>",
    )
}

////////////////////////////////////////////////////////////////////////////////
// returns the `u8` marker
#[get("/marker")]
async fn serve_marker(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok()
        .content_type("application/octet-stream")
        .body(Vec::from([state_lock.marker]))
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

    match state_lock.scores.get(&name).map(|p| p.blocked) {
        Some(true) => debug!("{} tried to buzz in but was blocked", name),
        Some(false) => {
            if state_lock.buzzer == Buzzer::Open {
                info!("{} has buzzed in", name);
                state_lock.scores.get_mut(&name).map(|o| o.blocked = true);
                state_lock.buzzer.take(name);
                state_lock.update_marker();
            } else {
                debug!("{} tried to buzz in while it was closed", name);
            }
        }
        None => return HttpResponse::BadRequest().finish(),
    }
    HttpResponse::NoContent().finish()
}

////////////////////////////////////////////////////////////////////////////////
// takes a command and a lock on the server state and executes the command.
fn match_command(cmd: Command, state_lock: &mut State) -> HttpResponse {
    info!("{}", cmd);
    let unit_opt = || -> Option<()> {
        match cmd {
            Command::AddScore { name, score } => {
                let p = state_lock.scores.get_mut(&name)?;
                state_lock.history.log(name, p.score + score);
                p.score += score;
                Some(())
            }
            Command::SetScore { name, score } => {
                state_lock.history.log(name.clone(), score);
                state_lock.scores.get_mut(&name).map(|p| p.score = score)
            }
            Command::EndRound => {
                state_lock
                    .scores
                    .values_mut()
                    .for_each(|p| p.blocked = false);
                state_lock.buzzer.close();
                Some(())
            }
            Command::OpenBuzzer => {
                state_lock.buzzer.open();
                Some(())
            }
            Command::AddPlayer { name } => {
                let score = state_lock
                    .history
                    .iter()
                    .find(|e| e.name == name)
                    .map(|e| e.score)
                    .unwrap_or_default();
                state_lock.scores.insert(
                    name.clone(),
                    Player {
                        score,
                        blocked: false,
                    },
                );
                state_lock.history.log(name, score);
                Some(())
            }
            Command::RemovePlayer { name } => {
                state_lock.scores.remove(&name)?;
                Some(())
            }
            Command::ClearPlayers => {
                state_lock.scores.drain();
                Some(())
            }
            Command::ClearBlocked => {
                state_lock
                    .scores
                    .values_mut()
                    .for_each(|p| p.blocked = false);
                Some(())
            }
            Command::Block { name } => {
                state_lock.scores.get_mut(&name).map(|p| p.blocked = true)
            }
            Command::Unblock { name } => {
                state_lock.scores.get_mut(&name).map(|p| p.blocked = false)
            }
            Command::CloseBuzzer => Some(state_lock.buzzer.close()),
            Command::EditHistory { index: i, score } => {
                let e = state_lock.history.get(i)?;
                let diff: i32 = score - e.score;
                state_lock.scores.get_mut(&e.name).map(|p| p.score += diff);
                let name = e.name.clone();
                state_lock
                    .history
                    .iter_mut()
                    .take(i + 1)
                    .filter(|x| x.name == name)
                    .for_each(|x| x.score += diff);
                Some(())
            }
            Command::RemoveHistory { index: i } => {
                let e = state_lock.history.get(i)?;
                let name = e.name.clone();
                let score = e.score;
                let prev_score = state_lock
                    .history
                    .iter()
                    .skip(i + 1)
                    .find(|e| e.name == name)
                    .map(|e| e.score)?;
                let diff = score - prev_score;
                state_lock.scores.get_mut(&name).map(|p| p.score -= diff);
                state_lock.history.remove(i);
                state_lock
                    .history
                    .iter_mut()
                    .take(i)
                    .filter(|x| x.name == name)
                    .for_each(|x| x.score -= score);
                Some(())
            }
            Command::ClearHistory => Some(state_lock.history.clear()),
        }
    };
    match unit_opt() {
        Some(()) => {
            state_lock.history.print();
            state_lock.update_marker();
            HttpResponse::NoContent().finish()
        }
        None => {
            warn!(
                "couldn't execute command; \
                most likely a nonexistant player was named."
            );
            HttpResponse::BadRequest().finish()
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting JSON Commands
#[post("/command")]
async fn serve_command(
    command: web::Json<Command>,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse {
    let command_inner = command.into_inner();
    let mut state_lock = app_state.lock().unwrap();
    match_command(command_inner, &mut state_lock)
}

////////////////////////////////////////////////////////////////////////////////
// handles clients posting text Commands. See `command::Command`
#[post("/textcommand")]
async fn serve_text_command(
    cmd_str: String,
    app_state: web::Data<Mutex<State>>,
) -> HttpResponse {
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
// returns State.scores in JSON
#[get("/state/scores")]
async fn serve_scores(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    trace!("serving /state/scores");
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.scores)
}

////////////////////////////////////////////////////////////////////////////////
// returns State.history in JSON
#[get("/state/history")]
async fn serve_history(app_state: web::Data<Mutex<State>>) -> HttpResponse {
    trace!("serving /state/history");
    let state_lock = app_state.lock().unwrap();
    HttpResponse::Ok().json(&state_lock.history)
}

////////////////////////////////////////////////////////////////////////////////
// deserialize a Config from the conf.json file, or create one if it's missing
// read_cfg returns a `(Config, bool)` because I have an incessant need to log
// everything with the `log` crate. It returns `(_, true)` if it had to create
// a default config file so it can be logged with `warn!` in `go`, since
// this function *has* to be called before `env_logger` initiates.
fn read_cfg() -> Result<(Config, bool), Box<dyn Error>> {
    let cfg_path = Path::new(DIR).join("conf.json");

    if cfg_path.is_file() {
        let cfg_str = fs::read_to_string(cfg_path)?;
        Ok((serde_json::from_str(&cfg_str)?, false))
    } else {
        let def: Config = Config::default();
        fs::write(cfg_path, serde_json::to_string(&def)?)?;
        Ok((def, true))
    }
}

////////////////////////////////////////////////////////////////////////////////
// `main` runs `go` and pretty-prints any errors it returns
#[actix_web::main]
async fn main() {
    go().await.unwrap_or_else(|err| error!("{}", err));
}

////////////////////////////////////////////////////////////////////////////////
// `go` is the "real" main function. It reads the config, initiates the logger,
// and launches the server. But if this was the `main` function, errors would be
// printed through `Debug` instead of the more understandable `Display`.
async fn go() -> Result<(), Box<dyn Error>> {
    let cfg_res = read_cfg();

    let alt_filter = match cfg_res {
        Ok((ref cfg, _)) => cfg.log_level.as_str(),
        Err(_) => "warn",
    };

    let env = Env::default().default_filter_or(alt_filter);

    env_logger::try_init_from_env(env)?;

    match cfg_res {
        Ok((_, true)) => warn!(
            "no conf.json found, writing default config to {:#?}",
            Path::new(DIR).join("conf.json"),
        ),
        _ => (),
    }

    let app_state = web::Data::new(Mutex::new(State::new()));

    let address = cfg_res?.0.address;
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
            .service(serve_scores)
            .service(serve_history)
    })
    .bind(address)?
    .run()
    .await?);
}
