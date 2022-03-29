export class Score {
  private readonly _ctx: CanvasRenderingContext2D;
  points: number;

  constructor({ ctx = null }) {
    this._ctx = ctx;
    this.points = 0;
  }

  draw(): void {
    this._ctx.font = '16px Arial';
    this._ctx.fillStyle = '#0095DD';
    this._ctx.fillText('Score: ' + this.points, 8, 20);
  }
}
