<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { quadIn } from 'svelte/easing';

    export let width = 100;
    export let height = 100;

    const lineY = tweened(0, {
		duration: 1900,
		easing: quadIn
    });
    $lineY = height;
</script>

<defs>
    <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/>
    </pattern>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
    <rect width="80" height="80" fill="url(#smallGrid)"/>
    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/>
    </pattern>
</defs>

<rect width="100%" height="100%" fill="url(#grid)" />

<path d="M 0,{$lineY} H {width}"  fill="red" stroke-width="5" stroke="red" />
