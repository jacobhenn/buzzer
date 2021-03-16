<script lang="ts">
    import { clientBuzzer, pointsWorth, clientScores } from './stores';
    import { postObject } from './utils';

    const nJPointValues = [200, 400, 600,  800,  1000]
    const dJPointValues = [400, 800, 1200, 1600, 2000]
    let pointValuesIndex = 0;
    let inDj = false;

    $: $pointsWorth = inDj
        ? dJPointValues[pointValuesIndex]
        : nJPointValues[pointValuesIndex];

    function incrementPointsWorth(): void {
        pointValuesIndex++;
        pointValuesIndex %= 5;
    }

    function decrementPointsWorth(): void {
        pointValuesIndex--;
    }

    function endRound(): void {
        postObject("/command", {
            action: "EndRound"
        });
        incrementPointsWorth();
    }

    function correct(): void {
        postObject("/command", {
            action: "AddScore",
            name: $clientBuzzer.owner,
            score: $pointsWorth
        });
        endRound();
    }

    function openBuzzer(): void {
        if (Object.entries($clientScores).every(c => c[1].blocked)) {
            incrementPointsWorth();
        }
        postObject("/command", {
            action: "OpenBuzzer"
        });
    }

    document.addEventListener("keydown", function(event) {
        if (document.activeElement.nodeName === "INPUT") {
            return;
        } else if ($clientBuzzer.state === "Open" && event.key === "e") {
            endRound();
        } else if ($clientBuzzer.state === "Closed" && event.key === "o") {
            openBuzzer();
        } else if ($clientBuzzer.state === "TakenBy" && event.key === "c") {
            correct();
        } else if ($clientBuzzer.state === "TakenBy" && event.key === "i") {
            openBuzzer();
        } else if (event.key === "d") {
            inDj = !inDj;
        } else if (pointValuesIndex < 4 && event.key === "+") {
            incrementPointsWorth();
        } else if (pointValuesIndex > 0 && event.key === "-") {
            decrementPointsWorth();
        }
    });
</script>

<hr/>
<span class="header">host commands</span><br/>

{#if $clientBuzzer.state === "Open"}
    <button class="large" on:mousedown={endRound}><u>e</u>nd round early</button>
{:else if $clientBuzzer.state === "Closed"}
    points worth:
    <select type="number" bind:value={$pointsWorth}>
        {#each (inDj ? dJPointValues : nJPointValues) as p}
            <option>{p}</option>
        {/each}
    </select>

    <button on:mousedown={incrementPointsWorth}
            disabled={pointValuesIndex > 3}><u>+</u></button>
    <button on:mousedown={decrementPointsWorth}
            disabled={pointValuesIndex < 1}><u>-</u></button>

    <br/>
    <button on:mousedown={() => inDj = !inDj}>
        {inDj ? "☑" : "☐"}
        <u>d</u>ouble Jeopardy!
    </button>

    <br/>
    <button class="large" on:mousedown={openBuzzer}><u>o</u>pen buzzer</button>
{:else if $clientBuzzer.state === "TakenBy"}
    is <strong>{$clientBuzzer.owner}</strong>
    <button on:mousedown={correct}><u>c</u>orrect</button> or
    <button on:mousedown={openBuzzer}><u>i</u>ncorrect</button>?
{/if}
