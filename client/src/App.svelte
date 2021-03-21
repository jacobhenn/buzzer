<script lang="ts">
    import {
        state, inSetup, contestants, amHost,
        serverDown, marker, inHistory
    } from './stores';

    import { fetchObject } from './utils';

    import type { State, Contestant } from './types';

    import DisplayHistory from './DisplayHistory.svelte';
    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';

    async function updateClientState() {
        await fetchObject<State>("/state").then(res => {
            $state = res;
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

    function buzz(c: Contestant): void {
        if (!$state.scores[c.name].blocked) {
            fetch('/buzz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: c.name
            });
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
            if (contestant.buzzKey === event.code) {
                buzz(contestant);
            }
        }
    }

    setInterval(checkMarker, 50);
</script>

<svelte:window on:mousedown={clickBuzz} on:keydown={keyBuzz}/>

{#if $inSetup}
    <Setup/>
{:else}
    <!--<button id="setup" on:click={() => $inSetup = true}>
        ← back to setup
    </button>-->
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

<div id="footer">v3.1.2</div>

<style>
    #footer {
        color: #4c566a;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }

    /* #setup {
        position: fixed;
        top: 0;
        left: 0;
    } */
</style>
