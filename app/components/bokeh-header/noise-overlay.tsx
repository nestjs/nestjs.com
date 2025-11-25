import React, { useEffect, useRef } from "react";

const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.15 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);

    const generateNoise = () => {
      for (let i = 0; i < buffer.length; i++) {
        const shade = Math.floor(Math.random() * 20);
        const alpha = Math.random() < 0.7 ? 255 : 0;
        buffer[i] = (alpha << 24) | (shade << 16) | (shade << 8) | shade;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const FRAME_SKIP = 5; // (4 ≈ 15fps noise)
    let frame = 0;

    const draw = () => {
      frame++;
      if (frame % FRAME_SKIP === 0) {
        generateNoise();
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default NoiseOverlay;
