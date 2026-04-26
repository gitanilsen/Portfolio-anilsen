"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import BookCallModal from "./BookCallModal";

const LETTERS = "ANIL SEN".split("");

export default function Hero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [booted, setBooted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const bootLines = [
    "> initializing system...",
    "> loading modules...",
    "> status: all systems operational",
    "> ready_",
  ];

  // Boot sequence animation
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    bootLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setLineIndex(i + 1);
          if (i === bootLines.length - 1) {
            setTimeout(() => setBooted(true), 400);
          }
        }, (i + 1) * 500)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Matter.js physics for the headline letters
  useEffect(() => {
    if (!booted || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.offsetWidth;
    const height = 200;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Calculate letter positions
    const letterWidth = Math.min(80, width / (LETTERS.length + 1));
    const letterHeight = letterWidth * 1.1;
    const totalWidth = LETTERS.length * letterWidth;
    const startX = (width - totalWidth) / 2 + letterWidth / 2;
    const centerY = height / 2;

    const letterBodies: Matter.Body[] = [];
    const anchors: { x: number; y: number }[] = [];

    LETTERS.forEach((letter, i) => {
      const x = startX + i * letterWidth;
      const y = centerY;
      anchors.push({ x, y });

      if (letter === " ") {
        // Invisible spacer
        const spacer = Matter.Bodies.rectangle(x, y, letterWidth * 0.4, letterHeight, {
          isStatic: true,
          render: { visible: false },
        });
        Matter.Composite.add(engine.world, spacer);
        return;
      }

      const body = Matter.Bodies.rectangle(x, y, letterWidth * 0.85, letterHeight * 0.85, {
        restitution: 0.3,
        friction: 0.1,
        frictionAir: 0.08,
        render: {
          fillStyle: "#EAEAEA",
          strokeStyle: "#E4FF00",
          lineWidth: 1,
        },
        label: letter,
      });
      letterBodies.push(body);
      Matter.Composite.add(engine.world, body);

      // Spring constraint to anchor position
      const constraint = Matter.Constraint.create({
        pointA: { x, y },
        bodyB: body,
        pointB: { x: 0, y: 0 },
        stiffness: 0.08,
        damping: 0.1,
        length: 0,
        render: { visible: false },
      });
      Matter.Composite.add(engine.world, constraint);
    });

    // Mouse constraint for interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom rendering for letter labels
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const computedStyle = getComputedStyle(document.documentElement);
      const bgMain = computedStyle.getPropertyValue('--bg-main').trim() || '#0A0A0A';
      const textMain = computedStyle.getPropertyValue('--text-main').trim() || '#EAEAEA';
      const accent = computedStyle.getPropertyValue('--accent-primary').trim() || '#E4FF00';

      const fontSize = Math.max(24, letterWidth * 0.5);
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      letterBodies.forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        // Draw background rect
        const w = letterWidth * 0.85;
        const h = letterHeight * 0.85;
        ctx.fillStyle = bgMain;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.strokeRect(-w / 2, -h / 2, w, h);

        // Draw letter
        ctx.fillStyle = textMain;
        ctx.fillText(body.label || "", 0, 2);

        ctx.restore();
      });
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // Handle resize
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      render.canvas.width = newWidth * (window.devicePixelRatio || 1);
      render.canvas.style.width = newWidth + "px";
      render.options.width = newWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [booted]);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative">
      {/* Boot sequence */}
      <div className="mb-12 font-mono text-sm md:text-base space-y-2">
        {bootLines.slice(0, lineIndex).map((line, i) => (
          <p key={i} className={`${i < lineIndex - 1 ? "text-text-muted" : "text-terminal"}`}>
            {line}
          </p>
        ))}
      </div>

      {/* Physics headline */}
      {booted && (
        <div className="w-full max-w-4xl mx-auto mb-12">
          <div
            ref={canvasContainerRef}
            className="w-full h-[200px] cursor-grab active:cursor-grabbing"
          />
        </div>
      )}

      {/* Subtitle info */}
      {booted && (
        <div className="font-mono space-y-4">
          <p className="text-lg md:text-xl text-text-main">
            <span className="text-terminal">&gt;</span> Full_Stack_Engineer <span className="text-accent">&amp;&amp;</span> Digital_Partner
          </p>
          <p className="text-lg md:text-xl text-text-main">
            <span className="text-terminal">&gt;</span> Status: <span className="text-accent">Available for new deployments.</span>
          </p>

          <div className="pt-8">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="inline-block px-8 py-4 bg-accent text-true-black font-mono font-bold text-lg tracking-wider hover:bg-text-main hover:text-bg-main transition-colors duration-0 border border-accent cursor-pointer"
            >
              [ Book_A_Call ]
            </button>
          </div>
          <BookCallModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
        </div>
      )}

      {/* Blinking cursor */}
      {!booted && (
        <span className="inline-block w-3 h-6 bg-terminal animate-pulse ml-1" />
      )}
    </section>
  );
}
