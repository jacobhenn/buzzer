//! The component containing the bar and text at the top of the play screen
//! showing the state of the buzzer.

use mogwai::prelude::*;
use util::Buzzer;

use super::ClientState;
use crate::utils::{BottomType, PageState};

/// The bar and text at the top of the play screen showing the state of the buzzer.
pub struct DisplayBuzzer {
    /// A reciever for all changes to the client state. The other end of this
    /// reciever is handled by a Model wrapping the state itself. Whenever the
    /// state is mutated using the .visit_mut method, all recievers branched
    /// off of it get notified.
    pub rx: Receiver<ClientState>,
}

impl DisplayBuzzer {
    fn match_class(state: &ClientState) -> String {
        if let PageState::Over { .. } = state.page_state {
            "over".to_string()
        } else {
            match state.game_state.buzzer {
                Buzzer::Open => {
                    if state.contestants.iter().all(|c| {
                        c.get_player(&state.game_state)
                            .map(|p| p.blocked)
                            .unwrap_or(false)
                    }) && !state.contestants.is_empty()
                    {
                        "blocked".to_string()
                    } else {
                        "open".to_string()
                    }
                }
                Buzzer::Closed => "closed".to_string(),
                Buzzer::TakenBy { owner } => {
                    if state.contestants.iter().any(|c| c.index == owner) {
                        "takenbyme".to_string()
                    } else {
                        "takenbyother".to_string()
                    }
                }
            }
        }
    }
}

impl Component for DisplayBuzzer {
    type ModelMsg = BottomType;

    type ViewMsg = BottomType;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        _msg: &Self::ModelMsg,
        _tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) { }

    fn view(
        &self,
        _tx: &Transmitter<Self::ModelMsg>,
        _rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        builder! {
            <div
                id="displaybuzzer"
                class=self.rx.branch_map(|state| DisplayBuzzer::match_class(state))
            >
                <div
                    id="topbar"
                    class=self.rx.branch_map(|state| DisplayBuzzer::match_class(state))
                ></div>
                {self.rx.branch_map(|state| match &state.page_state {
                    PageState::Over { .. } => "the server has closed the connection".to_string(),
                    _ => match state.game_state.buzzer {
                        Buzzer::Open => "the buzzer is open".to_string(),
                        Buzzer::Closed => "the buzzer is closed".to_string(),
                        Buzzer::TakenBy { owner } => {
                            let name =  state
                                .game_state
                                .players
                                .get(owner)
                                .map(|p| p.name.clone());
                            format!("{} has buzzed in", name.unwrap_or_default())
                        }
                    }
                })}
                <br/>

                <div boolean:hidden=self.rx.branch_map(|state| {
                    if let PageState::Over { .. } = state.page_state {
                        true
                    } else {
                        false
                    }
                })>
                    {self.rx.branch_filter_map(|state| {
                        if let PageState::Over { reason, .. } = &state.page_state {
                            Some(reason.into())
                        } else {
                            None
                        }
                    })}
                </div>

                <div id="displayblocked" boolean:hidden=self.rx.branch_map(|state| {
                    if let Buzzer::Open = state.game_state.buzzer {
                        false
                    } else {
                        true
                    }
                })>
                    {self.rx.branch_map(|state|
                        if state.contestants.is_empty() {
                            String::new()
                        } else if state.contestants.len() == 1  {
                            if state
                                .contestants
                                .first()
                                .and_then(|c| c.get_player(&state.game_state))
                                .map(|p| p.blocked)
                                .unwrap_or(false) {
                                "you have already buzzed in".to_string()
                            } else {
                                String::new()
                            }
                        } else {
                            let blocked_names = state
                                .contestants
                                .iter()
                                .filter_map(|c| c.get_player(&state.game_state))
                                .filter(|p| p.blocked)
                                .map(|p| p.name.as_str())
                                .collect::<Vec<_>>();
                            if blocked_names.is_empty() {
                                String::new()
                            } else if blocked_names.len() == 1 {
                                format!("{} has already buzzed in", blocked_names.first().unwrap())
                            } else {
                                format!("{} have already buzzed in", blocked_names.join(" & "))
                            }
                        }
                    )}
                </div>

                <div id="ptsworth"
                    boolean:hidden=self.rx.branch_map(|state| {
                        if let PageState::Over { .. } = state.page_state {
                            true
                        } else {
                            false
                        }
                    })
                >
                    "for "
                    <strong>
                    {self.rx.branch_map(|state| {
                        state
                            .game_state
                            .ptvalues
                            .get(state.game_state.ptsindex)
                            .map(|n| n.to_string())
                            .unwrap_or("-".into())
                    })}
                    </strong>
                    " points"
                </div>
                <br/>
            </div>
        }
    }
}
