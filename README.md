# Overview

This is a Rust web server (using [actix](https://actix.rs)). It uses a very simple method to communicate with the clients in `static/` to coordinate and decide which client buzzed in first in a certain round.

# Use

`cargo run` (automatically binds to `http://127.0.0.1:8080/`)
