<script lang="ts">
    import {
        clientState, state, contestants, pointValuesIndex,
        inHistory, closeMsg, closeCode
    } from './stores';

    import { socket } from './utils';
    import { Contestant, ClientState } from './types';

    import CommandBuilder from './CommandBuilder.svelte';
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
            delta: s
        }, ...$state.history];
    }

    let timeoutID: number;

    socket.onmessage = function(event) {
        let cmd = JSON.parse(event.data);
        let a = cmd.action;

        if (a === "SetScore") {
            let p = $state.scores[cmd.name];
            logHistory(cmd.name, cmd.score - p.score);
            p.score = cmd.score;
        } else if (a === "EndRound") {
            for (var p of Object.entries($state.scores)) {
                p[1].blocked = false;
            }
            $state.buzzer.state = "Closed"
            window.clearTimeout(timeoutID);
        } else if (a === "OpenBuzzer") {
            // If everyone's blocked, OpenBuzzer closes the buzzer instead.
            let vals = Object.values($state.scores);
            if (vals.length !== 0 && vals.every(p => p.blocked)) {
                $state.buzzer.state = "Closed";
                Object.values($state.scores).map(p => p.blocked = false);
            } else {
                $state.buzzer.state = "Open";
            }
            timeoutID = window.setTimeout(function() {
                for (var p of Object.entries($state.scores)) {
                    p[1].blocked = false;
                }
                $state.buzzer.state = "Closed";
                $pointValuesIndex++;
                $pointValuesIndex %= 5;
            }, 5000);
        } else if (a === "AddPlayer") {
            $state.scores[cmd.name] = {score: 0, blocked: false};
        } else if (a === "RemovePlayer") {
            delete $state.scores[cmd.name];
            $state.scores = $state.scores;
            $contestants = $contestants.filter(c => c.name !== cmd.name);
        } else if (a === "Unblock") {
            $state.scores[cmd.name].blocked = false;
        } else if (a === "EditHistory") {
            let e = $state.history[cmd.index];
            // How much did we add to/subtract from this player's score?
            let diff = cmd.delta - e.delta;
            e.delta = cmd.delta;

            // Add that diff to the current score of this player
            $state.scores[e.name].score += diff;
        } else if (a === "RemoveHistory") {
            let e = $state.history[cmd.index];

            $state.scores[e.name].score -= e.delta;

            $state.history.splice(cmd.index, 1);
            $state.history = $state.history;
        } else if (a === "SetPtsWorth") {
            $state.ptsworth = cmd.pts;
        } else if (a === "OwnerCorrect") {
            let p = $state.scores[$state.buzzer.owner];
            p.score += $state.ptsworth;
            logHistory($state.buzzer.owner, $state.ptsworth);
            Object.values($state.scores).map(p => p.blocked = false);
            $state.buzzer.state = "Closed";
        } else if (a === "SetState") {
            $state = cmd.state;
            const d = new Date();
            const o = d.getTimezoneOffset() / 60;
            for (let e of $state.history) {
                e.time[0] += o;
                e.time[0] %= 24;
            }
        } else if (a === "Buzz") {
            $state.scores[cmd.name].blocked = true;
            $state.buzzer = { state: "TakenBy", owner: cmd.name };
            window.clearTimeout(timeoutID);
        }
    }

    socket.onclose = function(e: CloseEvent) {
        $clientState = ClientState.Over;
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

{#if $clientState === ClientState.Setup}
    <Setup/>
{:else if $clientState === ClientState.Operator}
    <button id="setup" on:click={() => $clientState = ClientState.Setup}>← setup</button>
    <DisplayBuzzer/>
    <CommandBuilder/>
    {#if $inHistory}
        <DisplayHistory/>
    {:else}
        <DisplayScores/>
    {/if}
{:else if $clientState !== ClientState.Over}
    <button id="setup" on:click={() => $clientState = ClientState.Setup}>← setup</button>
    <DisplayBuzzer/>
    <SelectBuzzKeys/>
    {#if $clientState === ClientState.Host}
        <HostUtils/>
    {/if}
    {#if $inHistory}
        <DisplayHistory/>
    {:else}
        <DisplayScores/>
    {/if}
{:else}
    <DisplayBuzzer/>
    {#if $inHistory}
        <DisplayHistory/>
    {:else}
        <DisplayScores/>
    {/if}
{/if}

<div id="footer">v5.4.0</div>

<style>
    #footer {
        color: #4c566a;
        font-size: 15pt;
        position: fixed;
        bottom: 0px;
        right: 0px;
    }

    #setup {
        font-size: 1.8vw;
        position: fixed;
        left: 0px;
        top: 20px;
    }
</style>
