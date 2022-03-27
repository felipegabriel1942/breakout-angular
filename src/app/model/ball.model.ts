export class Ball {
  private readonly _ctx: CanvasRenderingContext2D;
  private readonly _radius: number;
  private readonly _color: string;
  private _x?: number;
  private _y?: number;

  constructor({ ctx = null, radius = null, color = '#0095DD' }) {
    this._ctx = ctx;
    this._x = this._ctx.canvas.width / 2;
    this._y = this._ctx.canvas.height - 30;
    this._radius = radius;
    this._color = color;
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

  draw(position: { x: number; y: number }): void {
    this._x = position.x;
    this._y = position.y;
    this._ctx.beginPath();
    this._ctx.arc(position.x, position.y, this.radius, 0, Math.PI * 2);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }
}
