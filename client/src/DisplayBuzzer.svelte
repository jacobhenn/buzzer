<script lang="ts">
    // fix
    import { contestants, clientBuzzer } from './stores';

    let buzzerColor: string;
    let buzzerText: string;

    $: switch ($clientBuzzer.state) {
        case "Closed":
            buzzerColor = "bf616a";
            buzzerText = "the buzzer is closed";
            break;
        case "Open":
            buzzerColor = !$contestants.every(c =>
                c.blocked
            ) ? "a3be8c" : "ebcb8b";
            buzzerText = "the buzzer is open";
            break;
        case "TakenBy":
            buzzerColor = $contestants.some(c =>
                c.name === $clientBuzzer.owner
            ) ? "88c0d0" : "bf616a";
            buzzerText = `${$clientBuzzer.owner} has buzzed in`;
            break;
    }
</script>

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
{/if}

<style>
    #topbar {
        height: 20px;
        width: 100%;
    }

    #state {
        font-weight: bold;
        margin-top: 20px;
    }
</style>
