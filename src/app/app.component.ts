import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ball } from './model/ball.model';
import { Paddle } from './model/paddle.model';

enum KEYS {
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
  dx = 2;
  dy = -2;
  paddleDirection;
  secondsPerFrame = 10;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ball = new Ball(this.ctx, 10);
    this.paddle = new Paddle(this.ctx);
    this.startGameLoop();
  }

  startGameLoop(): void {
    setInterval((_) => this.updateCanvas(), this.secondsPerFrame);
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
    return (
      this.ball.x + this.dx >
        this.canvas.nativeElement.width - this.ball.radius ||
      this.ball.x + this.dx < this.ball.radius
    );
  }

  isBallCollindingWithAxisY(): boolean {
    return (
      this.ball.y + this.dy >
        this.canvas.nativeElement.height - this.ball.radius ||
      this.ball.y + this.dy < this.ball.radius
    );
  }

  recalculatePaddlePosition(): number {
    let x = this.paddle.x;

    if (this.paddleDirection === KEYS.LEFT) {
      x -= 7;

      if (this.paddle.x < 0) {
        x = 0;
      }
    }

    if (this.paddleDirection === KEYS.RIGHT) {
      x += 7;

      if (this.paddle.x + 75 > this.canvas.nativeElement.width) {
        x = this.canvas.nativeElement.width - 75;
      }
    }

    return x;
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  captureUserInput(event: KeyboardEvent): void {
    this.paddleDirection = event.type === 'keyup' ? null : event.key;
  }
}
