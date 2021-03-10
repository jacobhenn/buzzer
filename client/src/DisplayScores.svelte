<script lang="ts">
    import { clientScores, amHost, inHistory } from './stores';
    import DisplaySingleScore from './DisplaySingleScore.svelte';

    document.addEventListener("keydown", function(e) {
        if (e.key === "h") {
            $inHistory = true;
        }
    });
</script>

<hr/>
{#if $amHost}
    <span class="header">scores (click to edit)</span><br/>
{:else}
    <span class="header">scores</span><br/>
{/if}
<button on:click={() => $inHistory = true}>
    view score <u>h</u>istory
</button>
<br/>

<div style="text-align:right;display:inline-block">
{#each $clientScores as player (player.name)}
    <DisplaySingleScore thisName={player.name} thisScore={player.score}/>
{/each}
</div>
