<script lang="ts">
    import { postObject } from './utils';
    import { amHost, clientHistory } from './stores';

    export let thisIndex: number;

    $: thisScore = $clientHistory[thisIndex].score;
    $: thisScoreString = thisScore.toString();

    function updateServerHistEntry(): void {
        postObject("/command", {
            action: "EditHistory",
            index: thisIndex,
            score: parseInt(thisScoreString)
        });
    }

    function removeHistEntry(): void {
        // remove the entry immediately on the client side to appear seamless
        delete $clientHistory[thisIndex];
        $clientHistory = $clientHistory;

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
    {$clientHistory[thisIndex].time[0].toString().padStart(2, "0")}:{$clientHistory[thisIndex].time[1].toString().padStart(2, "0")}
</span>
{$clientHistory[thisIndex].name}:
{#if $amHost}
    <input class="hidden"
           bind:value={thisScoreString}
           on:blur={updateServerHistEntry}
           on:keydown={handleKeydown}/>
    {#if $clientHistory[thisIndex].score !== 0}
        <button class="x"
                on:mousedown={removeHistEntry}>🞬</button>
    {:else}
        <button class="x" disabled> </button>
    {/if}
{:else}
    {thisScore}
{/if}

<style>
    span.time {
        color: #4c566a;
    }
</style>
