//! The component which allows contestants to select their buzz keys, and which
//! detects when contestants have pressed their buzz key.

use log::debug;
use mogwai::prelude::*;
use util::command::Command;
use utils::send_command;
use web_sys::WebSocket;

use crate::utils::{self, BuzzMethod, ClientState, BUZZ_KEYS};

/// The component which is replicated for every contestant by BuzzKeys.
pub struct SelectBuzzKey {
    /// A container of ClientState which may be mutated through or listened to
    /// for mutations.
    pub state: Model<ClientState>,
    /// This contestant's index in the state's contestant list.
    pub index: usize,
    /// A clone of the websocket connection to the buzzer server
    pub ws: WebSocket,
}

/// A message to the gizmo logic of a SelectBuzzKey component to tell it to do
/// something.
#[derive(Clone)]
pub enum SelectBuzzKeyModelMsg {
    /// The contestant has selected a different buzz key.
    Select(i32),
    /// This select is empty and needs to be populated with options.
    Init,
}

impl Component for SelectBuzzKey {
    type ModelMsg = SelectBuzzKeyModelMsg;

    type ViewMsg = Patch<View<HtmlElement>>;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        match msg {
            SelectBuzzKeyModelMsg::Select(index) => {
                self.state.visit_mut(|state| {
                    debug!("buzz key changed");
                    let player = &mut state.contestants[self.index];
                    player.buzz_method = BUZZ_KEYS
                        .get(*index as usize)
                        .map(|k| BuzzMethod::Key(*k))
                        .unwrap_or(BuzzMethod::Mouse);
                });
            }
            SelectBuzzKeyModelMsg::Init => {
                let current_buzz_method = self
                    .state
                    .visit(|state| state.contestants[self.index].buzz_method);
                for buzz_key in BUZZ_KEYS {
                    let value = if BuzzMethod::Key(*buzz_key) == current_buzz_method {
                        view! {
                            <option selected>{format!("{:?}", buzz_key)}</option>
                        }
                    } else {
                        view! {
                            <option>{format!("{:?}", buzz_key)}</option>
                        }
                    };
                    tx_view.send(&Patch::PushBack { value });
                }
            }
        }
    }

    fn view(
        &self,
        tx: &Transmitter<Self::ModelMsg>,
        rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        let name = self.state.visit(|state| {
            let contestant = &state.contestants[self.index];
            state
                .game_state
                .players
                .get(contestant.index)
                .map(|c| c.name.clone())
                .unwrap_or_default()
        });

        builder! {
            <div>
                {name}": "
                <select
                    cast:type=web_sys::HtmlSelectElement
                    patch:children=rx.branch()
                    on:change=tx.contra_map(|evt| SelectBuzzKeyModelMsg::Select(
                        utils::event_select_index(evt).unwrap()
                    ))
                >
                </select>
            </div>
        }
    }
}

/// The component which allows contestants to select their buzz keys, and which
/// detects when contestants have pressed their buzz key.
pub struct BuzzKeys {
    /// A container of ClientState which may be mutated through or listened to
    /// for mutations.
    pub state: Model<ClientState>,
    /// A clone of the websocket connection to the buzzer server
    pub ws: WebSocket,
}

#[derive(Clone)]
/// A message to the gizmo logic of BuzzKeys
pub enum BuzzKeysModelMsg {
    /// The state has changed. Perhaps SetState has been sent, or perhaps a
    /// contestant has been removed. This is very rare, and most of the
    /// time will only happen once.
    StateChanged(ClientState),
    /// Someone has pressed a key. Perhaps they are attempting to buzz in?
    KeyPressed(String),
}

impl Component for BuzzKeys {
    type ModelMsg = BuzzKeysModelMsg;

    type ViewMsg = Patch<View<HtmlElement>>;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        match msg {
            BuzzKeysModelMsg::StateChanged(state) => {
                tx_view.send(&Patch::RemoveAll);
                for index in 0..state.contestants.len() {
                    let select_buzz_key = Gizmo::from(SelectBuzzKey {
                        state: self.state.clone(),
                        index,
                        ws: self.ws.clone(),
                    });
                    select_buzz_key.trns.send(&SelectBuzzKeyModelMsg::Init);
                    tx_view.send(&Patch::PushBack {
                        value: View::from(select_buzz_key.view_builder()),
                    });
                }
            }
            BuzzKeysModelMsg::KeyPressed(code) => {
                self.state.visit(|state| {
                    for contestant in &state.contestants {
                        if let BuzzMethod::Key(buzz_key) = contestant.buzz_method {
                            if format!("{:?}", buzz_key) == *code {
                                send_command(
                                    &self.ws,
                                    &Command::Buzz {
                                        index: contestant.index,
                                    },
                                )
                            }
                        }
                    }
                });
            }
        }
    }

    fn view(
        &self,
        tx: &Transmitter<Self::ModelMsg>,
        rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        builder! {
            <div>
                <u>"buzz keys (click to change)"</u><br/>
                <div patch:children=rx.branch()>
                </div>
                <i
                    window:keydown=tx.contra_map(|evt| BuzzKeysModelMsg::KeyPressed(
                        utils::event_keyboard_code(evt)
                    ))
                >
                </i>
                <br/>
            </div>
        }
    }
}
