const url = "http://127.0.0.1:8080/";
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
console.log("player's name is " + name);
var canBuzz = false;
var state = {
    state: undefined
};

async function amBlocked() {
    let response = fetch(url + "blocked/" + name)
        .then(x => x.text());
    return response;
}

async function buzz() {
    if (canBuzz) {
        let response = await fetch(url + "buzz", {
            method: "POST",
            body: name
        });
    }
}

function stateCheck(x) {
    if (x.state === state.state) {
        ;
    }
    else if (x.state === "Open") {
        amBlocked().then(x => {
            console.log("amBlocked: _" + x + "_")
            if (x) {
                canBuzz = false;
                $("#state").css("color", "#EBCB8B");
                $("#state").text("you have already buzzed in");
            } else {
                canBuzz = true;
                $("#state").css("color", "#A3BE8C")
                $("#state").text("the buzzer is open");
            }
        });
    }
    else if (x.state === "Closed") {
        canBuzz = false;
        $("#state").css("color","#BF616A");
        $("#state").text("the buzzer is closed");
    } else {
        canBuzz = false;

        let livePlayer = x.player;
        if (livePlayer !== name) {
            $("#state").text(livePlayer + " has buzzed in");
            $("#state").css("color","#BF616A");
        } else {
            $("#state").text("you have buzzed in");
            $("#state").css("color","#88C0D0");
        }
    }
}

async function updateScores() {
    let response = fetch(url + "state/scores")
        .then(x => x.json());

    let formattedResponse = "";

    response.then(x => x.map(
        y => formattedResponse += y.name + " " + y.score + "<br/>"
    ));

    response.then(x => $("#scores").html(formattedResponse));
}

async function updateState() {
    let response = fetch(url + "state/buzzer")
        .then(x => x.json());

    response.then(x => stateCheck(x));
    state = response;
}

async function updateStateContinuous() {
    updateState();
    setTimeout(updateStateContinuous, 200);
}

$("body").keydown(function(event) {
    if (event.code === $("#key").val()) {
        buzz();
    }
})

fetch(url + "command", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({action: 'AddTeam', name: name})
});

updateScores();
updateStateContinuous();
