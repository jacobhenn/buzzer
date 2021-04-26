pub struct ServerState {
    game_state: GameState,
    registry: Addr<Registry>,
}

impl Actor for GameState {
    type Context = Context<Self>;
}

impl Handler<Command> for GameState {
    type Result = ();

    fn handle(&mut self, msg: Command, _: &mut Context<Self>) {
        let opt = self.apply_command(msg.clone());

        if opt.is_some() {
            self.registry.do_send(msg);
        } else {
            debug!(" -> couldn't execute command");
        }
    }
}

impl Handler<Connect> for GameState {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Context<Self>) {
        self.registry.do_send(msg.clone());

        // Send the current state to the connected player
        let Connect(_, socket) = msg;
        self.check_timer();
        let cmd = Command::SetGameState {
            state: self.clone(),
        };
        if let Ok(cmdstr) = CmdStr::new(&cmd) {
            socket.do_send(cmdstr);
        }
    }
}

impl Handler<Disconnect> for GameState {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Context<Self>) {
        self.registry.do_send(msg);
    }
}
