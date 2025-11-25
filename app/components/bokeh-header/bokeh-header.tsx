import "context-filter-polyfill";
import React, { useEffect, useRef, useState } from "react";

interface Item {
  x: number;
  y: number;
  blur: number;
  radius: number;
  dx: number;
  dy: number;
  dBlur: number;
  gradient: CanvasGradient;
}

const BokehHeader: React.FC<{
  parentRef: React.RefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(null);
  const [canvasBlur, setCanvasBlur] = useState<string | null>("70px");

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const supportsFilter = "filter" in ctx;
    if (supportsFilter) setCanvasBlur(null);

    let width = parentRef.current?.clientWidth || window.innerWidth;
    let height = parentRef.current?.clientHeight || window.innerHeight;

    const resizeCanvas = () => {
      width = parentRef.current?.clientWidth || window.innerWidth;
      height = parentRef.current?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.globalCompositeOperation = "darken";
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Background gradient
    const backgroundColors = ["#ea2845", "#780f20"];
    const grd = ctx.createLinearGradient(0, height, width, 0);
    grd.addColorStop(0, backgroundColors[0]);
    grd.addColorStop(1, backgroundColors[1]);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Initialize items
    const count = 20;
    const blurRange: [number, number] = [60, 90];
    const radiusRange: [number, number] = [1, 200];
    const colors = [["#ea2845", "#780f20"]];

    const items: Item[] = Array.from({ length: count }).map(() => {
      const radius = rand(radiusRange[0], radiusRange[1]);
      const blur = rand(blurRange[0], blurRange[1]);
      const x = rand(-100, width + 100);
      const y = rand(-100, height + 100);
      const colorPair = colors[Math.floor(rand(0, colors.length))];
      const gradient = ctx.createLinearGradient(
        x - radius / 2,
        y - radius / 2,
        x + radius,
        y + radius
      );
      gradient.addColorStop(0, colorPair[0]);
      gradient.addColorStop(1, colorPair[1]);

      return {
        x,
        y,
        blur,
        radius,
        dx: Math.round(rand(-1, 1)),
        dy: Math.round(rand(-1, 1)),
        dBlur: Math.round(rand(-1, 1)),
        gradient,
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        // Bounce off edges
        if (item.x + item.dx < 0 || item.x + item.dx > width) item.dx *= -1;
        if (item.y + item.dy < 0 || item.y + item.dy > height) item.dy *= -1;
        if (
          item.blur + item.dBlur < blurRange[0] ||
          item.blur + item.dBlur > blurRange[1]
        )
          item.dBlur *= -1;

        item.x += item.dx * 2;
        item.y += item.dy * 2;
        item.blur = Math.max(
          blurRange[0],
          Math.min(blurRange[1], item.blur + item.dBlur)
        );

        ctx.beginPath();
        if (supportsFilter) ctx.filter = `blur(${item.blur}px)`;
        ctx.fillStyle = item.gradient;
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (supportsFilter) animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      className="d-block absolute z-0"
      style={
        canvasBlur
          ? { imageRendering: "auto", filter: `blur(${canvasBlur})` }
          : { imageRendering: "auto" }
      }
    />
  );
};

export default BokehHeader;
