#![allow(unused_braces)]

mod utils;

use log::{error, info, warn, Level};
use mogwai::prelude::*;
use util::command::Command;
use wasm_bindgen::prelude::*;
use web_sys::{MessageEvent, WebSocket};

struct App {
    ws: WebSocket,
}

#[derive(Clone)]
enum AppModel {
    ReceivedWsMsg(Command),
    TransmitWsMsg(Command),
}

#[derive(Clone)]
enum AppView {
    ReceivedWsMsg(Command),
}

impl Component for App {
    type DomNode = HtmlElement;
    type ModelMsg = AppModel;
    type ViewMsg = AppView;

    fn update(&mut self, msg: &AppModel, tx: &Transmitter<AppView>, _sub: &Subscriber<AppModel>) {
        match msg {
            AppModel::ReceivedWsMsg(cmd) => {
                tx.send(&AppView::ReceivedWsMsg(cmd.clone()));
            }
            AppModel::TransmitWsMsg(cmd) => {
                let bin_res = rmp_serde::to_vec(cmd);
                if let Ok(bin) = bin_res {
                    let res = self.ws.send_with_u8_array(&bin);
                    if let Err(e) = res {
                        error!("couldn't send websocket message: {:?}", e);
                    }
                }
            }
        }
    }

    fn view(&self, tx: &Transmitter<AppModel>, rx: &Receiver<AppView>) -> ViewBuilder<HtmlElement> {
        builder! {
            <div>
                <button
                    on:click=tx.contra_map(|_| AppModel::TransmitWsMsg(Command::OpenBuzzer))
                >
                    "open buzzer"
                </button>
                <br/>

                <button
                    on:click=tx.contra_map(|_| AppModel::TransmitWsMsg(Command::EndRound))
                >
                    "end round"
                </button>
                <br/>

                {rx.branch_filter_map(|msg| match msg {
                    AppView::ReceivedWsMsg(s) => Some(format!("recieved: {}", s)),
                })}
            </div>
        }
    }
}

fn view_init_error(msg: &str) -> View<HtmlElement> {
    view! {
        <strong style:color="#bf616a">
            "an error occurred while initializing the page:"<br/>
            {msg}
        </strong>
    }
}

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    console_log::init_with_level(Level::Info).unwrap();

    let window = web_sys::window();
    if window.is_none() {
        error!("couldn't get Window object");
        let view = view_init_error("couldn't get Window object");
        return view.run();
    }

    let host = window.unwrap().location().host()?;
    let ws = WebSocket::new(&format!("ws://{}/ws", host))?;
    ws.set_binary_type(web_sys::BinaryType::Arraybuffer);

    let gizmo = Gizmo::from(App { ws: ws.clone() });

    let tx = gizmo.trns.clone();
    let onmessage_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
        if let Ok(abuf) = e.data().dyn_into::<js_sys::ArrayBuffer>() {
            info!("recieved from server: {:?}", abuf);
            let bin = js_sys::Uint8Array::new(&abuf).to_vec();
            let cmd = rmp_serde::from_read_ref(&bin).unwrap();
            tx.send(&AppModel::ReceivedWsMsg(cmd));
        } else {
            warn!(
                "failed to understand unknown message from server: {:?}",
                e.data()
            );
        }
    }) as Box<dyn FnMut(MessageEvent)>);
    ws.set_onmessage(Some(onmessage_callback.as_ref().unchecked_ref()));
    onmessage_callback.forget();

    let view = View::from(gizmo.view_builder());
    view.run()
}
