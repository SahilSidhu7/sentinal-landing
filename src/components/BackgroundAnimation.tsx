import { useEffect, useRef } from "react";

// Primary green from --color-primary (#3ecf8e), used at varying opacities.
const PARTICLE_COLOR = "62,207,142";

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    return setup(canvas, ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}

function setup(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  let animationFrameId: number;
  let particles: Particle[] = [];

  const mouse = {
    x: null as number | null,
    y: null as number | null,
    radius: 200,
  };

  class Particle {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    color: string;

    constructor(
      x: number,
      y: number,
      directionX: number,
      directionY: number,
      size: number,
      color: string
    ) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }

      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;

          this.x -= forceDirectionX * force * 5;
          this.y -= forceDirectionY * force * 5;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;

      this.draw();
    }
  }

  function init() {
    particles = [];

    const numberOfParticles = (canvas.width * canvas.height) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const directionX = Math.random() * 0.4 - 0.2;
      const directionY = Math.random() * 0.4 - 0.2;

      const color = `rgba(${PARTICLE_COLOR},0.4)`;

      particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const distance =
          (particles[a].x - particles[b].x) ** 2 +
          (particles[a].y - particles[b].y) ** 2;

        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          const opacity = (1 - distance / 20000) * 0.35;

          const dx = particles[a].x - (mouse.x ?? 0);
          const dy = particles[a].y - (mouse.y ?? 0);
          const mouseDistance = Math.sqrt(dx * dx + dy * dy);

          if (mouse.x && mouseDistance < mouse.radius) {
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR},${Math.min(opacity + 0.3, 0.8)})`;
          } else {
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR},${opacity})`;
          }

          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => particle.update());

    connect();
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }

  function handleMouseMove(event: MouseEvent) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  function handleMouseOut() {
    mouse.x = null;
    mouse.y = null;
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseout", handleMouseOut);

  resizeCanvas();
  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseout", handleMouseOut);
  };
}
