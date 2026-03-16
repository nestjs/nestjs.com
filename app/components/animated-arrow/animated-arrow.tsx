import { useEffect, useRef, useState } from "react";

export default function AnimatedArrow({
  width,
  reverse,
  onClick,
}: {
  width?: number;
  reverse?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
      style={{
        width: width ? `${width}px` : "auto",
        transform: reverse ? "rotate(180deg)" : "",
      }}
      onClick={onClick}
    >
      <svg ref={ref} viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="white" />
          </marker>
        </defs>

        <line
          x1="100"
          y1="50"
          x2="300"
          y2="50"
          stroke="white"
          strokeWidth="4"
          markerEnd="url(#arrow)"
          style={{
            strokeDasharray: 360,
            strokeDashoffset: visible ? 0 : 360,
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
      </svg>
    </div>
  );
}
