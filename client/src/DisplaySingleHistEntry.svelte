<script lang="ts">
    import { socket } from './utils';
    import { amHost, state } from './stores';

    export let thisIndex: number;

    $: thisDelta = $state.history[thisIndex].delta;
    $: thisDeltaString = (thisDelta<0?"":"+") + thisDelta.toString();

    function updateServerHistEntry(): void {
        socket.send(JSON.stringify({
            action: "EditHistory",
            index: thisIndex,
            delta: parseInt(thisDeltaString)
        }));
    }

    function removeHistEntry(): void {
        socket.send(JSON.stringify({
            action: "RemoveHistory",
            index: thisIndex
        }));
    }

    function handleKeydown(event: { code: string }): void {
        if (event.code === "Enter") {
            updateServerHistEntry();
        }
    }
</script>

<span class="time">
    {$state.history[thisIndex].time[0].toString().padStart(2, "0")}:{$state.history[thisIndex].time[1].toString().padStart(2, "0")}
</span>
{$state.history[thisIndex].name}
{#if $amHost}
    <input class="hidden"
           bind:value={thisDeltaString}
           on:blur={updateServerHistEntry}
           on:keydown={handleKeydown}/>
    <button class="remove"
            on:mousedown={removeHistEntry}>🞬</button>
{:else}
    {(thisDelta<0?"":"+") + thisDelta}
{/if}

<style>
    span.time {
        color: #4c566a;
    }

    button.remove {
        color: #bf616a;
        background-color: #2e3440;
        margin: 0px;
        padding: 0px;
    }

    input.hidden {
        margin: 0px;
    }
</style>
