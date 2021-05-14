//! The collection of utilities which allows the host to perform their job,
//! and do things such as open the buzzer or mark the buzzed in player as
//! correct.

use crate::utils::{display_commas, send_command};
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
                <u>"host utils"</u><br/>
                "points worth: "
                {self.state.recv().branch_map(|state|
                    state
                        .game_state
                        .ptvalues
                        .get(state.game_state.ptsindex)
                        .map(|u| display_commas(u))
                        .unwrap_or_default()
                )}" "
                <button style:padding="5px"
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(Command::AddPtsIndex))
                >
                    <u>"+"</u>
                </button>
                <button style:padding="5px"
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(Command::SubPtsIndex))
                >
                    <u>"-"</u>
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
                    <u>"o"</u>"pen buzzer"
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
                    <u>"e"</u>"nd round"
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
                        <u>"c"</u>"orrect"
                    </button>
                    " or "
                    <button class="bright" style:padding="0 8px"
                        on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(
                            Command::OwnerIncorrect
                        ))
                    >
                        <u>"i"</u>"ncorrect"
                    </button>
                    "?"
                </span>
                <br/>
                <button id="undo"
                    on:click=tx.contra_map(|_| HostUtilsModel::TransmitWsMsg(Command::Undo))
                    boolean:disabled=self.state.recv().branch_map(|state| {
                        !state.game_state.history.iter().any(|cmd| cmd.from_host())
                    })
                >
                    "⎌ "<u>"u"</u>"ndo "
                    {self.state.recv().branch_map(|state| {
                        state.game_state.format_nth_command(0).unwrap_or_default()
                    })}
                </button>
                <br/>
                <br/>
            </div>
        }
    }
}
