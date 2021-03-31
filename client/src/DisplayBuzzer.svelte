<script lang="ts">
    import { closeMsg, closeCode, serverDown, contestants, state, amHost } from './stores';

    $: ownerHere = $contestants.some(c => c.name === $state.buzzer.owner);
</script>

<div id="topbar"
    class:ownerHere
    class:serverDown={$serverDown}
    class={$state.buzzer.state}></div>
<div id="state"
    class:ownerHere
    class:serverDown={$serverDown}
    class={$state.buzzer.state}>
    {#if $serverDown}
        the server has closed the connection ({$closeCode})
        {$closeMsg}
    {:else if $state.buzzer.state === "Closed"}
        the buzzer is closed
    {:else if $state.buzzer.state === "Open"}
        the buzzer is open
    {:else}
        {$state.buzzer.owner} has buzzed in
    {/if}
</div>

{#if $state.buzzer.state === "Open"}
    {#each $contestants as c}
        {#if $state.scores[c.name].blocked}
            <div style="color:#ebcb8b">
                <strong style="color:#ebcb8b">{c.name}</strong>
                has already buzzed in
            </div>
        {/if}
    {/each}
    {#each $contestants.filter(c => c.buzzKey === "Click"
                                 && !$state.scores[c.name].blocked) as c}
        <strong style="color:#a3be8c">{c.name},</strong>
        <span style="color:#a3be8c">click or tap anywhere to buzz in</span>
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
        transition: 0s;
    }

    #topbar.serverDown {
        background-color: #d08770;
    }

    #topbar.Open {
        background-color: #a3be8c;
        width: 0%;
        transition: width 5s linear;
    } #topbar.Closed {
        background-color: #bf616a;
    } #topbar.TakenBy {
        background-color: #bf616a;
    } #topbar.TakenBy.ownerHere {
        background-color: #88c0d0;
    }

    #state {
        font-weight: bold;
        margin-top: 20px;
    }

    #state.serverDown {
        color: #d08770;
    }

    #state.Open {
        color: #a3be8c;
    } #state.Closed {
        color: #bf616a;
    } #state.TakenBy {
        color: #bf616a;
    } #state.TakenBy.ownerHere {
        color: #88c0d0;
    }
</style>
