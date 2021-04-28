<script>
    import {onDestroy} from "svelte";
    import Log from "./Log.js"

    export let visible;

    var parsedLogContent = "";

    const unsubscribe = Log.logEntries.subscribe(logEntries => {
        parsedLogContent = "";

        logEntries.forEach(logEntry => {
            parsedLogContent += "<br/>" + logEntry.time + " - " + logEntry.message;
        })
    });

    onDestroy(unsubscribe);
</script>

{#if visible}
    <div>
        {@html parsedLogContent}
    </div>
{/if}
