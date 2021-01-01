use actix_web::{post, web, App, HttpServer, HttpResponse};
use std::sync::Mutex;

struct AppState {
    live_player: Mutex<Option<String>>,
}

#[post("/buzz")]
async fn buzz(name: String, state: web::Data<AppState>) -> HttpResponse {
    let mut live_player = state.live_player.lock().unwrap();

    match &*live_player {
        None => {
            *live_player = Some(name);
            HttpResponse::Ok()
                .content_type("text/plain")
                .body("buzzed")
        },
        Some(player) => HttpResponse::Ok()
            .content_type("text/plain")
            .body(format!("beaten:{}", player)),
    }
}

#[post("/reset")]
async fn reset(state: web::Data<AppState>) -> HttpResponse {
    let mut live_player = state.live_player.lock().unwrap();
    *live_player = None;

    HttpResponse::Ok()
        .content_type("text/plain")
        .body("The buzzer is now open".to_string())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let state = web::Data::new(AppState {
        live_player: Mutex::new(None),
    });
    
    HttpServer::new(move || {
        App::new()
            .app_data(state.clone())
            .service(buzz)
            .service(reset)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
