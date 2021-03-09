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
        $clientScores = $clientScores.filter(s => s.name !== thisName)
    
        postObject("/command", {
            action: "RemovePlayer",
            name: thisName,
        });
    }

    function handleKeydown(event): void {
        console.trace(event.code);

        if (event.code == "Enter") {
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
    <button class="hidden"
            on:mousedown={removePlayer}>🞬</button>
{:else}
    {thisScore}
{/if}<br/>
