<script lang="ts">
    import { state } from './stores';
    import { socket } from './utils';

    export let pointValuesIndex = 0;

    const sJPointValues = [200, 400, 600,  800,  1000];
    const dJPointValues = [400, 800, 1200, 1600, 2000];
    let inDj = false;

    $: pointsWorth = inDj
        ? dJPointValues[pointValuesIndex]
        : sJPointValues[pointValuesIndex];

    $: socket.send(JSON.stringify({
        action: "SetPtsWorth",
        pts: pointsWorth
    }));

    function incrementPointsWorth(): void {
        pointValuesIndex++;
        pointValuesIndex %= 5;
    }

    function decrementPointsWorth(): void {
        pointValuesIndex--;
    }

    function endRound(): void {
        socket.send(JSON.stringify({
            action: "EndRound"
        }));
        incrementPointsWorth();
    }

    function correct(): void {
        socket.send(JSON.stringify({
            action: "OwnerCorrect"
        }));
        incrementPointsWorth();
    }

    function openBuzzer(): void {
        if (Object.entries($state.scores).every(c => c[1].blocked)) {
            incrementPointsWorth();
        }
        socket.send(JSON.stringify({
            action: "OpenBuzzer"
        }));
    }

    document.addEventListener("keydown", function(event) {
        if (document.activeElement.nodeName === "INPUT") {
            return;
        } else if ($state.buzzer.state === "Open" && event.key === "e") {
            endRound();
        } else if ($state.buzzer.state === "Closed" && event.key === "o") {
            openBuzzer();
        } else if ($state.buzzer.state === "TakenBy" && event.key === "c") {
            correct();
        } else if ($state.buzzer.state === "TakenBy" && event.key === "i") {
            openBuzzer();
        } else if (event.key === "d") {
            inDj = !inDj;
            pointValuesIndex = 0;
        } else if (event.key === "+" && pointValuesIndex < 4) {
            incrementPointsWorth();
        } else if (event.key === "-" && pointValuesIndex > 0) {
            decrementPointsWorth();
        }
    });

    let timeoutID: number;

    $: if ($state.buzzer.state === "Open") {
        timeoutID = window.setTimeout(function() {
            for (var p of Object.entries($state.scores)) {
                p[1].blocked = false;
            }
            $state.buzzer.state = "Closed"
            incrementPointsWorth();
        }, 5000);
    } else {
        window.clearTimeout(timeoutID);
    }
</script>

<hr/>
<span class="header">host commands</span><br/>

points worth:
<!-- svelte-ignore a11y-no-onchange -->
<select type="number"
        bind:value={pointsWorth}>
    {#each (inDj ? dJPointValues : sJPointValues) as p}
        <option>{p}</option>
    {/each}
</select>

<button on:mousedown={incrementPointsWorth}
        disabled={pointValuesIndex > 3}><u>+</u></button>
<button on:mousedown={decrementPointsWorth}
        disabled={pointValuesIndex < 1}><u>-</u></button>

<br/>
<button on:mousedown={() => { inDj = !inDj; pointValuesIndex = 0; }}>
    {inDj ? "☑" : "☐"}
    <u>d</u>ouble Jeopardy!
</button>

<br/>

{#if $state.buzzer.state === "Open"}
    <button class="large" on:mousedown={endRound}><u>e</u>nd round early</button>
{:else if $state.buzzer.state === "Closed"}
    <button class="large" on:mousedown={openBuzzer}><u>o</u>pen buzzer</button>
{:else if $state.buzzer.state === "TakenBy"}
    is <strong>{$state.buzzer.owner}</strong>
    <button on:mousedown={correct}><u>c</u>orrect</button> or
    <button on:mousedown={openBuzzer}><u>i</u>ncorrect</button>?
{/if}
