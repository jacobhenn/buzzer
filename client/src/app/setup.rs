//! The component which allows all players to enter their names if they are
//! contestants, as well as indicate if they are the host.

use crate::utils::{BK_SPACE, BuzzMethod, event_input_value, send_command};
use mogwai::prelude::*;
use util::command::Command;
use web_sys::WebSocket;

use crate::utils::{ClientState, Contestant};

/// The component which allows a single contestant to enter their name during setup.
pub struct InputName {
    /// The current name in this input
    pub name: String,
    /// The index of this input in the list of inputs
    pub index: usize,
}

#[derive(Clone)]
/// A message from the DOM of Input to the gizmo logic
pub enum InputModelMsg {
    /// Remove this contestant input
    /// (mapped into an [`InputViewMsg::RemoveContestant`])
    RemoveContestant,
    /// Change the name of this contestant.
    ChangeName(String),
    /// A prior input has been removed; decrement our index to keep up-to-date.
    DecrementIndex,
}

#[derive(Clone)]
/// A message from Input through the subscription of Setup
pub enum InputViewMsg {
    /// Remove the contestant input at that index.
    RemoveContestant(usize),
}

impl Component for InputName {
    type ModelMsg = InputModelMsg;

    type ViewMsg = InputViewMsg;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        match msg {
            InputModelMsg::RemoveContestant => {
                tx_view.send(&InputViewMsg::RemoveContestant(self.index))
            }
            InputModelMsg::ChangeName(name) => self.name = name.clone(),
            InputModelMsg::DecrementIndex => self.index -= 1,
        }
    }

    fn view(
        &self,
        tx: &Transmitter<Self::ModelMsg>,
        _rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        builder! {
            <div>
                <input placeholder="enter your name"
                    on:input=tx.contra_map(|evt| InputModelMsg::ChangeName(
                        event_input_value(evt).unwrap()
                    ))
                />

                <button class="remove"
                    on:click=tx.contra_map(|_| InputModelMsg::RemoveContestant)
                >
                    "🛇"
                </button>
            </div>
        }
    }
}

/// The component which allows all players to enter their names if they are
/// contestants, as well as indicate if they are the host.
pub struct Setup {
    /// The websocket connection to the server shared between almost all
    /// components.
    pub ws: WebSocket,
    /// A wrapper around the global state distributed by the App to many of
    /// its child components.
    pub state: Model<ClientState>,
    /// A list of all the child [`InputName`] components of Setup
    pub input_children: Vec<Gizmo<InputName>>,
}

#[derive(Clone)]
/// A message from somewhere else to the gizmo logic of Setup.
pub enum SetupModelMsg {
    /// Sent when the "add contestant" button is clicked
    AddContestant,
    /// Sent when the "🛇" button next to the input child at the given index
    /// is clicked
    RemoveContestant(usize),
    /// Sent when the "play" button is clicked. The `bool` field represents
    Play(bool),
}

#[derive(Clone)]
/// A message from the gizmo logic of Setup to the DOM or the outside world.
pub enum SetupViewMsg {
    /// Sent to the DOM to instruct it to apply the given patch to the `<div>`
    /// containing all [`InputName`] children
    Patch(Patch<View<HtmlElement>>),
    /// Sent through the subscription of App to indicate that the user has
    /// pressed the "play" button.
    Play(bool),
}

impl Component for Setup {
    type ModelMsg = SetupModelMsg;

    type ViewMsg = SetupViewMsg;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        tx_view: &Transmitter<Self::ViewMsg>,
        sub: &Subscriber<Self::ModelMsg>,
    ) {
        match msg {
            SetupModelMsg::AddContestant => {
                let index = self.input_children.len();
                let input_name = Gizmo::from(InputName {
                    name: String::new(),
                    index,
                });

                sub.subscribe_map(&input_name.recv, |InputViewMsg::RemoveContestant(index)| {
                    SetupModelMsg::RemoveContestant(*index)
                });

                tx_view.send(&SetupViewMsg::Patch(Patch::PushBack {
                    value: View::from(input_name.view_builder()),
                }));
                self.input_children.push(input_name);
            }
            SetupModelMsg::RemoveContestant(index) => {
                tx_view.send(&SetupViewMsg::Patch(Patch::Remove { index: *index }));
                for index in *index..self.input_children.len() {
                    self.input_children[index].send(&InputModelMsg::DecrementIndex);
                }
                self.input_children.remove(*index);
            }
            SetupModelMsg::Play(am_host) => {
                let mut index = self.state.visit(|state| state.game_state.players.len());
                for input in &self.input_children {
                    let state = input.state_ref();
                    if !state.name.trim().is_empty() {
                        self.state.visit_mut(|state| {
                            state.contestants.push(Contestant {
                                buzz_method: BuzzMethod::Key(BK_SPACE),
                                index,
                            });
                        });
                        send_command(
                            &self.ws,
                            &Command::AddPlayer {
                                name: state.name.clone(),
                            },
                        );
                        index += 1;
                    }
                }

                tx_view.send(&SetupViewMsg::Play(*am_host));
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
                "contestants, enter your names"<br/>
                <strong style:color="#88c0d0">"host, do not enter your name"</strong><br/>

                <div patch:children=rx.branch_filter_map(|msg| match msg {
                    SetupViewMsg::Patch(patch) => Some(patch.clone()),
                    _ => None,
                })>
                </div>

                <button on:click=tx.contra_map(|_| SetupModelMsg::AddContestant)>
                    "add contestant"
                </button><br/><br/>

                <button class="bright"
                    on:click=tx.contra_map(|_| SetupModelMsg::Play(true))
                >
                    "play"
                </button>
            </div>
        }
    }
}
