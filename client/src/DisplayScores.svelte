<script lang="ts">
    import { clientScores, amHost } from './stores';
    import DisplaySingleScore from './DisplaySingleScore.svelte';
</script>

<hr/>
{#if $amHost}
    <span class="header">scores (click to edit)</span><br/>
{:else}
    <span class="header">scores</span><br/>
{/if}<br/>
<div style="text-align:right;display:inline-block">
{#each $clientScores as player (player.name)}
    <DisplaySingleScore thisName={player.name} thisScore={player.score}/>
{/each}
</div>
