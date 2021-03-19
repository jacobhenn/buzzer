<script lang="ts">
    import { state, amHost, inHistory } from './stores';
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
{#each Object.entries($state.scores).sort((a, b) => a[1].score - b[1].score).reverse()
    as player (player[0])}
    <DisplaySingleScore thisName={player[0]} thisScore={player[1].score}/>
{/each}
</div>
