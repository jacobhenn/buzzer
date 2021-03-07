<script lang="ts">
    import { contestants } from './stores';

    import SelectBuzzKey from './SelectBuzzKey.svelte';

    $: keys = $contestants.map(p => p.buzzKey);
    $: dups = keys.length !== new Set(keys).size;

    $: console.table(keys);
</script>

{#if $contestants.length !== 0}
    <hr/>
    <span class="header">buzz keys (click to change)</span><br/>
{/if}

{#each $contestants as c}
    {c.name}:
    <SelectBuzzKey bind:contestant={c}/><br/>
{/each}

{#if dups}
    <strong style="color:#ebcb8b">
        some players have the same buzz key
    </strong><br/>
{/if}
