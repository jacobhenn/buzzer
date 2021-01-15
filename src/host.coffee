doUpdateScores = yes
clientState    = buzzer: ""
url            = "http://127.0.0.1:8080/"

# send a POST request
post = (path, body) ->
  fetch url + path,
    method: "POST"
    headers:
      "Content-Type": "application/json"
    body: JSON.stringify body

# change the page if the buzzer's state has changed
checkServerBuzzer = (serverState) ->
  if serverState.buzzer == clientState.buzzer
  else if serverState.buzzer == "Open"
    $("#wait")         .show()
    $("#check-answer") .hide()
    $("#ask-question") .hide()
  else if serverState.buzzer == "Closed"
    updateScores()
    $("#ask-question") .show()
    $("#check-answer") .hide()
    $("#wait")         .hide()
  else
    $("#check-answer") .show()
    $("#ask-question") .hide()
    $("#wait")         .hide()
    $(".player")       .text serverState.owner

# fetch the scores, then format and display them
updateScores = ->
  fetch url + "state/scores"
    .then (response) => response .json()
    .then (response) ->
      $("#scores") .html (
          response .map (team) =>
            team.name + " " + team.score
      ) .join "<br/>"

# fetch the state of the buzzer and update the page accordingly
updateBuzzer = ->
  fetch url + "state/buzzer"
    .then (response) => response .json()
    .then (response) ->
      checkServerBuzzer response
      clientState = response

  if doUpdateScores then updateScores()

command = (data) ->
  post "command", data

$("#open") .click ->
  command action: "OpenBuzzer"
  if doUpdateScores then doUpdateScores = false

$("#incorrect") .click ->
  command action: "OpenBuzzer"

$("#end-round") .click ->
  command action: "EndRound"

$("#correct") .click ->
  command
    action: "AddScore"
    name: clientState.owner
    score: parseInt ( $ "#points" ) .val()
  command
    action: "EndRound"

setInterval updateBuzzer, 100
