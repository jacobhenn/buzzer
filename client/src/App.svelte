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
        await fetchObject<Buzzer>("/state/buzzer").then(res => {
            if (res.state !== $clientBuzzer.state) {
                console.log(res);
                console.log($clientBuzzer);
                $clientBuzzer = res;
            }
        });

        await fetchObject<Player[]>("/state/scores")
            .then(res => {
                $clientScores = res;
                $contestants.map(c => c.blocked = $clientScores[c.name].blocked);
            });

        await fetchObject<HistEntry[]>("/state/history")
            .then(res => $clientHistory = res);
    }

    async function checkMarker() {
        let newMarker: number;
        await fetch("/marker")
            .then(res => res.arrayBuffer())
            .then(x => new Uint8Array(x))
            .then(x => { newMarker = x[0]; $serverDown = false })
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

<div id="footer">v2.2.2</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
