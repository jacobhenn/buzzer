use log::Level;
use mogwai::prelude::*;
use wasm_bindgen::prelude::*;

struct App {
    clicks: u8,
}

#[derive(Clone)]
enum AppModel {
    Click,
}

#[derive(Clone)]
enum AppView {
    Clicked(u8),
}

impl Component for App {
    type DomNode = HtmlElement;
    type ModelMsg = AppModel;
    type ViewMsg = AppView;

    fn update(&mut self, msg: &AppModel, tx: &Transmitter<AppView>, _sub: &Subscriber<AppModel>) {
        match msg {
            AppModel::Click => {
                self.clicks += 1;
                tx.send(&AppView::Clicked(self.clicks));
            }
        }
    }

    fn view(&self, tx: &Transmitter<AppModel>, rx: &Receiver<AppView>) -> ViewBuilder<HtmlElement> {
        builder! {
            <button on:click=tx.contra_map(|_| AppModel::Click)>
                {(
                    "Waiting for click...",
                    rx.branch_map(|msg| {
                        match msg {
                            AppView::Clicked(1) => format!("Clicked 1 time"),
                            AppView::Clicked(n) => format!("Clicked {} times", n),
                        }
                    })
                )}
            </button>
        }
    }
}

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    console_log::init_with_level(Level::Trace).unwrap();

    let gizmo = Gizmo::from(App { clicks: 0 });
    let view = View::from(gizmo.view_builder());
    view.run()
}
