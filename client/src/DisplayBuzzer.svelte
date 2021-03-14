<script lang="ts">
    import {
        contestants, clientBuzzer,
        clientScores, serverDown
    } from './stores';

    import { buzz } from './utils'

    let buzzerColor: string;
    let buzzerText: string;

    $: if ($serverDown) {
        buzzerColor = "d08770";
        buzzerText = "couldn't reach server";
    } else if ($clientBuzzer.state == "Closed") {
        buzzerColor = "bf616a";
        buzzerText = "the buzzer is closed";
    } else if ($clientBuzzer.state == "Open") {
        buzzerColor = (!$contestants.every(c => c.blocked)
            || $contestants.length === 0)
            ? "a3be8c" : "ebcb8b";
        buzzerText = "the buzzer is open";
    } else if ($clientBuzzer.state == "TakenBy") {
        buzzerColor = $contestants.some(c => c.name === $clientBuzzer.owner)
            ? "88c0d0" : "bf616a";
        buzzerText = `${$clientBuzzer.owner} has buzzed in`;
    }

    function handleClick(): void {
        let c = $contestants[0];
        if ($clientBuzzer.state == "Open" && !c.blocked) {
            buzz(c.name);
        }
    }
</script>

<span id="buzzer-container" on:click={handleClick}>
    <div id="topbar" style={`background-color:#${buzzerColor}`}></div>
    <div id="state" style={`color:#${buzzerColor}`}>{buzzerText}</div>
    {#if $clientBuzzer.state === "Open"}
        {#each $contestants as c}
            {#if c.blocked}
                <div style="color:#ebcb8b">
                    <strong style="color:#ebcb8b">{c.name}</strong> has already buzzed in
                </div>
            {/if}
        {/each}
    {/if}
</span>

<style>
    #topbar {
        height: 20px;
        width: 100%;
    }

    #state {
        font-weight: bold;
        margin-top: 20px;
    }

    #buzzer-container {
        margin: none;
        padding: none;
    }
</style>
