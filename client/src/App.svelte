<script lang="ts">
    import {
        clientBuzzer, clientScores, inSetup, clientHistory,
        contestants, amHost, serverDown, marker, inHistory
    } from './stores';

    import { fetchObject } from './utils';

    import type { Player, Buzzer, HistEntry } from './types';

    import DisplayHistory from './DisplayHistory.svelte';
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
            .then(res => $clientScores = res);

        await fetchObject<HistEntry[]>("/state/history")
            .then(res => $clientHistory = res);
    }

    async function checkMarker() {
        let newMarker: string;
        await fetch("/marker")
            .then(res => res.text())
            .then(res => { newMarker = res; $serverDown = false })
            .catch(() => $serverDown = true);

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
    {#if $inHistory}
        <DisplayHistory/>
    {:else}
        <DisplayScores/>
    {/if}
{/if}

<div id="footer">v1.2.0</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
