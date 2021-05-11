//! The component which lists all of the players in play by name along with
//! their scores.

use log::info;
use mogwai::prelude::*;
use util::{command::Command, Player};
use web_sys::WebSocket;

use crate::utils::{
    display_commas, event_input_value, send_command, BottomType, ClientState, PageState,
};

/// The component which displays a single player and their score.
pub struct DisplayScore {
    /// The index of the player which this is displaying.
    pub index: usize,
    /// The data of the player which this is displaying.
    pub player: Player,
    /// The main websocket connection.
    pub ws: WebSocket,
    /// Should this score be editable?
    pub can_edit: bool,
}

impl Component for DisplayScore {
    type ModelMsg = i32;

    type ViewMsg = BottomType;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        _tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        send_command(
            &self.ws,
            &Command::SetScore {
                index: self.index,
                score: *msg,
            },
        );
    }

    fn view(
        &self,
        tx: &Transmitter<Self::ModelMsg>,
        _rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        builder! {
            <div>
                {self.player.name.clone()}": "

                <span
                    boolean:hidden=self.can_edit
                    class=if self.player.blocked { "displayscore blocked" } else { "displayscore" }
                >
                    {display_commas(&self.player.score)}
                </span>

                <input
                    on:change=tx.contra_filter_map(|evt| {
                        let score_str = event_input_value(evt)?;
                        let score = score_str.parse().ok()?;
                        Some(score)
                    })
                    boolean:hidden=!self.can_edit
                    class=if self.player.blocked { "displayscore blocked" } else { "displayscore" }
                    placeholder={display_commas(&self.player.score)}
                />
            </div>
        }
    }
}

/// The component which renders a DisplayScore for every player in the game.
pub struct DisplayScores {
    /// A reciever for all changes to the client state. The other end of this
    /// reciever is handled by a Model wrapping the state itself. Whenever the
    /// state is mutated using the .visit_mut method, all recievers branched
    /// off of it get notified.
    pub num_children: usize,
    /// The main websocket connection
    pub ws: WebSocket,
}

impl Component for DisplayScores {
    type ModelMsg = ClientState;

    type ViewMsg = Patch<View<HtmlElement>>;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &ClientState,
        tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        info!("DisplayScores updated at {:?}", msg.page_state);

        let mut players = msg.game_state.players.clone();
        players.sort_unstable_by_key(|p| p.score);
        players.reverse();

        let can_edit = match msg.page_state {
            PageState::Play { am_host: true } => true,
            _ => false,
        };

        for index in 0..self.num_children {
            if let Some(player) = players.get(index) {
                let gizmo = Gizmo::from(DisplayScore {
                    player: player.clone(),
                    ws: self.ws.clone(),
                    index,
                    can_edit,
                });
                let value = View::from(gizmo.view_builder());
                tx_view.send(&Patch::Replace { index, value });
            } else {
                tx_view.send(&Patch::PopBack);
                self.num_children -= 1;
            }
        }

        if self.num_children < players.len() {
            for index in self.num_children..players.len() {
                let player = players[index].clone();
                let gizmo = Gizmo::from(DisplayScore {
                    player,
                    ws: self.ws.clone(),
                    index,
                    can_edit,
                });
                let value = View::from(gizmo.view_builder());
                tx_view.send(&Patch::PushBack { value });
                self.num_children += 1;
            }
        }
    }

    fn view(
        &self,
        _tx: &Transmitter<Self::ModelMsg>,
        rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        builder! {
            <div>
                <u>"scores"</u><br/>
                <div patch:children=rx.branch()>
                </div>
            </div>
        }
    }
}
