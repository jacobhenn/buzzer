<script lang="ts">
    import type { Contestant } from './types';
    import { buzz, buzzKeys } from './utils';

    export let contestant: Contestant;

    document.addEventListener("keydown", function(event) {
        if (event.code === contestant.buzzKey && !contestant.blocked)
            buzz(contestant.name);
    });

    function defocus() {
        let elem: HTMLElement = document.activeElement as HTMLElement;
        elem.blur();
    }
</script>

<select bind:value={contestant.buzzKey} on:change={defocus}>
    {#each buzzKeys as buzzKey}
        <option value={buzzKey.code}>
            {buzzKey.name}
        </option>
    {/each}
</select>
