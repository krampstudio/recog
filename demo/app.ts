import Demo from './Demo.svelte';
import './index.css';

console.log(import.meta.env.MODE);
console.log(import.meta.env.RECOG_VISION_API_URL);

new Demo({
    target: document.querySelector('main')
});
