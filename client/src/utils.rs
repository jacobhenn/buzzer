//! Some helper types and functions that make more sense to be defined here
//! than to anywhere else.

use util::{Player, command::Command, state::GameState};
use wasm_bindgen::JsCast;
use web_sys::{Event, HtmlInputElement, WebSocket};
use log::error;

pub const BK_SPACE:       (&'static str, &'static str) = ("Space", "Space");
pub const BK_CONTROLLEFT: (&'static str, &'static str) = ("ControlLeft", "Left Control");
pub const BK_NUMPADENTER: (&'static str, &'static str) = ("NumpadEnter", "Numpad Enter");
pub const BK_NUMPAD0:     (&'static str, &'static str) = ("Numpad0", "Numpad 0");

#[derive(Clone, Copy, Debug)]
/// All possible keys that a contestant may use to buzz in
pub enum BuzzMethod {
    Key((&'static str, &'static str)),
    Mouse,
}

/// Display a number with commas in the proper places (en_US)
///
/// <stackoverflow.com/questions/57029974/how-to-split-string-into-chunks-in-rust-to-insert-spaces>
pub fn display_commas(num: &i32) -> String {
    let mut v = Vec::from(num
        .to_string()
        .chars()
        .rev()
        .enumerate()
        .flat_map(|(i, c)| {
            if i != 0 && i % 3 == 0 {
                Some(',')
            } else {
                None
            }
            .into_iter()
            .chain(std::iter::once(c))
        })
        .collect::<String>()
        .as_bytes());
    v.reverse();
    String::from_utf8(Vec::from(v)).unwrap()
}

/// Serialize and send a command along a websocket
pub fn send_command(ws: &WebSocket, cmd: &Command) {
    let bin_res = rmp_serde::to_vec(cmd);
    if let Ok(bin) = bin_res {
        let res = ws.send_with_u8_array(&bin);
        if let Err(e) = res {
            error!("couldn't send websocket message: {:?}", e);
        }
    } else {
        error!("couldn't serialize command: {}", cmd);
    }
}

/// The bottom type is a type which has no variants. In this crate, it is used
/// to represent that a certain message type will never be transmitted.
#[derive(Clone, Copy)]
pub enum BottomType {}

/// PageState represents which phase of play the player(s) at this page are
/// currently in.
#[derive(PartialEq, Clone)]
pub enum PageState {
    /// The phase at which the player(s) are asked to enter their name(s) and
    /// the host, if any, is asked to declare themself.
    Setup,
    /// The phase at which play is in full swing - contestants can buzz in,
    /// and the host can ask questions or edit scores.
    Play {
        /// Whether or not components on this page should have host privelages
        am_host: bool,
    },
    /// The phase triggered when the websocket closes, in which nothing is
    /// displayed but the close code/message, the scores, and the history.
    Over {
        /// The code with which the websocket was closed.
        ///
        /// See <https://tools.ietf.org/html/rfc6455#section-7.4.1> for a list
        /// of close codes.
        code: u16,
        /// A description of the reason of the closure given by the server.
        /// See `buzzer::websockets::Connection` for some examples.
        reason: String,
    },
}

/// The client's wrapper around GameState, similar to ServerState on the
/// server side.
#[derive(Clone)]
pub struct ClientState {
    /// See [`GameState`]
    pub game_state: GameState,
    /// A list of the players who are connected from this page.
    pub contestants: Vec<Contestant>,
    /// The current phase of play on this page.
    pub page_state: PageState,
}

impl ClientState {
    /// Create a new ClientSate that represents the initial state, before
    /// anything has occurred.
    pub fn new() -> Self {
        Self {
            game_state: GameState::new(),
            contestants: Vec::new(),
            page_state: PageState::Setup,
        }
    }
}

/// A player that is connected from this page. Actual information about this
/// player, such as their name, must be extracted from their [`Player`]
/// entry in [`GameState`].
#[derive(Clone)]
pub struct Contestant {
    /// This contestant's index in the [`Player`] list
    pub index: usize,
    /// The key which this contestant will use to buzz in.
    pub buzz_method: BuzzMethod,
}

impl Contestant {
    /// A helper method to get a reference to the [`Player`] represented by
    /// a Contestant
    pub fn get_player<'a>(&self, state: &'a GameState) -> Option<&'a Player> {
        state.players.get(self.index)
    }
}

/// Takes an event and returns the value of `evt.target`. Useful inside of
/// event handlers such as onchange or oninput.
pub fn event_input_value(evt: &Event) -> Option<String> {
    let target = evt.target();
    if target.is_none() {
        error!("event_input_value: couldn't get event.target");
    }
    let target = target?;
    let input: &HtmlInputElement = target.unchecked_ref();
    Some(input.value().trim().to_string())
}
