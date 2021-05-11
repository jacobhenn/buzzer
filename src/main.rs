// ### Master todo list
//
// * Latency tracking/logging
// * Log duration between buzzer open and buzz in in ms
#![deny(clippy::all)]
#![deny(clippy::pedantic)]
#![deny(clippy::nursery)]
#![deny(clippy::cargo)]
#![allow(clippy::future_not_send)]
#![allow(clippy::cast_possible_truncation)]
#![allow(clippy::module_name_repetitions)]
#![allow(clippy::multiple_crate_versions)]
#![allow(clippy::cargo_common_metadata)]

mod registry;
mod structs;
mod websockets;
mod state;

use crate::state::ServerState;
use crate::websockets::Connection;
use actix::{Actor, Addr};
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use env_logger::Env;
use log::{debug, error, warn, LevelFilter};
use std::error::Error;
use std::fs;
use std::path::Path;
use serde::{Serialize, Deserialize};

#[cfg(target_family = "unix")]
const DIR: &str = env!("PWD");

#[cfg(target_family = "windows")]
const DIR: &str = env!("CD");

////////////////////////////////////////////////////////////////////////////////
// Full Server URI List:
//     - "/": serves the client app
//     - "/ws": websocket connection endpoint
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Provide the main connection endpoint where clients handshake and connect to
// the server.
#[get("/ws")]
async fn socket(
    req: HttpRequest,
    stream: web::Payload,
    data: web::Data<Addr<ServerState>>,
) -> Result<HttpResponse, actix_web::Error> {
    let data_ref = data.get_ref();

    let conn = Connection::new(data_ref.clone());

    debug!("connecting to new client at {}...", conn.id);
    ws::start(conn, &req, stream)
}

////////////////////////////////////////////////////////////////////////////////
// Config represents the values expected to be present in conf.json
#[derive(Serialize, Deserialize)]
pub struct Config {
    pub log_level: LevelFilter,
    pub address: String,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            log_level: LevelFilter::Warn,
            address: "127.0.0.1:8080".to_string(),
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
// Deserialize a Config from the conf.json file, or create one if it's missing
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
        let def = Config::default();
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

    if let Ok((_, true)) = cfg_res {
        warn!(
            "no conf.json found, writing default config to {:#?}",
            Path::new(DIR).join("conf.json"),
        );
    }

    let data = web::Data::new(ServerState::new().start());

    let (Config { address, .. }, _) = cfg_res?;
    HttpServer::new(move || {
        App::new()
            .service(socket)
            .service(actix_files::Files::new("/", "./client/").index_file("index.html"))
            .app_data(data.clone())
    })
    .bind(address)?
    .run()
    .await?;

    Ok(())
}
