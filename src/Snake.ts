import type Direction from "./Direction";
import Point from "./Point";

class Snake {
    public body: Array<Point> = [];
    public length: number = 1;

    constructor(public head: Point, public direction: Direction) {}

    public calculateNewHeadPosition(): void {
        this.body.unshift(new Point(this.head.x, this.head.y));

        this.head.x += this.direction.x;
        this.head.y += this.direction.y;
    }

    public invalidHeadPosition(): boolean {
        return this.body.some((element: Point) => element.x === this.head.x && element.y === this.head.y);
    }

    public recalculate(): void {
        this.body = this.body.slice(0, this.length - 1);
    }

    public reset(head: Point): void {
        this.body = [];
        this.head = head;
        this.length = 1;
    }
}

export default Snake;
