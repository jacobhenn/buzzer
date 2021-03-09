<script lang="ts">
    import { clientBuzzer, pointsWorth } from './stores';
    import { postObject } from './utils';

    const pointValues = [200, 400, 600, 800, 1000, 1200, 1600, 2000];
    const dJIndexOrder = [1, 3, 5, 6, 7];
    const nJIndexOrder = [0, 1, 2, 3, 4];
    let dJIndexOrderIndex = 0;
    let nJIndexOrderIndex = 0;
    let inDj = false;

    $: pointValuesIndex = inDj
        ? dJIndexOrder[dJIndexOrderIndex]
        : nJIndexOrder[nJIndexOrderIndex];
    $: $pointsWorth = pointValues[pointValuesIndex];

    $: canDecrement = inDj ? dJIndexOrderIndex > 0 : nJIndexOrderIndex > 0;
    $: canIncrement = inDj ? dJIndexOrderIndex < 4 : nJIndexOrderIndex < 4;

    function incrementPointsWorth(): void {
        if (inDj) {
            dJIndexOrderIndex = (dJIndexOrderIndex + 1) % 5;
        } else {
            nJIndexOrderIndex = (nJIndexOrderIndex + 1) % 5;
        }
    }

    function decrementPointsWorth(): void {
        if (inDj) {
            dJIndexOrderIndex = dJIndexOrderIndex - 1;
        } else {
            nJIndexOrderIndex = nJIndexOrderIndex - 1;
        }
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
        postObject("/command", {
            action: "OpenBuzzer"
        });
    }

    document.addEventListener("keydown", function(event) {
        if ($clientBuzzer.state === "Open" && event.key === "e") {
            endRound();
        } else if ($clientBuzzer.state === "Closed" && event.key === "o") {
            openBuzzer();
        } else if ($clientBuzzer.state === "TakenBy" && event.key === "c") {
            correct();
        } else if ($clientBuzzer.state === "TakenBy" && event.key === "i") {
            openBuzzer();
        } else if (event.key === "d") {
            inDj = !inDj;
        } else if (canIncrement && event.key === "+") {
            incrementPointsWorth();
        } else if (canDecrement && event.key === "-") {
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
        {#each pointValues as p}
            <option>{p}</option>
        {/each}
    </select>

    <button on:mousedown={incrementPointsWorth}
            disabled={!canIncrement}><u>+</u></button>
    <button on:mousedown={decrementPointsWorth}
            disabled={!canDecrement}><u>-</u></button>

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
