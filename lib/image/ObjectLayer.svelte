<script lang="ts">
    import type { Shape } from '../types';
    import { draw } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    export let shapes: Shape[] = [];

    let colors = ['green', 'red', 'blue', 'purple'];
</script>

{#each shapes as shape, index}
    {@const color = colors[index % 4]}

    <polyline
        points="{shape.poly.map(v => `${v.x},${v.y}`).join(' ')} {shape.poly[0].x},{shape.poly[0].y}"
        fill="white"
        fill-opacity="0.2"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        stroke="{color}"
        in:draw={{ duration: 600, delay: 300, easing: quintOut }}
    />
    <text x={shape.poly[0].x + 2} y={shape.poly[0].y + 16} fill="{color}" font-size="16">{shape.label}</text>
{/each}
