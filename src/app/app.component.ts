import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ball } from './model/ball.model';
import { Brick } from './model/brick.model';
import { Life } from './model/life.model';
import { Paddle } from './model/paddle.model';
import { Score } from './model/score.mode';

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
  score: Score;
  life: Life;
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
    this.score = new Score({ ctx: this.ctx });
    this.life = new Life({ ctx: this.ctx });
    this.createBricks();
  }

  createBricks(): void {
    for (let c = 0; c < 3; c++) {
      const row = [];

      for (let r = 0; r < 2; r++) {
        row.push(new Brick({ ctx: this.ctx }));
      }

      this.bricks.push(row);
    }
  }

  startGameLoop(): void {
    this.gameLoop = setInterval((_) => {
      this.updateCanvas();
      this.collisionDetection();
      this.checkGameState();
    }, this.secondsPerFrame);
  }

  collisionDetection(): void {
    for (let c = 0; c < this.bricks.length; c++) {
      const row = this.bricks[c];

      for (let r = 0; r < row.length; r++) {
        const brick = row[r];

        if (
          this.ball.x > brick.x &&
          this.ball.x < brick.x + brick.width &&
          this.ball.y > brick.y &&
          this.ball.y < brick.y + brick.height &&
          brick.alive
        ) {
          this.dy = -this.dy;
          brick.alive = false;
          this.score.points++;
        }
      }
    }
  }

  checkGameState(): void {
    if (this.life.points === 0) {
      alert('GAME OVER');
      document.location.reload();
      clearInterval(this.gameLoop);
    } else if (this.playerDestroiedAllBricks()) {
      alert('YOU WIN, CONGRATS!');
      document.location.reload();
      clearInterval(this.gameLoop);
    }
  }

  playerDestroiedAllBricks(): boolean {
    return (
      this.bricks.filter((c) => c.filter((r) => r.alive).length === 0)
        .length === this.bricks.length
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
    this.score.draw();
    this.life.draw();
    this.drawBricks();
  }

  drawBricks(): void {
    for (let c = 0; c < this.bricks.length; c++) {
      const row = this.bricks[c];

      for (let r = 0; r < row.length; r++) {
        const brick = this.bricks[c][r];

        if (brick.alive) {
          const x = c * (brick.width + brick.padding) + brick.offsetLeft;
          const y = r * (brick.height + brick.padding) + brick.offsetTop;

          row[r].draw({ x, y });
        }
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
    const isCollidingWithLeftWall =
      this.ball.x + this.dx >
      this.canvas.nativeElement.width - this.ball.radius;

    const isCollidingWithRigthWall = this.ball.x + this.dx < this.ball.radius;

    return isCollidingWithLeftWall || isCollidingWithRigthWall;
  }

  isBallCollindingWithAxisY(): boolean {
    const isCollidingWithBottomWall =
      this.ball.y + this.dy >
      this.canvas.nativeElement.height - this.ball.radius;

    const isCollidingWithUpperWall = this.ball.y + this.dy < this.ball.radius;

    const isCollidingWithThePaddle =
      this.ball.x > this.paddle.x &&
      this.ball.x < this.paddle.x + this.paddle.width;

    if (isCollidingWithBottomWall && !isCollidingWithThePaddle) {
      this.life.points--;
    }

    return isCollidingWithUpperWall || isCollidingWithBottomWall;
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
