export class Paddle {
  private readonly _ctx: CanvasRenderingContext2D;
  private readonly _color: string;
  private _x: number;
  private _isMovingLeft: boolean;
  private _isMovingRight: boolean;

  constructor({ ctx = null, color = '#0095DD' }) {
    this._ctx = ctx;
    this._color = color;
    this._x = (this._ctx.canvas.width - 75) / 2;
    this._isMovingLeft = false;
    this._isMovingRight = false;
  }

  get x(): number {
    return this._x;
  }

  set isMovingLeft(isMoving: boolean) {
    this._isMovingLeft = isMoving;
  }

  get isMovingLeft(): boolean {
    return this._isMovingLeft;
  }

  set isMovingRight(isMoving: boolean) {
    this._isMovingRight = isMoving;
  }

  get isMovingRight(): boolean {
    return this._isMovingRight;
  }

  draw(x: number): void {
    this._x = x;
    this._ctx.beginPath();
    this._ctx.rect(x, this._ctx.canvas.height - 10, 75, 10);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }
}
