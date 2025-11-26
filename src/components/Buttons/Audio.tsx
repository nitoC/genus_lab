import React, { useState, useEffect, useRef, useCallback } from "react";

const BUTTON_SIZE = 70; // Diameter of the button
const BUTTON_RADIUS = BUTTON_SIZE / 2;
const CENTER_X = BUTTON_RADIUS;
const CENTER_Y = BUTTON_RADIUS;

// Line visualization properties
const NUM_LINES = 4;
const LINE_WIDTH = 4;
const MAX_LINE_HEIGHT = BUTTON_SIZE * 0.5;
const MIN_LINE_HEIGHT = 10;
const LINE_SPACING = 1;

// Calculate total width of the icon (5 lines + 4 spaces)
const ICON_WIDTH = NUM_LINES * LINE_WIDTH + (NUM_LINES - 1) * LINE_SPACING;
const START_X = CENTER_X - ICON_WIDTH / 2;

// Animation Physics
const SPRING = 0.05; // Stiffness
const FRICTION = 0.8; // Dampening

// Helper to draw rounded rectangle (since Canvas's ctx.roundRect is not universally supported)
const drawRoundedRect = (
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
};

// Initial state creator for the lines
const initializeLines = () => {
  const initialLines = [];
  for (let i = 0; i < NUM_LINES; i++) {
    // Initial resting V-shape pattern
    const initialHeight = MAX_LINE_HEIGHT * (0.4 + (i / (NUM_LINES - 1)) * 0.3);
    initialLines.push({
      currentHeight: initialHeight,
      targetHeight: initialHeight,
      velocity: 0,
      x: START_X + i * (LINE_WIDTH + LINE_SPACING),
    });
  }
  return initialLines;
};

const AnimatedVoiceButton = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const linesRef = useRef(initializeLines());
  const animationFrameIdRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Drawing Functions ---

  const drawButton = useCallback(
    (ctx: any) => {
      // 1. Clear the canvas for the new frame
      ctx.clearRect(0, 0, BUTTON_SIZE, BUTTON_SIZE);

      // 2. Draw the background circle (Dark)
      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, BUTTON_RADIUS * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a1a";
      ctx.fill();
      ctx.closePath();

      // 3. Draw the outer blue border/glow
      const glowColor = isAnimating
        ? "rgba(0, 123, 255, 0.9)"
        : "rgba(0, 123, 255, 0.6)";
      const blurLevel = isAnimating ? 15 : 5;
      const buttonRadius = BUTTON_RADIUS * 0.95;

      // Draw outer ring
      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, buttonRadius, 0, Math.PI * 2);

      // Apply glow effect
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = blurLevel;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#007bff";
      ctx.stroke();
      ctx.closePath();

      // Reset shadows for icon drawing
      ctx.shadowBlur = 0;
    },
    [isAnimating]
  );

  const drawIcon = useCallback((ctx: any) => {
    ctx.fillStyle = "#ffffff"; // White lines
    const lines = linesRef.current;

    lines.forEach((line) => {
      // Calculate starting Y position (to draw from the center of the button)
      // Lines grow from the center line (CENTER_Y) down and up equally.
      const height = line.currentHeight;
      const yStart = CENTER_Y + height / 2; // Bottom of the line

      // Draw the line rectangle using the helper function
      drawRoundedRect(
        ctx,
        line.x,
        yStart - height, // Top Y position
        LINE_WIDTH,
        height,
        LINE_WIDTH / 2
      );
    });
  }, []);

  // --- Animation Logic ---

  // Updates the target height of each line randomly.
  const generateNewTargets = useCallback(() => {
    linesRef.current.forEach((line) => {
      line.targetHeight =
        Math.random() * (MAX_LINE_HEIGHT - MIN_LINE_HEIGHT) + MIN_LINE_HEIGHT;
    });
  }, []);

  // Smoothly transitions the current height towards the target height using spring-like motion.
  const updateHeights = useCallback(
    (forceRest: any) => {
      const lines = linesRef.current;
      lines.forEach((line, index) => {
        // Set resting target if not animating and not forcing animation
        if (forceRest) {
          line.targetHeight =
            MAX_LINE_HEIGHT * (0.4 + (index / (NUM_LINES - 1)) * 0.3); // Resting V-shape
        }

        // 1. Calculate the distance to the target
        const dx = line.targetHeight - line.currentHeight;

        // 2. Apply spring force
        line.velocity += dx * SPRING;

        // 3. Apply friction (dampening)
        line.velocity *= FRICTION;

        // 4. Update the current height
        line.currentHeight += line.velocity;

        // Periodically generate new targets for continuous "wave" look when animating
        if (isAnimating && Math.random() < 0.01 + index * 0.005) {
          line.targetHeight =
            Math.random() * (MAX_LINE_HEIGHT - MIN_LINE_HEIGHT) +
            MIN_LINE_HEIGHT;
        }
      });
    },
    [isAnimating]
  );

  // Main animation loop
  const animate = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    drawButton(ctx);
    updateHeights(!isAnimating); // Pass flag to updateHeights to force rest pattern if !isAnimating
    drawIcon(ctx);

    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [isAnimating, drawButton, drawIcon, updateHeights]);

  // Click handler to toggle animation
  const handleClick = () => {
    const nextAnimatingState = !isAnimating;
    setIsAnimating(nextAnimatingState);

    if (nextAnimatingState) {
      generateNewTargets();
    }
  };

  // --- Component Lifecycle (useEffect) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Canvas Context and Dimensions
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    contextRef.current = ctx;
    canvas.width = BUTTON_SIZE;
    canvas.height = BUTTON_SIZE;

    // Start the animation loop
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [animate]);

  // --- Render ---
  return (
    <div className="shadow-2xl rounded-xl">
      <canvas
        ref={canvasRef}
        id="voiceButtonCanvas"
        onClick={handleClick}
        className="cursor-pointer block rounded-full"
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
      />
    </div>
  );
};

export default AnimatedVoiceButton;
