import { useEffect, useRef, useState } from "react";

export default function AnimatedArrow({
  width,
  reverse,
  onClick,
  className = "",
  delay = 2,
}: {
  width?: number;
  reverse?: boolean;
  onClick?: () => void;
  className?: string;
  delay?: number;
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
      // { rootMargin: "-100px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: width ? `${width}px` : "auto",
        transform: reverse ? "rotate(180deg)" : "",
      }}
      onClick={onClick}
    >
      <svg ref={ref} viewBox="0 0 175 30">
        <line
          x1="0"
          y1="15"
          x2="150"
          y2="15"
          stroke="white"
          strokeWidth="4"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: visible ? 0 : 150,
            transition: `stroke-dashoffset 0.75s ease-out ${delay}s`,
          }}
        />

        <path
          d="M175 15 L151 3 L151 27 Z"
          fill="white"
          style={{
            transform: visible ? "scale(1)" : "scale(0)",
            transformOrigin: "150px 15px",
            transition: `transform 0.5s ease-out ${delay + 0.8}s`,
          }}
        />
      </svg>
    </div>
  );
}
