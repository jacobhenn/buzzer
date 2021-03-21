<script lang="ts">
    import { postObject } from './utils';
    import { amHost, state } from './stores';

    export let thisIndex: number;

    $: thisScore = $state.history[thisIndex].score;
    $: thisScoreString = thisScore.toString();

    function updateServerHistEntry(): void {
        postObject("/command", {
            action: "EditHistory",
            index: thisIndex,
            score: parseInt(thisScoreString)
        });
    }

    function removeHistEntry(): void {
        postObject("/command", {
            action: "RemoveHistory",
            index: thisIndex
        });
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
{$state.history[thisIndex].name}:
{#if $amHost}
    <input class="hidden"
           bind:value={thisScoreString}
           on:blur={updateServerHistEntry}
           on:keydown={handleKeydown}/>
    <button class="x"
            on:mousedown={removeHistEntry}>🞬</button>
{:else}
    {thisScore}
{/if}

<style>
    span.time {
        color: #4c566a;
    }
</style>
