export class Ball {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, r: number, color: string = '#0095DD'): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
