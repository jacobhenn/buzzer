# Overview

This is a Rust web server (using [actix-web](https://actix.rs)). It uses a very simple method to communicate with the Svelte client in `client/` to coordinate and decide which client buzzed in first in a certain round.

# Features
* Multiple players can connect to the server from the same client
* Players may choose their own keys with which to buzz in
* Players who have already buzzed in in a given round are forbidden from buzzing in until the next round
* Buzzer keeps track of players' scores
* Buzzer keeps a comprehensive score history which can be edited arbitrarily by the host and automatically reconstructs current scores based on changes to the history.
* The server and client communicate over websockets, meaning that virtually zero network resources are used.

# Use

Run with `cargo run` (automatically binds to `http://localhost:8080`)

This should generate a `conf.json` file in the project root. In it, you can change the address the server will bind to and the level of logging.
