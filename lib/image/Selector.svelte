<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let dragover = false;

    const dispatch = createEventDispatcher();

    function handleDrop(e: DragEvent){
        if (e.dataTransfer?.files[0]) {
            dispatch('filechange', e.dataTransfer.files[0]);
        }
    }

    function fileChange(e: Event){
        if (e.target?.files[0]) {
            dispatch('filechange', e.target.files[0]);
        }
    }
</script>
<label class="mb-2 block">
    <span class="text-gray-700 block">Select an image:</span>
    <input class="text-gray-700" type="file" accept="image/*" name="file-select" on:change={fileChange}/>
</label>
<div
    class="w-full h-32 border-dashed border-2 border-blue-600 rounded flex items-center justify-center text-blue-700"
    class:border-blue-300={dragover}
    on:dragover|preventDefault={() => dragover = true}
    on:dragenter={() => dragover = true}
    on:dragleave={() => dragover = false}
    on:dragend={() => dragover = false}
    on:drop|preventDefault={handleDrop}>
    <span>or drop your file here</span>
</div>
