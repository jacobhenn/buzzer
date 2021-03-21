<script lang="ts">
    import { contestants, amHost, inSetup, state } from './stores';
    import { postObject, buzzKeys } from './utils';
    import type { Contestant } from './types';

    let buzzKeyIndex = $contestants.length;

    function addContestant(): void {
        $contestants =
            [...$contestants,
             { name: "", blocked: false, buzzKey:
                 buzzKeys[buzzKeyIndex].code
             }
            ];
        buzzKeyIndex++;
    }

    function removeContestant(): void {
        $contestants.pop();
        $contestants = $contestants;
        buzzKeyIndex--;
    }

    function play(): void {
        for (var c of $contestants) {
            c.name = c.name.trim();
        }

        $contestants = $contestants.filter(c => !!c.name);

        for (const c of $contestants) {
            postObject("/command", {
                action: "AddPlayer",
                name: c.name
            });
        };

        $inSetup = false;
    }

    $: dup = $contestants.some((c: Contestant) =>
        Object.entries($state.scores).some((p: [string, { score: number }]) =>
            p[0] === c.name
        )
    );
</script>

contestant(s), enter your name(s)<br/>
<strong style="color:#88c0d0">hosts do not need to enter their names</strong>
<hr/>

{#each $contestants as contestant}
    <input bind:value={contestant.name} placeholder="enter your name"/>
    <br/>
{/each}

<button on:mousedown={addContestant}>add contestant</button>
<button on:mousedown={removeContestant}
        disabled={$contestants.length === 0}>remove contestant</button>
{#if dup}
    <br/><strong id="dup">some of these names are taken</strong>
{/if}

<hr/>
does this device need host access?<br/>
<button on:mousedown={() => $amHost = !$amHost}>
    {$amHost ? "☑" : "☐"}
    host access
</button>

<hr/>
<button class="large" on:mousedown={play} disabled={dup}>play</button>

<style>
    #dup {
        color: #bf616a;
    }
</style>
