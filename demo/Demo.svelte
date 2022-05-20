<script lang="ts">
    import RecogWidget from '../lib/RecogWidget.svelte';
    import config from './config.json';

    let error: Error;
    if (!config.api.key) {
        error = new Error('Please setup your Vision API key first');
    }

    //generate API URL statically
    const apiUrl = `${config.api.url}?key=${config.api.key}`;
</script>

<h1 class="text-center text-xl">Demo application for the Recog Widget</h1>
<div class="w-screen max-w-[50%] my-6 mx-auto">
    {#if error}
        <p class="text-red">{error.message}</p>
    {:else}
        <RecogWidget {apiUrl} />
    {/if}
</div>
