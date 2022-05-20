<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    export let width = 100;
    export let height = 100;
    export let src: string;

    const lineY = tweened(0, {
        duration: 3000,
        easing: cubicOut,
    });
    $lineY = height;
</script>

<svg
    width="100%"
    height="100%"
    viewBox="0 0 {width} {height}"
    xmlns="http://www.w3.org/2000/svg"
>
    <image href={src} width="100%" height="100%" />

    <slot />
</svg>
