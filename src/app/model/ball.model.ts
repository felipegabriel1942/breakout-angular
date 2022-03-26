export class Ball {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly _radius: number,
    private readonly _color: string = '#0095DD',
    private _x?: number,
    private _y?: number
  ) {
    this._x = this.ctx.canvas.width / 2;
    this._y = this.ctx.canvas.height - 30;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get radius(): number {
    return this._radius;
  }

  draw(position: { x: number, y: number }): void {
    this._x = position.x;
    this._y = position.y;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
