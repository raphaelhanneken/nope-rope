<script lang="ts">
    import type Direction from './Direction';
    import Grid from './Grid.svelte';
    import Point from './Point';
    import Snake from './Snake';

    export let gridSize: number;
    export let refreshRate: number;

    let direction: Direction = { x: 1, y: 0 };
    let snake: Snake = new Snake(new Point(Math.floor(gridSize / 2), Math.floor(gridSize / 2)), direction);

    const handleKeydown = (e: KeyboardEvent) => {
        switch (e.key) {
        case 'ArrowLeft':
            direction.x = -1;
            direction.y = 0;
            break;
        case 'ArrowRight':
            direction.x = 1;
            direction.y = 0;
            break;
        case 'ArrowUp':
            direction.x = 0;
            direction.y = -1;
            break;
        case 'ArrowDown':
            direction.x = 0;
            direction.y = 1;
            break;
        }

        snake.direction = direction;
    }
</script>

<main>
    <Grid size={gridSize} snake={snake} refreshRate={refreshRate} />
</main>

<svelte:window on:keydown={handleKeydown} />
