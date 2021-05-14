//! The component which lists all of the players in play by name along with
//! their scores.

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
    /// Is this player the final winner of the game?
    pub winner: bool,
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
        let class = format!(
            "displayscore {} {}",
            self.player.blocked.then(|| "blocked").unwrap_or_default(),
            self.winner.then(|| "winner").unwrap_or_default(),
        );

        builder! {
            <div>
                <span class=class.clone()>
                    {self.player.name.clone()}": "
                </span>

                <span
                    boolean:hidden=self.can_edit
                    class=class.clone()
                >
                    {display_commas(&self.player.score)}
                </span>

                <input
                    on:change=tx.contra_filter_map(|evt| event_input_value(evt)?.parse().ok())
                    boolean:hidden=!self.can_edit
                    class=class
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
        let mut players = msg.game_state.players.clone();
        players.sort_unstable_by_key(|p| p.score);
        players.reverse();

        let can_edit = match msg.page_state {
            PageState::Play { am_host: true } => true,
            _ => false,
        };

        let max_score = players.first().map(|p| p.score);

        tx_view.send(&Patch::RemoveAll);

        for index in 0..players.len() {
            let player = &players[index];

            let winner = if let PageState::Over { .. } = msg.page_state {
                player.score == max_score.unwrap()
            } else {
                false
            };

            let gizmo = Gizmo::from(DisplayScore {
                player: player.clone(),
                ws: self.ws.clone(),
                index,
                can_edit,
                winner,
            });

            let value = View::from(gizmo.view_builder());
            tx_view.send(&Patch::PushBack { value });
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
