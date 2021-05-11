use crate::command::*;
use crate::state::*;
use crate::*;

#[test]
fn test_set_score() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"[OԙEL8aϺ"##.into(),
    });
    state.apply_command(Command::SetScore {
        index: 0,
        score: 200,
    });
    assert_eq!(state.players[0].score, 200);
    state.apply_command(Command::SetScore {
        index: 0,
        score: 100,
    });
    assert_eq!(state.players[0].score, 100);
}

#[test]
fn test_end_round() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"ҳ{PxOΰ"VpjwY"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"'dYTIYk@?3ޫ5"##.into(),
    });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::EndRound);
    assert!(!state.players[0].blocked);
    assert_eq!(state.buzzer, Buzzer::Closed);
    assert_eq!(state.ptsindex, 1);
}

#[test]
fn test_open_buzzer() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"aͮſur7M"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"±j)+Gx}f"##.into(),
    });
    state.apply_command(Command::OpenBuzzer);
    assert_eq!(state.buzzer, Buzzer::Open);
}

#[test]
fn test_add_player() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"PTWlQ,Kupxnǂ6(PJӴwFj~1MxV?{q`zuu%)AxKt-8Ϣ"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"PTWlQ,Kupxnǂ6(PJӴwFj~1MxV?{q`zuu%)AxKt-8Ϣ"##.into(),
    });
    assert_eq!(
        state.players,
        vec![
            Player {
                name: r##"PTWlQ,Kupxnǂ6(PJӴwFj~1MxV?{q`zuu%)AxKt-8Ϣ"##.into(),
                score: 0,
                blocked: false
            },
            Player {
                name: r##"PTWlQ,Kupxnǂ6(PJӴwFj~1MxV?{q`zuu%)AxKt-8Ϣ"##.into(),
                score: 0,
                blocked: false
            },
        ]
    )
}

#[test]
fn test_add_pts_index() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPtsIndex);
    assert_eq!(state.ptsindex, 1);
    for _ in 0..=state.ptvalues.len() {
        state.apply_command(Command::AddPtsIndex);
    }
    assert_eq!(state.ptsindex, state.ptvalues.len() - 1);
}

#[test]
fn test_sub_pts_index() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPtsIndex);
    state.apply_command(Command::SubPtsIndex);
    assert_eq!(state.ptsindex, GameState::new().ptsindex);
    state.apply_command(Command::SubPtsIndex);
    assert_eq!(state.ptsindex, GameState::new().ptsindex);
}

#[test]
fn test_set_pt_values() {
    let mut state = GameState::new();
    state.apply_command(Command::SetPtValues { values: Vec::new() });
    assert!(state.ptvalues.is_empty());
}

#[test]
fn test_undo_set_pt_values() {
    let mut state = GameState::new();
    // Test revert to default if no previous found.
    state.apply_command(Command::SetPtValues { values: Vec::new() });
    state.apply_command(Command::Undo);
    assert_eq!(state.ptvalues, GameState::new().ptvalues);
    // Test revert to previous command
    state.apply_command(Command::SetPtValues {
        values: vec![54, 36],
    });
    state.apply_command(Command::SetPtValues {
        values: vec![89, 41],
    });
    state.apply_command(Command::Undo);
    assert_eq!(state.ptvalues, vec![54, 36]);
}

#[test]
fn test_undo_owner_correct() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"|"J!}"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"iZz_"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"N/,B"##.into(),
    });
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
    state.apply_command(Command::AddPlayer {
        name: r##"z<$0"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"_%"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##")8`%"##.into(),
    });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Buzz { index: 1 });
    state.apply_command(Command::OwnerIncorrect);
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::TakenBy { owner: 1 });
    assert!(state.players.get(0).map(|p| p.blocked).unwrap_or(false));
    assert!(state.players.get(1).map(|p| p.blocked).unwrap_or(false));
    assert!(state.players.get(2).map(|p| !p.blocked).unwrap_or(false));
}

#[test]
fn test_undo_open_buzzer() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"ǁp]XoI1mWѡ[E"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"lC?Ȓ+ufRA"ȏɝ"rV#"##.into(),
    });
    state.apply_command(Command::OpenBuzzer);
    state.apply_command(Command::Buzz { index: 0 });
    state.apply_command(Command::Undo);
    assert_eq!(state.buzzer, Buzzer::Closed);
    assert!(!state.players[0].blocked);
}

#[test]
fn test_undo_end_round() {
    let mut state = GameState::new();
    state.apply_command(Command::AddPlayer {
        name: r##"+),ݲw"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"J:j3>UW1M]+"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##" B-+EgR읿ϑ,-j"##.into(),
    });
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
    state.apply_command(Command::AddPlayer {
        name: r##"="H1ӢRyaߚu"##.into(),
    });
    state.apply_command(Command::AddPlayer {
        name: r##"%SJHRK|+ѣiLC"##.into(),
    });
    state.apply_command(Command::SetScore {
        index: 0,
        score: 111,
    });
    state.apply_command(Command::SetScore {
        index: 1,
        score: 222,
    });
    state.apply_command(Command::AddPlayer {
        name: r##"b,!bu!bSȪ6v"##.into(),
    });
    state.apply_command(Command::Undo);
    state.apply_command(Command::SetScore {
        index: 2,
        score: 333,
    });
    assert_eq!(state.players[0].score, 111);
    assert_eq!(state.players[1].score, 0);
    assert_eq!(state.players[2].score, 333);
}
