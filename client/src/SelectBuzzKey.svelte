<script lang="ts">
    import type { Contestant } from './types';
    import { buzzKeys } from './utils';
    import { contestants } from './stores';

    export let contestant: Contestant;

    function defocus() {
        let elem: HTMLElement = document.activeElement as HTMLElement;
        elem.blur();
    }
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select bind:value={contestant.buzzKey} on:change={defocus}>
    {#each buzzKeys as buzzKey}
        <option value={buzzKey.code}>
            {buzzKey.name}
        </option>
    {/each}
    {#if !$contestants.some(c => c.name !== contestant.name
                              && c.buzzKey === "Click")}
        <option value="Click">Tap/Click</option>
    {/if}
</select>
