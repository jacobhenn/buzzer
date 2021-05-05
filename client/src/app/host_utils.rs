//! The collection of utilities which allows the host to perform their job,
//! and do things such as open the buzzer or mark the buzzed in player as
//! correct.

use crate::utils::send_command;
use mogwai::prelude::*;
use web_sys::{HtmlElement, WebSocket};

use crate::utils::{BottomType, ClientState};
use util::{command::Command, Buzzer};

/// The collection of utilities which allows the host to perform their job,
/// and do things such as open the buzzer or mark the buzzed in player as
/// correct.
pub struct HostUtils {
    /// A reciever for all changes to the client state. The other end of this
    /// reciever is handled by a Model wrapping the state itself. Whenever the
    /// state is mutated using the .visit_mut method, all recievers branched
    /// off of it get notified.
    pub state: Model<ClientState>,
    /// A clone of the main websocket. This removes the need for events to
    /// propagate upwards toward the state, since everything has clones of
    /// the same socket.
    pub ws: WebSocket,
}

/// A message from the DOM of the host utils to do something, such as send a
/// message along the websocket.
#[derive(Clone)]
pub enum HostUtilsModel {
    /// Send a certain command over the websocket. This is triggered by, for
    /// example, the host pressing the "open buzzer" or "end round" button.
    TransmitWsMsg(Command),
}

impl Component for HostUtils {
    type ModelMsg = HostUtilsModel;

    type ViewMsg = BottomType;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        HostUtilsModel::TransmitWsMsg(cmd): &Self::ModelMsg,
        _tx_view: &mogwai::prelude::Transmitter<Self::ViewMsg>,
        _sub: &mogwai::prelude::Subscriber<Self::ModelMsg>,
    ) {
        send_command(&self.ws, cmd);
    }

    fn view(
        &self,
        tx: &mogwai::prelude::Transmitter<Self::ModelMsg>,
        _rx: &mogwai::prelude::Receiver<Self::ViewMsg>,
    ) -> mogwai::prelude::ViewBuilder<Self::DomNode> {
        builder! {
            <div id="hostutils">
                "points worth: "
                {self.state.recv().branch_map(|state|
                    state
                        .game_state
                        .ptvalues
                        .get(state.game_state.ptsindex)
                        .map(|u| u.to_string())
                        .unwrap_or_default()
                )}" "
                <button style:padding="5px"
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                        Command::AddPtsIndex { delta: 1 }
                    ))
                >
                    "+"
                </button>
                <button style:padding="5px"
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                        Command::SubPtsIndex { delta: 1 }
                    ))
                >
                    "-"
                </button>
                <br/>

                <button class="bright"
                    boolean:hidden=self.state.recv().branch_map(|state| {
                        if let Buzzer::Closed = state.game_state.buzzer {
                            false
                        } else {
                            true
                        }
                    })
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                        Command::OpenBuzzer
                    ))
                >
                    "open buzzer"
                </button>

                <button class="bright"
                    boolean:hidden=self.state.recv().branch_map(|state| {
                        if let Buzzer::Open = state.game_state.buzzer {
                            false
                        } else {
                            true
                        }
                    })
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                        Command::EndRound
                    ))
                >
                    "end round"
                </button>

                <span
                    boolean:hidden=self.state.recv().branch_map(|state| {
                        if let Buzzer::TakenBy { .. } = state.game_state.buzzer {
                            false
                        } else {
                            true
                        }
                    })
                >
                    "is "
                    {self.state.recv().branch_map(|state| {
                        if let Buzzer::TakenBy { owner } = state.game_state.buzzer {
                            state
                                .game_state
                                .players
                                .get(owner)
                                .map(|p| p.name.clone())
                                .unwrap_or_default()
                        } else { String::new() }
                    })}
                    " "
                    <button class="bright" style:padding="0 8px"
                        on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                            Command::OwnerCorrect
                        ))
                    >
                        "correct"
                    </button>
                    " or "
                    <button class="bright" style:padding="0 8px"
                        on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                            Command::OpenBuzzer
                        ))
                    >
                        "incorrect"
                    </button>
                    "?"
                </span>
            </div>
        }
    }
}
