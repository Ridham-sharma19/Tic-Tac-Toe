import React, { useRef, useEffect } from 'react';

const COLORS = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FF6FF1', '#9D4EDD'];

interface Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityY: number;
  burst: boolean;
}

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FallingBallsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balls: Ball[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.5;
    const ground = canvas.height - 5;

    function createBall(): Ball {
      return {
        x: getRandom(0, canvas.width),
        y: getRandom(-canvas.height, 0),
        radius: getRandom(10, 20),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        velocityY: 0,
        burst: false,
      };
    }

    for (let i = 0; i < 30; i++) {
      balls.push(createBall());
    }

    function drawBall(ball: Ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    }

    function drawBurst(x: number, y: number, color: string) {
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const length = getRandom(10, 30);
        const dx = Math.cos(angle) * length;
        const dy = Math.sin(angle) * length;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let ball of balls) {
        if (!ball.burst) {
          ball.velocityY += gravity;
          ball.y += ball.velocityY;

          if (ball.y + ball.radius >= ground) {
            ball.burst = true;
            drawBurst(ball.x, ground, ball.color);

            // Reset the ball after burst
            setTimeout(() => {
              Object.assign(ball, createBall());
            }, 300);
          } else {
            drawBall(ball);
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
