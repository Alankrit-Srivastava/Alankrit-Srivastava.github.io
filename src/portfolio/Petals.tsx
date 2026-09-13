import { useEffect, useRef } from 'react';

type Petal = { x: number; y: number; r: number; vx: number; vy: number; a: number; va: number; sway: number; alpha: number; color: string };

/** Slow sakura petals on a fixed canvas behind the page. Not rendered at all for reduced motion. */
export default function Petals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = canvas.width = Math.floor(window.innerWidth * dpr);
      height = canvas.height = Math.floor(window.innerHeight * dpr);
    };

    const make = (fromTop: boolean): Petal => ({
      x: Math.random() * width,
      y: fromTop ? -20 * dpr : Math.random() * height,
      r: (4 + Math.random() * 5) * dpr,
      vy: (0.25 + Math.random() * 0.5) * dpr,
      vx: (-0.2 + Math.random() * 0.4) * dpr,
      a: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * Math.PI * 2,
      alpha: 0.3 + Math.random() * 0.35,
      color: Math.random() < 0.8 ? '#F2A3A6' : '#E9AA3C',
    });

    resize();
    const petals = Array.from({ length: window.innerWidth < 640 ? 9 : 18 }, () => make(false));

    const draw = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.r);
      ctx.bezierCurveTo(p.r * 0.9, -p.r * 0.9, p.r * 0.9, p.r * 0.5, 0, p.r);
      ctx.bezierCurveTo(-p.r * 0.9, p.r * 0.5, -p.r * 0.9, -p.r * 0.9, 0, -p.r);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        petals.forEach((p, i) => {
          p.sway += 0.015;
          p.x += p.vx + Math.sin(p.sway) * 0.35 * dpr;
          p.y += p.vy;
          p.a += p.va;
          if (p.y > height + 20 * dpr || p.x < -30 * dpr || p.x > width + 30 * dpr) petals[i] = make(true);
          draw(petals[i]);
        });
      }
      frame = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="petals" aria-hidden="true" />;
}
