<script lang="ts">
    import { socket } from './utils';
    import { amHost, state, contestants } from './stores';

    export let thisName: string;
    export let thisScore: number;
    let thisColor: string = "eceff4";

    $: thisScoreString = thisScore.toString();

    $: if (Object.entries($state.scores)
        .some(c => c[0] === thisName && c[1].blocked)) {
        thisColor = "ebcb8b";
    } else if ($contestants.some(c => c.name === thisName)) {
        thisColor = "88c0d0";
    } else {
        thisColor = "eceff4";
    }

    $: fontWeight = ($contestants.some(c => c.name === thisName))
        ? "bold" : "normal";

    $: style = `color:#${thisColor};font-weight:${fontWeight}`;

    function updateServerScore(): void {
        socket.send(JSON.stringify({
            action: "SetScore",
            name: thisName,
            score: parseInt(thisScoreString)
        }));
    }

    function removePlayer(): void {
        socket.send(JSON.stringify({
            action: "RemovePlayer",
            name: thisName,
        }));
    }

    function handleKeydown(e: KeyboardEvent): void {
        if (e.code == "Enter") {
            updateServerScore();
        }
    }
</script>

<span {style}>
    {thisName}:
</span>
{#if $amHost}
    <input class="hidden"
           bind:value={thisScoreString}
           on:focusout={updateServerScore}
           on:keydown={handleKeydown}
           {style}/>
    <button class="x"
            on:mousedown={removePlayer}>🞬</button>
{:else}
    <span {style}>{thisScore}</span>
{/if}
<br/>
