<script lang="ts">
    import { clientBuzzer, pointsWorth } from './stores';
    import { postObject } from './utils';

    let pointsWorthString: string;

    $: $pointsWorth = parseInt(pointsWorthString);

    function endRound(): void {
        // change client so response appears immediate
        $clientBuzzer.state === "Closed";

        postObject("/command", {
            action: "EndRound"
        });
    }

    function correct(): void {
        console.table([$clientBuzzer.owner, $pointsWorth]);
    
        postObject("/command", {
            action: "AddScore",
            name: $clientBuzzer.owner,
            score: $pointsWorth
        });

        endRound();
    }

    function openBuzzer(): void {
        // change client so response appears immediate
        $clientBuzzer.state === "Open";

        postObject("/command", {
            action: "OpenBuzzer"
        });
    }
</script>

<hr/>
<span class="header">host commands</span><br/>

{#if $clientBuzzer.state === "Open"}
    <button class="large" on:mousedown={endRound}>end round early</button>
{:else if $clientBuzzer.state === "Closed"}
    this question is worth
    <select bind:value={pointsWorthString}>
        <option value=200>200</option>
        <option value=400>400</option>
        <option value=600>600</option>
        <option value=800>800</option>
        <option value=1000>1000</option>
        <option value=1200>1200</option>
        <option value=1600>1600</option>
        <option value=2000>2000</option>
    </select>
    points (click to change)<br/><br/>
    <button class="large" on:mousedown={openBuzzer}>open buzzer</button>
{:else if $clientBuzzer.state === "TakenBy"}
    is <strong>{$clientBuzzer.owner}</strong>
    <button on:mousedown={correct}>correct</button> or
    <button on:mousedown={openBuzzer}>incorrect</button>?
{/if}
