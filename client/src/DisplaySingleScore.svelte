<script lang="ts">
    import { postObject } from './utils';
    import { amHost, clientScores } from './stores';

    export let thisName: string;
    export let thisScore: number;

    $: thisScoreString = thisScore.toString();

    function updateServerScore(): void {
        postObject("/command", {
            action: "SetScore",
            name: thisName,
            score: parseInt(thisScoreString)
        });
    }

    function removePlayer(): void {
        // immediately remove from client so change appears immediate
        delete $clientScores[thisName];
    
        postObject("/command", {
            action: "RemovePlayer",
            name: thisName,
        });
    }

    function handleKeydown(e: KeyboardEvent): void {
        if (e.code == "Enter") {
            updateServerScore();
        }
    }
</script>

{thisName}:
{#if $amHost}
    <input class="hidden"
           bind:value={thisScoreString}
           on:focusout={updateServerScore}
           on:keydown={handleKeydown}/>
    <button class="x"
            on:mousedown={removePlayer}>🞬</button>
{:else}
    {thisScore}
{/if}<br/>
