const url = "http://127.0.0.1:8080/";

$("#run").on("click", function() {
    command = JSON.stringify(JSON.parse("{\"action\": " + $("#command").val() + "}"));
    console.log("attempting to run command: " + command);
    fetch("http://127.0.0.1:8080/command", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: command
    });
});

async function updateState() {
    let response = fetch(url + "state/buzzer")
        .then(x => x.json());

    response.then(x => $("#state_").text(JSON.stringify(x)));
}

async function updateScores() {
    let response = fetch(url + "state/scores")
        .then(x => x.json());

    response.then(x => $("#scores").text(JSON.stringify(x)));
}

async function updateBlocked() {
    let response = fetch(url + "state/blocked")
        .then(x => x.json());

    response.then(x => $("#blocked").text(JSON.stringify(x)));
}

async function updateContinuous() {
    updateState();
    updateScores();
    setTimeout(updateContinuous, 200);
}

updateContinuous();
