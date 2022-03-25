import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ball } from './model/ball.model';
import { Paddle } from './model/paddle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;
  ball: Ball;
  paddle: Paddle;
  dx = 2;
  dy = -2;
  x;
  y;
  r = 10;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.createBall();
    this.createPaddle();

    this.gameLoop();
  }

  createBall(): void {
    this.ball = new Ball(this.ctx);
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height - 30;
  }

  createPaddle(): void {
    this.paddle = new Paddle(this.ctx);
  }

  gameLoop(): void {
    setInterval(() => {
      this.moveBall();
      this.paddle.draw();
    }, 10);
  }

  moveBall(): void {
    this.ball.draw(this.x, this.y, this.r);

    if (
      this.x + this.dx > this.canvas.nativeElement.width - this.r ||
      this.x + this.dx < this.r
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.dy > this.canvas.nativeElement.height - this.r ||
      this.y + this.dy < this.r
    ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}
