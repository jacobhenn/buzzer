#![allow(unused_braces)]

mod utils;

use log::{Level, info, warn, error};
use mogwai::prelude::*;
use wasm_bindgen::prelude::*;
use web_sys::{MessageEvent, WebSocket};

struct App {
    ws: WebSocket,
}

#[derive(Clone)]
enum AppModel {
    ReceivedWsMsg(String),
    TransmitWsMsg(String),
}

#[derive(Clone)]
enum AppView {
    ReceivedWsMsg(String),
}

impl Component for App {
    type DomNode = HtmlElement;
    type ModelMsg = AppModel;
    type ViewMsg = AppView;

    fn update(&mut self, msg: &AppModel, tx: &Transmitter<AppView>, _sub: &Subscriber<AppModel>) {
        match msg {
            AppModel::ReceivedWsMsg(s) => {
                tx.send(&AppView::ReceivedWsMsg(s.to_string()));
            }
            AppModel::TransmitWsMsg(s) => {
                let res = self.ws.send_with_str(s);
                if let Err(e) = res {
                    error!("couldn't send websocket message: {:?}", e);
                }
            }
        }
    }

    fn view(&self, tx: &Transmitter<AppModel>, rx: &Receiver<AppView>) -> ViewBuilder<HtmlElement> {
        builder! {
            <div>
                <input
                    cast:type=web_sys::HtmlInputElement
                    on:change=tx.contra_map(|evt: &Event| {
                        AppModel::TransmitWsMsg(utils::event_input_value(evt).unwrap())
                    })
                />
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

    let gizmo = Gizmo::from(App { ws: ws.clone() });

    let tx = gizmo.trns.clone();
    let onmessage_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
        if let Ok(txt) = e.data().dyn_into::<js_sys::JsString>() {
            info!("recieved from server: {:?}", txt);
            tx.send(&AppModel::ReceivedWsMsg(format!("{:?}", txt)));
        } else {
            warn!("failed to understand unknown message from server: {:?}", e.data());
        }
    }) as Box<dyn FnMut(MessageEvent)>);
    ws.set_onmessage(Some(onmessage_callback.as_ref().unchecked_ref()));
    onmessage_callback.forget();

    let view = View::from(gizmo.view_builder());
    view.run()
}
