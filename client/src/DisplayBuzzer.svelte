<script lang="ts">
    import { closeMsg, closeCode, contestants, state, clientState } from './stores';
    import { ClientState } from './types';

    $: ownerHere = $contestants.some(c => c.name === $state.buzzer.owner);

    function formatCloseCode(code: number): string {
        if (code === 1000) return "normal"
        else if (code === 1001) return "shut down"
        else if (code === 1002) return "protocol"
        else if (code === 1003) return "unsuppourted data"
        else if (code === 1006) return "abnormal"
        else if (code === 1008) return "policy"
        else if (code === 1009) return "size"
        else return code.toString()
    }
</script>

<div id="topbar"
    class:ownerHere
    class={$state.buzzer.state}
    class:serverDown={$clientState === ClientState.Over}></div>
<div id="state"
    class:ownerHere
    class={$state.buzzer.state}
    class:serverDown={$clientState === ClientState.Over}>
    {#if $clientState === ClientState.Over}
        the server has closed the connection
        ({formatCloseCode($closeCode)})<br/>
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
{#if $clientState === ClientState.Contestant || $clientState === ClientState.Operator}
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

    #topbar.serverDown {
        background-color: #b48ead;
        width: 100%;
    }

    #state {
        font-weight: bold;
        margin-top: 20px;
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

    #state.serverDown {
        color: #b48ead;
    }
</style>
