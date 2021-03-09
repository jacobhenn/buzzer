# Overview

This is a Rust web server (using [actix-web](https://actix.rs)). It uses a very simple method to communicate with the Svelte client in `client/` to coordinate and decide which client buzzed in first in a certain round.

# Use

Run with `cargo run` (automatically binds to `http://localhost:8080`)

This should generate a `conf.json` file in the project root. In it, you can change the address the server will bind to and the level of logging.
