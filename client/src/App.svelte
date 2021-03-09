<script lang="ts">
    // TODO: auto-increment pointsWorth
    //     : or separate button for every points value
    //     : or add increment button
    // TODO: keyboard shortcuts for every host action
    // TODO: answer countdown when the buzzer is open (?)
    // TODO: proper <input> instead of unicode checkmark ⟨☑⟩

    import {
        clientBuzzer, clientScores, inSetup,
        contestants, amHost, serverDown, marker
    } from './stores';

    import { fetchObject } from './utils';

    import type { Player, Buzzer } from './types';

    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';

    async function updateClientState() {
        let newBuzzer: Buzzer;
    
        await fetchObject<Buzzer>("/state/buzzer").then(res => newBuzzer = res);

        if (newBuzzer.state !== $clientBuzzer.state) {
            $contestants.map(contestant => {
                fetch(`/blocked/${contestant.name}`)
                    .then(res => res.text())
                    .then(res => contestant.blocked = (res === "!"));
            });
            $contestants = $contestants;
            $clientBuzzer = newBuzzer;
        }

        await fetchObject<Player[]>("/state/scores")
            .then(res => $clientScores = res)

    }

    async function checkMarker() {
        let newMarker: string;
        await fetch("/marker")
            .then(res => res.text())
            .then(res => { newMarker = res; $serverDown = false })
            .catch(err => $serverDown = true);

        if (newMarker !== $marker) {
            updateClientState();
            $marker = newMarker;
        }
    }

    setInterval(checkMarker, 50);
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

<div id="footer">v1.0.0</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
