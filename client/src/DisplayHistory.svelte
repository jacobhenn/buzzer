<script lang="ts">
    import { clientHistory, amHost, inHistory } from './stores';
    import DisplaySingleHistEntry from './DisplaySingleHistEntry.svelte';

    function range(start: number, end: number): number[] {
        return Array.from({ length: end - start + 1 }, (_, i) => i)
    }

    document.addEventListener("keydown", function(e) {
        if (e.key === "b") {
            $inHistory = false;
        }
    });
</script>

<hr/>
{#if $amHost}
    <span class="header">score history (click to edit)</span><br/>
{:else}
    <span class="header">score history</span><br/>
{/if}
<button on:click={() => $inHistory = false}>
    ← <u>b</u>ack to current scores
</button><br/>

<div style="text-align:right;display:inline-block">
{#each range(0, $clientHistory.length-1) as i}
    <DisplaySingleHistEntry thisIndex={i}/><br/>
{/each}
</div>
