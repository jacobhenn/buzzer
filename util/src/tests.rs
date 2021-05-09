use crate::state::*;
use crate::command::*;
use crate::*;

#[test]
fn test_undo_set_pt_values() {
    let mut state = GameState::new();
    // Test revert to default if no previous found.
    state.apply_command(Command::SetPtValues { values: vec![] });
    state.apply_command(Command::Undo);
    assert_eq!(state.ptvalues, GameState::new().ptvalues);
    // Test revert to previous command
    state.apply_command(Command::SetPtValues { values: vec![54, 36] });
    state.apply_command(Command::SetPtValues { values: vec![89, 41] });
    state.apply_command(Command::Undo);
    assert_eq!(state.ptvalues, vec![54, 36]);
}

#[test]
fn test_undo_owner_correct() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer { name: r##"|"J!}"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"iZz_"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"N/,B"##.into() });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Buzz { index: 1 });
    state.apply_command(Command::OwnerCorrect);
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::TakenBy { owner: 1 });
    assert_eq!(state.ptsindex, 0);
    assert!(state.players[0].blocked);
    assert!(state.players[1].blocked);
    assert!(!state.players[2].blocked);
    assert_eq!(state.players[1].score, 0);
}

#[test]
fn test_undo_owner_incorrect() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer { name: r##"z<$0"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"_%"##.into() });
    state.apply_command(Command::AddPlayer { name: r##")8`%"##.into() });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Buzz { index: 1 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::TakenBy { owner: 1 });
    assert!(state.players.get(0).map(|p|  p.blocked).unwrap_or(false));
    assert!(state.players.get(1).map(|p|  p.blocked).unwrap_or(false));
    assert!(state.players.get(2).map(|p| !p.blocked).unwrap_or(false));
}

#[test]
fn test_undo_open_buzzer() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer { name: r##"ǁp]XoI1mWѡ[E"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"lC?Ȓ+ufRA"ȏɝ"rV#"##.into() });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::Closed);
    assert!(!state.players[0].blocked);
}

#[test]
fn test_undo_end_round() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer { name: r##"+),ݲw"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"J:j3>UW1M]+"##.into() });
    state.apply_command(Command::AddPlayer { name: r##" B-+EgR읿ϑ,-j"##.into() });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Buzz { index: 1 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::EndRound);
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::Open);
    assert!(state.players[0].blocked);
    assert!(state.players[1].blocked);
    assert!(!state.players[2].blocked);
}

#[test]
fn test_fast_forward() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer { name: r##"="H1ӢRyaߚu"##.into() });
    state.apply_command(Command::AddPlayer { name: r##"%SJHRK|+ѣiLC"##.into() });
    state.apply_command(Command::SetScore { index: 0, score: 111 });
    state.apply_command(Command::SetScore { index: 1, score: 222 });
    state.apply_command(Command::AddPlayer { name: r##"b,!bu!bSȪ6v"##.into() });
    state.apply_command(Command::Undo);
    state.apply_command(Command::SetScore { index: 2, score: 333 });
    assert_eq!(state.players[0].score, 111);
    assert_eq!(state.players[1].score, 0);
    assert_eq!(state.players[2].score, 333);
}
