export class Paddle {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(): void {
    const x = (this.ctx.canvas.width - 75) / 2;

    this.ctx.beginPath();
    this.ctx.rect(x, this.ctx.canvas.height - 10, 75, 10);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
