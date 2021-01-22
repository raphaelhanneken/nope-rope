import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        gridSize: 50,
        refreshRate: 180,
    }
});

export default app;
