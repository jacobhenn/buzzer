use wasm_bindgen::JsCast;
use web_sys::{Event, HtmlInputElement};

pub fn event_input_value(evt: &Event) -> Option<String> {
    let target = evt.target()?;
    let input: &HtmlInputElement = target.unchecked_ref();
    Some(input.value().trim().to_string())
}
