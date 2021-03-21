<script lang="ts">
    import { contestants, state, serverDown, amHost } from './stores';

    let buzzerColor: string;
    let buzzerText: string;

    $: if ($serverDown) {
        buzzerColor = "d08770";
        buzzerText = "couldn't reach server";
    } else if ($state.buzzer.state == "Closed") {
        buzzerColor = "bf616a";
        buzzerText = "the buzzer is closed";
    } else if ($state.buzzer.state == "Open") {
        buzzerColor = (!$contestants.every(c => c.blocked)
            || $contestants.length === 0)
            ? "a3be8c" : "ebcb8b";
        buzzerText = "the buzzer is open";
    } else if ($state.buzzer.state == "TakenBy") {
        buzzerColor = $contestants.some(c => c.name === $state.buzzer.owner)
            ? "88c0d0" : "bf616a";
        buzzerText = `${$state.buzzer.owner} has buzzed in`;
    }
</script>

<div id="topbar" style={`background-color:#${buzzerColor}`}></div>
<div id="state" style={`color:#${buzzerColor}`}>{buzzerText}</div>
{#if $state.buzzer.state === "Open"}
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
        <strong style="color:#a3be8c">{c.name}</strong>
        <span style="color:#a3be8c">, click or tap anywhere to buzz in</span>
    {/each}
{/if}
{#if !$amHost}
    <br/>
    <span id="ptsworth">
        for <strong>{$state.ptsworth}</strong> points
    </span>
{/if}

<style>
    #topbar {
        height: 20px;
        width: 100%;
        margin: none;
        padding: none;
    }

    #state {
        font-weight: bold;
        margin-top: 20px;
    }
</style>
