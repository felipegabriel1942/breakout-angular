export class Brick {
  private readonly _ctx: CanvasRenderingContext2D;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _padding: number;
  private readonly _offsetTop: number;
  private readonly _offsetLeft: number;
  private _x?: number;
  private _y?: number;

  constructor({ ctx = null }) {
    this._ctx = ctx;
    this._width = 75;
    this._height = 20;
    this._padding = 10;
    this._offsetTop = 30;
    this._offsetLeft = 30;
    this._x = 0;
    this._y = 0;
  }

  get padding(): number {
    return this._padding;
  }

  get offsetLeft(): number {
    return this._offsetLeft;
  }

  get offsetTop(): number {
    return this._offsetTop;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  draw(position: { x: number; y: number }): void {
    this._ctx.beginPath();
    this._ctx.rect(position.x, position.y, this._width, this._height);
    this._ctx.fillStyle = '#0095DD';
    this._ctx.fill();
    this._ctx.closePath();
  }
}
