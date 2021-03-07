<script lang="ts">
    import { clientBuzzer, clientScores, inSetup, contestants, amHost }
        from './stores';
    import { fetchObject } from './utils';

    import type { Player, Buzzer } from './types';

    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';

    async function updateClientBuzzer() {
        let newBuzzer: Buzzer;
    
        await fetchObject<Buzzer>("/state/buzzer").then(res => newBuzzer = res);

        if (newBuzzer.state !== $clientBuzzer.state) {
            $contestants.map(contestant =>
                fetch(`/blocked/${contestant.name}`)
                    .then(res => res.text())
                    .then(res => contestant.blocked = (res === "!"))
            );
            $contestants = $contestants;
            $clientBuzzer = newBuzzer;
        }

    }

    async function updateClientScores() {
        await fetchObject<Player[]>("/state/scores")
            .then(res => $clientScores = res)
    }

    // should be 50ms
    setInterval(updateClientBuzzer, 100);
    // should be 500ms
    setInterval(updateClientScores, 500);
</script>

{#if $inSetup}
    <Setup/>
{:else}
    <DisplayBuzzer/>
    <SelectBuzzKeys/>
    {#if $amHost}
        <HostUtils/>
    {/if}
    <DisplayScores/>
{/if}

<div id="footer">v0.1.4</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
