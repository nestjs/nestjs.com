import "context-filter-polyfill";
import React, { useEffect, useRef, useState } from "react";

interface Item {
  x: number;
  y: number;
  blur: number;
  radius: number;
  initialXDirection: number;
  initialYDirection: number;
  initialBlurDirection: number;
  colorOne: string;
  colorTwo: string;
  gradient: CanvasGradient;
}

const BokehHeader: React.FC<{
  parentRef: React.RefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasBlur, setCanvasBlur] = useState<string | null>("70px");
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = parentRef.current?.clientWidth || window.innerWidth;
      canvas.height = parentRef.current?.clientHeight || window.innerHeight;
      ctx.globalCompositeOperation = "darken";
    };

    if (!("filter" in ctx)) {
      setCanvasBlur("70px");
    } else {
      setCanvasBlur(null);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const backgroundColors = ["#ea2845", "#780f20"];
    const colors = [["#ea2845", "#780f20"]];
    const count = 20;
    const blur: [number, number] = [60, 90];
    const radius: [number, number] = [1, 200];

    // Background gradient
    const grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
    grd.addColorStop(0, backgroundColors[0]);
    grd.addColorStop(1, backgroundColors[1]);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize items
    const items: Item[] = Array.from({ length: count }).map(() => {
      const thisRadius = rand(radius[0], radius[1]);
      const thisBlur = rand(blur[0], blur[1]);
      const x = rand(-100, canvas.width + 100);
      const y = rand(-100, canvas.height + 100);
      const colorIndex = Math.floor(rand(0, colors.length));
      const colorOne = colors[colorIndex][0];
      const colorTwo = colors[colorIndex][1];
      const directionX = Math.round(rand(-99, 99) / 100);
      const directionY = Math.round(rand(-99, 99) / 100);
      const gradient = ctx.createLinearGradient(
        x - thisRadius / 2,
        y - thisRadius / 2,
        x + thisRadius,
        y + thisRadius
      );
      gradient.addColorStop(0, colorOne);
      gradient.addColorStop(1, colorTwo);
      return {
        x,
        y,
        blur: thisBlur,
        radius: thisRadius,
        initialXDirection: directionX,
        initialYDirection: directionY,
        initialBlurDirection: directionX,
        colorOne,
        colorTwo,
        gradient,
      };
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const adjX = 2;
      const adjY = 2;
      const adjBlur = 1;

      items.forEach((item) => {
        if (
          (item.x + item.initialXDirection * adjX >= canvas.width &&
            item.initialXDirection !== 0) ||
          (item.x + item.initialXDirection * adjX <= 0 &&
            item.initialXDirection !== 0)
        ) {
          item.initialXDirection *= -1;
        }

        if (
          (item.y + item.initialYDirection * adjY >= canvas.height &&
            item.initialYDirection !== 0) ||
          (item.y + item.initialYDirection * adjY <= 0 &&
            item.initialYDirection !== 0)
        ) {
          item.initialYDirection *= -1;
        }

        if (
          (item.blur + item.initialBlurDirection * adjBlur >= radius[1] &&
            item.initialBlurDirection !== 0) ||
          (item.blur + item.initialBlurDirection * adjBlur <= radius[0] &&
            item.initialBlurDirection !== 0)
        ) {
          item.initialBlurDirection *= -1;
        }

        item.x += item.initialXDirection * adjX;
        item.y += item.initialYDirection * adjY;
        const newBlur = item.blur + item.initialBlurDirection * adjBlur;
        if (newBlur >= blur[0]) {
          item.blur = newBlur;
        }

        ctx.beginPath();
        if ("filter" in ctx) ctx.filter = `blur(${item.blur}px)`;
        ctx.fillStyle = item.gradient;
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      if (!("filter" in ctx)) {
        // When in Safari, just stop the animation after one loop
        return;
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="d-block absolute z-0"
      style={
        canvasBlur
          ? {
              imageRendering: "auto",
              filter: `blur(${canvasBlur})`,
            }
          : {
              imageRendering: "auto",
            }
      }
    />
  );
};

export default BokehHeader;
