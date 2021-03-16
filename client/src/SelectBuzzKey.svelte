<script lang="ts">
    import type { Contestant } from './types';
    import { buzz, buzzKeys } from './utils';
    import { contestants } from './stores';

    export let contestant: Contestant;

    function defocus() {
        let elem: HTMLElement = document.activeElement as HTMLElement;
        elem.blur();
    }

    function clickBuzz(event: MouseEvent): void {
        let eventTarget = event.target as HTMLElement;
        let eventSrcElement = event.srcElement as HTMLElement;

        let forbiddenElements = ["INPUT", "BUTTON", "SELECT"];

        if (forbiddenElements.includes(eventTarget.tagName)) { return; }
        if (forbiddenElements.includes(eventSrcElement.tagName)) { return; }

        for (const contestant of $contestants) {
            if (contestant.buzzKey === "Click") {
                buzz(contestant);
            }
        }
    }
</script>

<svelte:window on:mousedown={clickBuzz} on:keydown={keyBuzz}/>

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
