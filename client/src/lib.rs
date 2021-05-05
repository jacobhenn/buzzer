#![allow(unused_braces)]
#![warn(missing_docs)]
//! A mogwai client for Buzzer.
//!
//! This client is currently in pre-alpha and a fully-featured version will not be available for
//! several weeks.

/// App contains all of the components which make up the client.
pub mod app;
pub mod utils;
use crate::app::AppModel;
use app::App;
use log::{info, warn, error, Level};
use mogwai::prelude::*;
use utils::PageState;
use wasm_bindgen::prelude::*;
use web_sys::MessageEvent;
use std::panic;

/// WASM entry point.
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    console_log::init_with_level(Level::Trace).unwrap();

    panic::set_hook(Box::new(|panic_info| {
        error!("{}", panic_info);
    }));

    info!("--- {} v{} ---", env!("CARGO_PKG_NAME"), env!("CARGO_PKG_VERSION"));

    let gizmo = Gizmo::from(App::new()?);

    let tx = gizmo.trns.clone();
    let onmessage_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
        if let Ok(abuf) = e.data().dyn_into::<js_sys::ArrayBuffer>() {
            let bin = js_sys::Uint8Array::new(&abuf).to_vec();
            let cmd_res = rmp_serde::from_read_ref(&bin);
            if let Ok(cmd) = cmd_res {
                tx.send(&AppModel::ReceivedWsMsg(cmd));
            } else if let Err(e) = cmd_res {
                error!("failed to deserialize command from server: {}", e);
            }
        } else {
            warn!(
                "failed to understand unknown message from server: {:?}",
                e.data()
            );
        }
    }) as Box<dyn FnMut(MessageEvent)>);
    gizmo
        .state
        .borrow()
        .ws
        .set_onmessage(Some(onmessage_callback.as_ref().unchecked_ref()));
    onmessage_callback.forget();

    gizmo.trns.send({
        // debug!("inside tx.send");
        &AppModel::Transition(PageState::Setup)
    });

    let view = View::from(gizmo.view_builder());
    view.run()
}
