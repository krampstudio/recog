<script lang="ts">
    import RecogWidget from '../lib/RecogWidget.svelte';

    //generate API URL statically
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=`
</script>

<h1 class="text-center text-xl" >Demo application for the Recog Widget</h1>
<div class="w-screen max-w-[50%] my-6 mx-auto" >
    <RecogWidget {apiUrl} />
</div>
