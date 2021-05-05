//! The component which allows contestants to select their buzz keys, and which
//! detects when contestants have pressed their buzz key.

use mogwai::prelude::*;
use web_sys::WebSocket;

use crate::utils::{BottomType, ClientState};

/// The component which allows contestants to select their buzz keys, and which
/// detects when contestants have pressed their buzz key.
pub struct BuzzKeys {
    /// A container of ClientState which may be mutated through or listened to
    /// for mutations
    pub state: Model<ClientState>,
    /// A clone of the websocket connection to the buzzer server
    pub ws: WebSocket,
}

impl Component for BuzzKeys {
    type ModelMsg = BottomType;

    type ViewMsg = BottomType;

    type DomNode = HtmlElement;

    fn update(
        &mut self,
        _msg: &Self::ModelMsg,
        _tx_view: &Transmitter<Self::ViewMsg>,
        _sub: &Subscriber<Self::ModelMsg>,
    ) {
        todo!()
    }

    fn view(
        &self,
        _tx: &Transmitter<Self::ModelMsg>,
        _rx: &Receiver<Self::ViewMsg>,
    ) -> ViewBuilder<Self::DomNode> {
        todo!()
    }
}
