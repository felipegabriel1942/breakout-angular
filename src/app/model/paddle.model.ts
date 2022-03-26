export class Paddle {
  constructor(private ctx: CanvasRenderingContext2D, private _x?: number) {
    this._x = (this.ctx.canvas.width - 75) / 2;
  }

  get x(): number {
    return this._x;
  }

  draw(x: number): void {
    this._x = x;
    this.ctx.beginPath();
    this.ctx.rect(x, this.ctx.canvas.height - 10, 75, 10);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
