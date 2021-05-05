//! The component which lists all of the players in play by name along with
//! their scores.

use mogwai::prelude::*;
use util::Player;

use crate::utils::{BottomType, ClientState, display_commas};

/// The component which displays a single player and their score.
pub struct DisplayScore(
    pub Player,
);

impl Component for DisplayScore {
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
        let Self(Player { name, score, blocked }) = self;

        builder! {
            <div
                class=if *blocked { "displayscore blocked" } else { "displayscore" }
            >
                    {name}": "{display_commas(score)}
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
}

impl Component for DisplayScores {
    type ModelMsg = ClientState;

    type ViewMsg = Patch<View<HtmlElement>>;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        msg: &Self::ModelMsg,
        tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        for index in 0..self.num_children {
            if let Some(player) = msg.game_state.players.get(index) {
                let gizmo = Gizmo::from(DisplayScore(player.clone()));
                let value = View::from(gizmo.view_builder());
                tx_view.send(&Patch::Replace { index, value });
            } else {
                tx_view.send(&Patch::PopBack);
                self.num_children -= 1;
            }
        }

        if self.num_children < msg.game_state.players.len() {
            for index in self.num_children..msg.game_state.players.len() {
                let player = msg.game_state.players[index].clone();
                let gizmo = Gizmo::from(DisplayScore(player));
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
            <div patch:children=rx.branch()>
            </div>
        }
    }
}
