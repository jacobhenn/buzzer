# Buzzer mogwai client

This is (will be) a client for the buzzer server written using the [mogwai](https://github.com/schell/mogwai) web client framework for Rust. I decided to move towards this away from Svelte becuase of the enormous benefits of having both the client and server written in Rust as opposed to a JS client talking to a Rust server. Among other things, it allows me to only have to implement new commands or new data in the state once, since the client and server are using the same type definitions.
