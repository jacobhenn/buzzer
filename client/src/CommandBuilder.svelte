<script lang="ts">
    import { socket } from './utils';

    let cmd = {};
    let newkey = "action";
    let newval = "";

    let int = false;

    function reset(): void {
        cmd = {};
        newkey = "action";
        newval = "";
        int = false;
    }

    function send(): void {
        socket.send(JSON.stringify(cmd));
        reset();
    }

    function append(): void {
        cmd[newkey] = int ? parseInt(newval) : newval;
        newkey = "";
        newval = "";
    }
</script>

<hr/>
<u>send custom command</u><br/>
{#each Object.entries(cmd) as [key, val]}
    {key}: {val}<br/>
{/each}

<input bind:value={newkey}/>
<input bind:value={newval}/>
<button on:click={() => int = !int}>{int?"☑":"☐"} int</button>
<br/>

<button on:click={append}>add field</button>
<button on:click={reset}>reset</button>
<button on:click={send}>send</button>
