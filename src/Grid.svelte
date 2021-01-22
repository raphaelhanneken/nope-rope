<script lang="ts">
    import { onMount } from "svelte/internal";
    import Point from "./Point";
    import Snake from "./Snake";
    import Cell from "./Cell";

    export let size: number;
    export let refreshRate: number;
    export let snake: Snake;

    let lost: boolean = false;
    let highScore: number = parseInt(window.localStorage.getItem('highScore')) ?? 0;

    let grid: Cell[][] = [...Array(size + 1)].map(() =>
        [...Array(size + 1)].map(() => Cell.EMPTY)
    );

    $: {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] === Cell.SNAKE) {
                    grid[i][j] = Cell.EMPTY;
                }
            }
        }
        grid[snake.head.y][snake.head.x] = Cell.SNAKE;
        snake.body.forEach((value: Point) => {
            grid[value.y][value.x] = Cell.SNAKE;
        });
    }

    const randomPoint = (max: number): Point => {
        let x = Math.floor(Math.random() * Math.floor(max));
        let y = Math.floor(Math.random() * Math.floor(max));

        return new Point(x, y);
    }

    const outOfBounds = (point: Point): boolean => {
        return point.x < 0 || point.x > size || point.y < 0 || point.y > size;
    }

    const addFood = (): void => {
        let point = randomPoint(size);
        grid[point.y][point.x] = Cell.FOOD;
    }

    const tick = () => {
        snake.calculateNewHeadPosition();

        if (outOfBounds(snake.head) || snake.invalidHeadPosition()) {
            lost = true;
            window.localStorage.setItem('highScore', highScore.toString());
            return;
        }

        if (grid[snake.head.y][snake.head.x] === "food") {
            snake.length++;
            addFood();
            highScore = Math.max(snake.length, highScore);
        }
        snake.recalculate();
        snake = snake;

        setTimeout(tick, refreshRate - Math.min(snake.length, 9) * 10.6);
    }

    const restart = () => {
        snake.reset(new Point(Math.floor(size / 2), Math.floor(size / 2)));
        lost = false;
        grid = [...Array(size + 1)].map(() =>
            [...Array(size + 1)].map(() => Cell.EMPTY)
        );
        addFood();
        tick();
    }

    onMount(() => {
        addFood();
        tick();
    });
</script>

<div>
    <h3 class="center">points {snake.length} - high score {highScore}</h3>
    {#if lost}
        <div class="center">
            <button on:click={restart}>retry</button>
        </div>
    {/if}
    <div class="center">
        <div>
            {#each grid as row, i}
                <div class="row">
                    {#each row as cell, j}
                        <div class={'cell ' + cell}></div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .cell {
        width: 10px;
        height: 10px;
        border: 1px solid black;
    }
    .empty {
        background-color: black;
        border: 1px solid black;
    }
    .food {
        background-color: pink;
        border: 1px solid black;
    }
    .snake {
        background-color: green;
        border: 1px solid black;
    }
    .row {
        display: flex;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>
