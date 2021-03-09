<script lang="ts">
    // TODO: auto-increment pointsWorth
    //     : or separate button for every points value
    //     : or add increment button
    // TODO: keyboard shortcuts for every host action
    // TODO: answer countdown when the buzzer is open (?)
    // TODO: proper <input> instead of unicode checkmark ⟨☑⟩

    import {
        clientBuzzer, clientScores, inSetup,
        contestants, amHost, serverDown
    } from './stores';

    import { fetchObject } from './utils';

    import type { Player, Buzzer } from './types';

    import SelectBuzzKeys from './SelectBuzzKeys.svelte';
    import DisplayBuzzer  from './DisplayBuzzer.svelte';
    import DisplayScores  from './DisplayScores.svelte';
    import HostUtils      from './HostUtils.svelte';
    import Setup          from './Setup.svelte';

    async function updateClientBuzzer() {
        console.log("updating buzzer");

        let newBuzzer: Buzzer;
    
        await fetchObject<Buzzer>("/state/buzzer")
            .then(res => { newBuzzer = res; $serverDown = false })
            .catch(err => $serverDown = true);

        if (newBuzzer.state !== $clientBuzzer.state) {
            console.log(`the state changed from ${$clientBuzzer.state} to ${newBuzzer.state}`);
            $contestants.map(contestant => {
                fetch(`/blocked/${contestant.name}`)
                    .then(res => res.text())
                    .then(res => contestant.blocked = (res === "!"));
                console.log(`${contestant.name}.blocked == ${contestant.blocked}`)
            });
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

<div id="footer">v0.1.10</div>

<style>
    #footer {
        color: #3b4252;
        font-size: 15pt;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>
