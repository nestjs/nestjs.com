import Chart from "../../../assets/misc/chart.svg?react";
// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
// @ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = gsap.context(() => {
      const bars = chartRef.current!.querySelectorAll("rect");

      gsap.set(bars, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "bottom center",
      });
      gsap.set(chartRef.current, { opacity: 1 });

      gsap.to(bars, {
        scaleY: 1,
        opacity: 1,
        duration: 3,
        stagger: {
          each: 0.008,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={chartRef} className="absolute inset-0 l-0 r-0 -top-50 opacity-0">
      <Chart className="opacity-20 w-full" height={1200} />
    </div>
  );
}
