import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ball } from './model/ball.model';
import { Brick } from './model/brick.model';
import { Paddle } from './model/paddle.model';

export enum KEYS {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}
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
  bricks: Brick[][] = [];
  dx = 2;
  dy = -2;
  secondsPerFrame = 10;
  gameLoop;

  constructor() {}

  ngOnInit(): void {
    this.createGameObjects();
    this.startGameLoop();
  }

  createGameObjects(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ball = new Ball({ ctx: this.ctx, radius: 10 });
    this.paddle = new Paddle({ ctx: this.ctx });
    this.createBricks();
  }

  createBricks(): void {
    for (let c = 0; c < 5; c++) {
      const row = [];

      for (let r = 0; r < 3; r++) {
        row.push(new Brick({ ctx: this.ctx }));
      }

      this.bricks.push(row);
    }
  }

  startGameLoop(): void {
    this.gameLoop = setInterval(
      (_) => this.updateCanvas(),
      this.secondsPerFrame
    );
  }

  updateCanvas(): void {
    this.clearCanvas();
    this.drawElements();
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawElements(): void {
    this.ball.draw(this.recalculateBallPosition());
    this.paddle.draw(this.recalculatePaddlePosition());
    this.drawBricks();
  }

  drawBricks(): void {
    for (let c = 0; c < this.bricks.length; c++) {
      const row = this.bricks[c];

      for (let r = 0; r < row.length; r++) {
        const brick = this.bricks[c][r];
        const x = c * (brick.width + brick.padding) + brick.offsetLeft;
        const y = r * (brick.height + brick.padding) + brick.offsetTop;

        row[r].draw({
          x,
          y,
        });
      }
    }
  }

  recalculatePaddlePosition(): number {
    let x = this.paddle.x;

    if (this.paddle.isMovingLeft) {
      x -= 7;

      if (this.paddle.x < 0) {
        x = 0;
      }
    }

    if (this.paddle.isMovingRight) {
      x += 7;

      if (this.paddle.x + 75 > this.canvas.nativeElement.width) {
        x = this.canvas.nativeElement.width - 75;
      }
    }

    return x;
  }

  recalculateBallPosition(): { x: number; y: number } {
    if (this.isBallCollindingWithAxisX()) {
      this.dx = -this.dx;
    }

    if (this.isBallCollindingWithAxisY()) {
      this.dy = -this.dy;
    }

    return {
      x: this.ball.x + this.dx,
      y: this.ball.y + this.dy,
    };
  }

  isBallCollindingWithAxisX(): boolean {
    const leftWall =
      this.ball.x + this.dx >
      this.canvas.nativeElement.width - this.ball.radius;

    const rigthWall = this.ball.x + this.dx < this.ball.radius;

    return leftWall || rigthWall;
  }

  isBallCollindingWithAxisY(): boolean {
    const bottomWall =
      this.ball.y + this.dy >
      this.canvas.nativeElement.height - this.ball.radius;

    const upperWall = this.ball.y + this.dy < this.ball.radius;

    if (bottomWall) {
      // this.gameOver();
    }

    return upperWall;
  }

  gameOver(): void {
    alert('GAME OVER');
    document.location.reload();
    clearInterval(this.gameLoop);
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  captureUserInput(event: KeyboardEvent): void {
    if (event.type === 'keydown') {
      if (event.key === KEYS.LEFT) {
        this.paddle.isMovingLeft = true;
      } else if (event.key === KEYS.RIGHT) {
        this.paddle.isMovingRight = true;
      }
    }

    if (event.type === 'keyup') {
      if (event.key === KEYS.LEFT) {
        this.paddle.isMovingLeft = false;
      } else if (event.key === KEYS.RIGHT) {
        this.paddle.isMovingRight = false;
      }
    }
  }
}
