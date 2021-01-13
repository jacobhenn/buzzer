const url = "http://127.0.0.1:8080/";
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
console.log("player's name is " + name);
var state;

async function amBlocked() {
    let response = fetch(url + "blocked/" + name)
        .then(x => x.text());
    return response;
}

async function buzz() {
    console.log("buzzing");
    let response = await fetch(url + "buzz", {
        method: "POST",
        body: name
    });
}

function stateCheck(x) {
    if (x === state) {
        ;
    }
    else if (x.state === "Open") {
        amBlocked().then(x => {
            console.log("amBlocked: _" + x + "_")
            if (x) {
                $("#buzz").hide();
                $("#state").css("color", "#EBCB8B");
                $("#state").text("you have already buzzed in");
            } else {
                $("#buzz").show();
                $("#state").css("color", "#A3BE8C")
                $("#state").text("the buzzer is open");
            }
        });
    }
    else if (x.state === "Closed") {
        $("#buzz").hide();
        $("#state").css("color","#BF616A");
        $("#state").text("the buzzer is closed");
    } else {
        $("#buzz").hide();

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

$("#buzz").on("click", function() {
    buzz();
});

fetch(url + "command", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({action: 'AddTeam', name: name})
});

updateStateContinuous();
