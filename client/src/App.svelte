<script lang="ts">
    // TODO: grab state from a single URI
    // TODO: track & display current points worth

    import {
        clientBuzzer, clientScores, inSetup, clientHistory,
        contestants, amHost, serverDown, marker, inHistory
    } from './stores';

    import { fetchObject } from './utils';

    import type { State, Buzzer, HistEntry } from './types';

    import DisplayHistory from './DisplayHistory.svelte';
    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';

    async function updateClientState() {
        await fetchObject<State>("/state").then(res => {
            $clientBuzzer = res.buzzer;
            $clientScores = res.scores;
            $clientHistory = res.history;
        });
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

    function keyBuzz(event: KeyboardEvent): void {
        for (const contestant of $contestants) {
            if (contestant.buzzKey.code === event.code) {
                buzz(contestant);
            }
        }
    }

    setInterval(checkMarker, 50);
</script>

<svelte:window on:mousedown={clickBuzz} on:keydown={keyBuzz}>

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

<div id="footer">v3.0.0</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
