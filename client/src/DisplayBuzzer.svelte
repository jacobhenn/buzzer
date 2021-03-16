<script lang="ts">
    import { contestants, clientBuzzer, serverDown } from './stores';

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
</script>

<span id="buzzer-container">
    <div id="topbar" style={`background-color:#${buzzerColor}`}></div>
    <div id="state" style={`color:#${buzzerColor}`}>{buzzerText}</div>
    {#if $clientBuzzer.state === "Open"}
        {#each $contestants as c}
            {#if c.blocked}
                <div style="color:#ebcb8b">
                    <strong style="color:#ebcb8b">{c.name}</strong>
                    has already buzzed in
                </div>
            {/if}
        {/each}
        {#each $contestants.filter(c => c.buzzKey === "Click"
                                     && !c.blocked) as c}
            <strong style="color:#a3be8c">{c.name}</strong>,
            <span style="color:#a3be8c">click or tap anywhere to buzz in</span>
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
