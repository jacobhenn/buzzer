const url = "http://127.0.0.1:8080/";
var state;

async function post(path, body) {
    fetch(url + path, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
}

function stateCheck(x) {
    if (x === state) {
        ;
    }
    else if (x.state === "Open") {
        $("#wait").show();
        $("#check-answer").hide();
        $("#ask-question").hide();
    }
    else if (x.state === "Closed") {
        updateScores();
        $("#ask-question").show();
        $("#check-answer").hide();
        $("#wait").hide();
    }
    else {
        $("#check-answer").show();
        $("#ask-question").hide();
        $("#wait").hide();

        $(".player").text(x.player);
    }
}

function teamToString(x) {
    return x.name + " " + x.score;
}

async function updateScores() {
    let response = fetch(url + "state/scores")
        .then(x => x.text());

    response.then(x => $("#scores").text(x));
}

async function updateState() {
    let response = fetch(url + "state/buzzer")
        .then(x => x.json());

    response.then(x => stateCheck(x));
    response.then(x => state = x);
}

async function updateStateContinuous() {
    updateState();
    setTimeout(updateStateContinuous, 200);
}

function command(data) {
    post("command", data)
}

$("#open").on("click", function() {
    command({
        action: "OpenBuzzer"
    });
});

$("#incorrect").on("click", function() {
    command({
        action: "OpenBuzzer"
    });
});

$("#correct").on("click", function() {
    let addScoreCommand = {
        action: "AddScore",
        name: state.player,
        score: parseInt($("#points").val())
    }
    command(addScoreCommand);
    command({
        action: "EndRound"
    });
});

updateScores();
updateStateContinuous();
