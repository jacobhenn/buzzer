# Overview

This is a Rust web server (using [actix-web](https://actix.rs)). It uses a very simple method to communicate with the clients in `static/` to coordinate and decide which client buzzed in first in a certain round.

# Use

`cargo run` (automatically binds to `http://127.0.0.1:8080/`).
Change the `RUST_LOG` environment variable to change the level at which logging is printed (`info` for information about when the server starts up, when major state changes happen, etc., `trace` for detailed information about which URIs are being accessed and how frequently).
