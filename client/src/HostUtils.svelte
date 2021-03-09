<script lang="ts">
    import { clientBuzzer, pointsWorth } from './stores';
    import { postObject } from './utils';

    let pointValues = [200, 400, 600, 800, 1000, 1200, 1600, 2000];
    let indexOrder = [0, 1, 2, 3, 4, 1, 3, 5, 7];
    let outerIndex = 0;
    $: pointsWorthIndex = indexOrder[outerIndex];
    $: $pointsWorth = pointValues[pointsWorthIndex];

    function incrementPointsWorth(): void {
        outerIndex = (outerIndex  + 1) % 10;
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
    </select><br/>
    <button class="large" on:mousedown={openBuzzer}><u>o</u>pen buzzer</button>
{:else if $clientBuzzer.state === "TakenBy"}
    is <strong>{$clientBuzzer.owner}</strong>
    <button on:mousedown={correct}><u>c</u>orrect</button> or
    <button on:mousedown={openBuzzer}><u>i</u>ncorrect</button>?
{/if}
