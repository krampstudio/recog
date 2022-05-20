<script lang="ts">
    import type { Shape, Size } from './types';

    import { onDestroy } from 'svelte';
    import {
        Selector,
        ImageWrapper,
        ObjectLayer,
        ProcessingLayer
    } from './image';
    import { State, stateStore } from './stateStore';
    import visionProcessor from './processor/vision';

    export let apiUrl;

    let objectUrl: string;
    let file: File;
    let size: Size;
    let shapes: Shape[] = [];
    let error: Error;

    /**
     * Change the state to error
     * @param {Error} err
     */
    function handleError(err: Error) {
        window.console.error(err);
        error = err;
        $stateStore = State.error;
    }

    /**
     * get the natural image size
     * @param {string} imageSrc
     * @returns {Promise<Size>}
     */
    function getImageSize(imageSrc: string): Promise<Size> {
        const imageElement = new Image();
        return new Promise((resolve, reject) => {
            imageElement.src = imageSrc;
            imageElement.onload = () =>
                resolve({
                    width: imageElement.naturalWidth,
                    height: imageElement.naturalHeight
                });
            imageElement.onerror = err => reject(err);
        });
    }

    /**
     * Preview the selected image
     * @param {CustomEvent} e
     */
    async function preview(e: CustomEvent) {
        try {
            file = e.detail;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            objectUrl = URL.createObjectURL(file);

            size = await getImageSize(objectUrl);
            if (size.width < 100 || size.height < 100) {
                throw new Error('The selected image is too small (min 100x100)');
            }
            //TODO check API restricitions
            if (size.width > 3000 || size.height > 3000) {
                throw new Error('The selected image is too big (max 3000x3000)');
            }

            $stateStore = State.selected;
        } catch (err: Error) {
            handleError(err);
        }
    }

    /**
     * Start the processing
     */
    function startProcessing() {
        $stateStore = State.processing;

        //wait at least 2s for the fake scanning effect
        Promise.all([
            visionProcessor.process(apiUrl, file, size),
            new Promise(resolve => setTimeout(resolve, 2000))
        ])
            .then(results => {
                shapes = results[0];
                if (shapes.length === 0) {
                    throw new Error('No object detected');
                } else {
                    $stateStore = State.processed;
                }
            })
            .catch(handleError);
    }

    onDestroy(() => {
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
        }
    });
</script>

<div class="w-full h-full rounded border-gray-400 border-solid border p-4">
    {#if $stateStore == State.error}
        <p class="text-center text-rose-700 text-xl">{error.message}</p>
    {/if}
    {#if $stateStore == State.initial}
        <Selector on:filechange={preview} />
    {/if}
    {#if $stateStore != State.initial}
        <ImageWrapper src={objectUrl} width={size.width} height={size.height}>
            {#if $stateStore == State.processing}
                <ProcessingLayer width={size.width} height={size.height} />
            {:else if $stateStore == State.processed}
                <ObjectLayer {shapes} width={size.width} height={size.height} />
            {/if}
        </ImageWrapper>

        <div class="mt-2">
            <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:text-gray-300 disabled:cursor-not-allowed"
                on:click={() => ($stateStore = State.initial)}
                disabled={$stateStore === State.processing}>Change image</button
            >
            <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:text-gray-300 disabled:cursor-not-allowed"
                on:click={startProcessing}
                disabled={$stateStore === State.processing || $stateStore === State.error}>Process</button
            >
        </div>
    {/if}
</div>
