/**
 * @license MIT
 * @author Bertrand Chevrier
 */
import Demo from './Demo.svelte';
import './index.css';

/**
 * Demo application entry point
 */
new Demo({
    target: document.querySelector('body > main')
});
