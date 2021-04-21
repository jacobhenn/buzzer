<script lang="ts">
    import { contestants, clientState, state } from './stores';
    import { socket, buzzKeys } from './utils';

    import { ClientState } from './types';

    let amHost = false;

    let buzzKeyIndex = $contestants.length;

    function addContestant(): void {
        $contestants =
            [...$contestants,
             { name: "", buzzKey:
                 buzzKeys[buzzKeyIndex].code,
               added: false
             }
            ];
        buzzKeyIndex++;
    }

    function removeContestant(name: string): void {
        for (let i = 0; i<$contestants.length; i++) {
            if ($contestants[i].name === name) {
                $contestants.splice(i, 1);
                $contestants = $contestants;
                buzzKeyIndex--;

                if ($contestants[i].added) {
                    socket.send(JSON.stringify({
                        action: "RemovePlayer",
                        name: $contestants[i].name
                    }))
                }

                break;
            }
        }
    }

    function play(): void {
        for (var c of $contestants) {
            c.name = c.name.trim();
        }

        $contestants = $contestants.filter(c => c.name.length > 0);

        for (const c of $contestants) {
            if (!c.added) {
                socket.send(JSON.stringify({
                    action: "AddPlayer",
                    name: c.name
                }));

                c.added = true;
            }
        };

        $clientState = amHost ? ClientState.Host : ClientState.Contestant;
    }

    $: externDups = $contestants.filter(c => Object.entries($state.scores)
        .some((p: [string, { score: number }]) => p[0] === c.name) && !c.added
    );
</script>

contestant(s), enter your name(s)<br/>
<strong style="color:#88c0d0">hosts do not need to enter their names</strong>
<hr/>

{#each $contestants as c}
    <input bind:value={c.name}
           disabled={c.added}
           placeholder="enter your name" maxlength="30"/>
    <button class="remove"
            title="remove contestant"
            on:click={() => removeContestant(c.name)}>🞬</button>
    <br/>
{/each}

<button on:mousedown={addContestant}>add contestant</button>

<br/>
{#each externDups as d}
    <span class="dup">someone else is already named "{d.name}"</span>
{/each}

<hr/>
does this device need host access?<br/>
<button on:mousedown={() => amHost = !amHost}>
    {amHost ? "☑" : "☐"}
    host access
</button>

<hr/>
<button class="large" on:mousedown={play}
        disabled={externDups.length > 0}>play</button>

<button id="operator" on:mousedown={() => {
    $contestants = [];
    $clientState = ClientState.Operator;
}}>operator</button>

<style>
    .dup {
        color: #bf616a;
    }

    button.remove {
        color: #bf616a;
        background-color: #2e3440;
        margin: 0px;
        padding: 0px;
    }

    button#operator {
        opacity: 0;
        font-size: 15pt;
        position: fixed;
        bottom: 0px;
        left: 0px;
    }

    button#operator:hover {
        opacity: 1;
    }
</style>
