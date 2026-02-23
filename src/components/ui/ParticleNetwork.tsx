"use client";

import { useEffect, useRef } from "react";

const DEFAULT_PARTICLE_COUNT = 50;
const CONNECT_DISTANCE = 140;
const PARTICLE_RADIUS = 2.8;
const LINE_OPACITY = 0.35;
const PARTICLE_OPACITY = 0.7;
const SPEED = 0.7;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function getAccentColor(): string {
  if (typeof document === "undefined") return "13, 148, 136"; // teal-600
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--color-accent").trim() || "#0d9488";
  if (accent.startsWith("#")) {
    const r = parseInt(accent.slice(1, 3), 16);
    const g = parseInt(accent.slice(3, 5), 16);
    const b = parseInt(accent.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "13, 148, 136";
}

export function ParticleNetwork({
  className = "",
  particleCount = DEFAULT_PARTICLE_COUNT,
  excludeCenter = false,
}: {
  className?: string;
  particleCount?: number;
  /** When true, center is masked so particles only show around the edges (better text readability). */
  excludeCenter?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number | undefined;
    let particles: Particle[] = [];
    let rgb: string = getAccentColor();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    function setSize() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w <= 0 || h <= 0) return;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    }

    function initParticles(w: number, h: number) {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
        });
      }
    }

    function tick() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w <= 0 || h <= 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * LINE_OPACITY;
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${rgb}, ${PARTICLE_OPACITY})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(tick);
    }

    // Defer so layout is complete and canvas has non-zero size
    let rafId = requestAnimationFrame(function init() {
      rafId = requestAnimationFrame(function initAgain() {
        setSize();
        tick();
      });
    });

    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      if (animationId != null) cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [particleCount]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      style={
        excludeCenter
          ? {
              WebkitMaskImage: "radial-gradient(ellipse 30% 32% at 50% 48%, transparent 0%, transparent 98%, black 100%)",
              maskImage: "radial-gradient(ellipse 30% 32% at 50% 48%, transparent 0%, transparent 98%, black 100%)",
              maskSize: "100% 100%",
              maskPosition: "center",
              maskRepeat: "no-repeat",
            }
          : undefined
      }
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        width={1}
        height={1}
        aria-hidden
      />
    </div>
  );
}
