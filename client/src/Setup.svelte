<script lang="ts">
    import { contestants, amHost, inSetup } from './stores';
    import { postObject } from './utils';

    function addContestant(): void {
        $contestants =
            [...$contestants,
             { name: "", blocked: false, buzzKey: "Space" }
            ];
    }

    function removeContestant(): void {
        $contestants.pop();
        $contestants = $contestants;
    }

    function play(): void {
        $contestants = $contestants.filter(c => !!c.name);
        $contestants.map(c =>
            postObject("/command", {action: "AddPlayer", /* blocked: false, */ name: c.name } )
        );
        $inSetup = false;
    }
</script>

contestant(s), enter your name(s)<br/>
(hosts do not need to enter their names)
<hr/>

{#each $contestants as contestant}
    <input bind:value={contestant.name} placeholder="enter your name"/>
    <br/>
{/each}

<button on:mousedown={addContestant}>add contestant</button>
<button on:mousedown={removeContestant}
        disabled={$contestants.length === 0}>remove contestant</button>

<hr/>
does this device need host access?<br/>
<button on:mousedown={() => $amHost = !$amHost}>
    {$amHost ? "☑" : "☐"}
    host access
</button>

<hr/>
<button class="large" on:mousedown={play}>play</button>
