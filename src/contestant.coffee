doUpdateScores = yes
clientState    = buzzer: undefined
urlParams      = new URLSearchParams window.location.search
canBuzz        = no
name           = urlParams.get "name"
url            = "http://127.0.0.1:8080/"

amBlocked = ->
  fetch url + "blocked/" + name
    .then (response) => response.text()

buzz = ->
  if canBuzz
    fetch url + "buzz",
      method: "POST"
      body: name

# change the color of the top bar and state text
highlight = (color) ->
  $("#state").css  "color",            color
  $("#topbar").css "background-color", color

# change the page if the buzzer state has changed
checkServerBuzzer = (serverState) ->
  if serverState.buzzer == clientState.buzzer # do nothing
  else if serverState.buzzer == "Open"
    amBlocked().then (blocked) ->
      if blocked
        canBuzz = no
        $("#state").text "you have already buzzed in"
        highlight "#EBCB8B"
      else
        canBuzz = yes
        $("#state").text "the buzzer is open"
        highlight "#A3BE8C"
  else if serverState.buzzer == "Closed"
    if doUpdateScores then doUpdateScores = no
    canBuzz = no
    $("#state").text "the buzzer is closed"
    highlight "#BF616A"
    updateScores()
  else
    canBuzz = no
    if serverState.owner != name
      $("#state").text serverState.owner + " has buzzed in"
      highlight "#BF616A"
    else
      $("#state").text "you have buzzed in"
      highlight "#88C0D0"

# fetch and update scores
updateScores = ->
  fetch url + "state/scores"
    .then (response) => response.json()
    .then (response) ->
      $("#scores").html (
        response.map (team) =>
          team.name + " " + team.score
      ).join "<br/>"

# grab the buzzer state and update page accordingly
updateBuzzer = ->
  fetch url + "state/buzzer"
    .then (response) => response.json()
    .then (response) ->
      checkServerBuzzer response
      clientState = response

    if doUpdateScores then updateScores()

command = (data) ->
  post "command", data

# check if the pressed key is the selected buzz key
document.keydown (event) ->
  if event.code == $("#key").val() then buzz()

document.mousedown (event) -> buzz()

# add self to team list
fetch url + "command",
  method: "POST"
  headers:
    'Content-Type': 'application/json'
  body: JSON.stringify action: "AddTeam", name: name

setInterval updateBuzzer, 100
