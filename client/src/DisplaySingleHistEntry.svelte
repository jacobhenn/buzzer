<script lang="ts">
    import { postObject } from './utils';
    import { amHost, clientHistory } from './stores';

    export let thisIndex: number;

    console.log(`displaying history entry #${thisIndex}`);

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
        postObject("/command", {
            action: "RemoveHistory",
            index: thisIndex
        })
    }

    function handleKeydown(event: { code: string }): void {
        if (event.code === "Enter") {
            updateServerHistEntry();
        }
    }
</script>

{$clientHistory[thisIndex].name}:
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
