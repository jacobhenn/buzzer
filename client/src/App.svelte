<script lang="ts">
    import {
        state, inSetup, contestants, amHost,
        serverDown, inHistory, closeMsg, closeCode
    } from './stores';

    import { range, socket } from './utils';

    import type { Contestant } from './types';

    import DisplayHistory from './DisplayHistory.svelte';
    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';


    function logHistory(n: string, s: number): void {
        const d = new Date();
        $state.history = [{
            time: [d.getHours(), d.getMinutes()],
            name: n,
            score: s
        }, ...$state.history];
    }

    let timeoutID: number;

    let pointValuesIndex = 0;

    socket.onmessage = function(event) {
        let cmd = JSON.parse(event.data);
        let a = cmd.action;

        if (a === "SetScore") {
            let p = $state.scores[cmd.name];
            p.score = cmd.score;
            logHistory(cmd.name, p.score);
            // $state.history = $state.history;
        } else if (a === "EndRound") {
            for (var p of Object.entries($state.scores)) {
                p[1].blocked = false;
            }
            $state.buzzer.state = "Closed"
            window.clearTimeout(timeoutID);
        } else if (a === "OpenBuzzer") {
            // If everyone's blocked, OpenBuzzer closes the buzzer instead.
            if (Object.values($state.scores).every(p => p.blocked)) {
                $state.buzzer.state = "Closed";
                Object.values($state.scores).map(p => p.blocked = false);
            } else {
                $state.buzzer.state = "Open";
            }
            timeoutID = window.setTimeout(function() {
                console.log("ending round due to timeout");
                for (var p of Object.entries($state.scores)) {
                    p[1].blocked = false;
                }
                $state.buzzer.state = "Closed";
                pointValuesIndex++;
                pointValuesIndex %= 5;
            }, 5000);
        } else if (a === "AddPlayer") {
            // If the history contains a prior score for this player, use
            // that score instead of 0.
            let entry = $state.history.find(e => e.name === cmd.name);
            let score = entry === undefined ? 0 : entry.score;
            $state.scores[cmd.name] = {
                score: score,
                blocked: false
            };
            logHistory(cmd.name, score);
            // $state.history = $state.history;
        } else if (a === "RemovePlayer") {
            delete $state.scores[cmd.name];
            $state.scores = $state.scores;
        } else if (a === "Unblock") {
            $state.scores[cmd.name].blocked = false;
        } else if (a === "EditHistory") {
            let e = $state.history[cmd.index];
            // How much did we add to/subtract from this player's score?
            let diff: number = cmd.score - e.score;

            // Add that diff to the current score of this player
            $state.scores[e.name].score += diff;

            // Add that diff to all this player's later history entries
            for (const i of range(0, cmd.index)) {
                if ($state.history[i].name === e.name) {
                    $state.history[i].score += diff;
                }
            }
        } else if (a === "RemoveHistory") {
            let e = $state.history[cmd.index];
            // What was the last history entry of this player before the
            // one we are deleting? If none, 0.
            let prevScore = $state.history
                .slice(cmd.index+1)
                .find(x => x.name === e.name)
                .score;
            if (prevScore === undefined) prevScore = 0;
            let diff = e.score - prevScore;

            $state.scores[e.name].score -= diff;

            $state.history.splice(cmd.index, 1);
            $state.history = $state.history;

            for (const i of range(0, cmd.index-1)) {
                if ($state.history[i].name === e.name) {
                    $state.history[i].score -= diff;
                }
            }
        } else if (a === "SetPtsWorth") {
            $state.ptsworth = cmd.pts;
        } else if (a === "OwnerCorrect") {
            let p = $state.scores[$state.buzzer.owner];
            p.score += $state.ptsworth;
            logHistory($state.buzzer.owner, p.score);
            // $state.history = $state.history;
            Object.values($state.scores).map(p => p.blocked = false);
            $state.buzzer.state = "Closed";
        } else if (a === "SetState") {
            $state = cmd.state;
        } else if (a === "Buzz") {
            $state.scores[cmd.name].blocked = true;
            $state.buzzer = { state: "TakenBy", owner: cmd.name };
            window.clearTimeout(timeoutID);
        }
    }

    socket.onclose = function(e: CloseEvent) {
        $serverDown = true;
        $closeMsg = e.reason;
        $closeCode = e.code;
    }

    function buzz(c: Contestant): void {
        if (!$state.scores[c.name].blocked) {
            socket.send(JSON.stringify({
                action: "Buzz",
                name: c.name
            }));
        }
    }

    function clickBuzz(event: MouseEvent | TouchEvent): void {
        let eventTarget = event.target as HTMLElement;
        let eventSrcElement = event.srcElement as HTMLElement;

        let forbiddenElements = ["INPUT", "BUTTON", "SELECT"];

        if (forbiddenElements.includes(eventTarget.tagName)) { return; }
        if (forbiddenElements.includes(eventSrcElement.tagName)) { return; }

        for (const contestant of $contestants) {
            if (contestant.buzzKey === "Click") {
                buzz(contestant);
            }
        }
    }

    function keyBuzz(event: KeyboardEvent): void {
        for (const contestant of $contestants) {
            if (contestant.buzzKey === event.code) {
                buzz(contestant);
            }
        }
    }



</script>

<svelte:window on:mousedown={clickBuzz} on:keydown={keyBuzz} on:touchstart={clickBuzz}/>

{#if $inSetup}
    <Setup/>
{:else}
    <DisplayBuzzer/>
    <SelectBuzzKeys/>
    {#if $amHost}
        <HostUtils {pointValuesIndex}/>
    {/if}
    {#if $inHistory}
        <DisplayHistory/>
    {:else}
        <DisplayScores/>
    {/if}
{/if}

<div id="footer">v5.1.2</div>

<style>
    #footer {
        color: #4c566a;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
