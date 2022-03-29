export class Life {
  private readonly _ctx: CanvasRenderingContext2D;
  private _points: number;

  constructor({ ctx = null }) {
    this._ctx = ctx;
    this._points = 3;
  }

  get points(): number {
    return this._points;
  }

  set points(points: number) {
    this._points = points;
  }

  draw(): void {
    this._ctx.font = '16px Arial';
    this._ctx.fillStyle = '#0095DD';
    this._ctx.fillText(
      'Lives: ' + this._points,
      this._ctx.canvas.width - 65,
      20
    );
  }
}
