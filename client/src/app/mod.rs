pub mod display_buzzer;
pub mod display_scores;
pub mod host_utils;
pub mod setup;
// pub mod buzz_keys;
use crate::{
    app::display_buzzer::DisplayBuzzer,
    utils::{send_command, ClientState, PageState},
};
use display_scores::DisplayScores;
use host_utils::HostUtils;
use mogwai::prelude::*;
use util::command::Command;
use web_sys::WebSocket;

use self::setup::{Setup, SetupViewMsg};

/// The root component of the client
pub struct App {
    /// The websocket which has been connected to during startup
    /// (see [`App::new()`]) and is being used to pass messages
    /// between the client and server.
    pub ws: WebSocket,
    /// The current ClientState
    pub state: Model<ClientState>,
}

impl App {
    /// Initializes the websocket and all of the subcomponents
    pub fn new() -> Result<Self, JsValue> {
        let window = web_sys::window().ok_or(JsValue::from_str("couldn't get window object"))?;
        let host = window.location().host()?;
        let ws = WebSocket::new(&format!("ws://{}/ws", host))?;
        ws.set_binary_type(web_sys::BinaryType::Arraybuffer);

        let state = Model::new(ClientState::new());

        Ok(Self { ws, state })
    }
}

#[derive(Clone)]
/// A message that is transmitted to an App from anywhere else with a
/// reference to an App.
/// (most of the time these come from the DOM)
pub enum AppModel {
    /// Sent to the App whenever a message is recieved and parsed from inside
    /// the websocket's onMessage handler
    ReceivedWsMsg(Command),
    /// Sent from the DOM to the App when the user has requested the
    /// transmission of a message over the websocket.
    TransmitWsMsg(Command),
    /// Sent to the App to instruct it to rearrange its children to display the
    /// given page state
    Transition(PageState),
}

impl Component for App {
    type DomNode = HtmlElement;
    type ModelMsg = AppModel;
    type ViewMsg = Patch<View<HtmlElement>>;

    fn update(
        &mut self,
        msg: &AppModel,
        tx: &Transmitter<Self::ViewMsg>,
        sub: &Subscriber<AppModel>,
    ) {
        match msg {
            AppModel::ReceivedWsMsg(cmd) => {
                self.state
                    .visit_mut(|state| state.game_state.apply_command(cmd.clone()));
            }
            AppModel::TransmitWsMsg(cmd) => {
                send_command(&self.ws, cmd);
            }
            AppModel::Transition(page_state) => match page_state {
                PageState::Setup => {
                    let setup = Gizmo::from(Setup {
                        ws: self.ws.clone(),
                        state: self.state.clone(),
                        input_children: Vec::new(),
                    });
                    sub.subscribe_filter_map(&setup.recv, |msg| match msg {
                        SetupViewMsg::Play(am_host) => {
                            Some(AppModel::Transition(PageState::Play { am_host: *am_host }))
                        }
                        _ => None,
                    });
                    tx.send(&Patch::PushBack { value: View::from(setup.view_builder()) });
                }
                PageState::Play { am_host } => {
                    let display_buzzer = Gizmo::from(DisplayBuzzer {
                        rx: self.state.recv().branch(),
                    });
                    tx.send(&Patch::Replace {
                        index: 0,
                        value: View::from(display_buzzer.view_builder()),
                    });

                    if *am_host {
                        let host_utils = Gizmo::from(HostUtils {
                            state: self.state.clone(),
                            ws: self.ws.clone(),
                        });
                        tx.send(&Patch::PushBack {
                            value: View::from(host_utils.view_builder()),
                        });
                    }

                    let display_scores = Gizmo::from(DisplayScores { num_children: 0 });

                    self.state
                        .recv()
                        .branch()
                        .forward_map(&display_scores.trns, |m| m.clone());
                }
                PageState::Over { .. } => todo!(),
            },
        }
    }

    fn view(
        &self,
        _tx: &Transmitter<AppModel>,
        rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<HtmlElement> {
        builder! {
            <div patch:children=rx.branch()>
            </div>
        }
    }
}
