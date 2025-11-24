import React, { useEffect, useRef } from "react";

const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const shade = Math.floor(Math.random() * 20);
        const alpha = Math.random() < 0.7 ? 255 : 0;
        buffer[i] = (alpha << 24) | (shade << 16) | (shade << 8) | shade; // RGBA
      }

      ctx.putImageData(imageData, 0, 0);
    };

    generateNoise();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      generateNoise();
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resizeCanvas);
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
