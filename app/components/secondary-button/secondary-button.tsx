import { useRef } from "react";

export function SecondaryButton({
  children,
  href = "#",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}) {
  const circleRef = useRef<HTMLSpanElement>(null);
  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (circleRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      circleRef.current.style.left = `${x}px`;
      circleRef.current.style.top = `${y}px`;
      circleRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (circleRef.current) {
      circleRef.current.style.left = `-9999px`;
      circleRef.current.style.top = `-9999px`;
      circleRef.current.style.opacity = "0";
    }
  };

  return (
    <div className="relative inline-flex overflow-hidden">
      <a
        href={href}
        className={`btn bg-[#1e1c1c] rounded text-white font-bold 
          pt-5 pb-5 pl-5 pr-5 rounded-[20px] inset-0 overflow-hidden relative
          hover:scale-[0.98] transition-transform duration-100
          active:scale-[0.95]
         ${className}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span>{children}</span>
        <span
          ref={circleRef}
          className="absolute rounded-full pointer-events-none w-20 h-20 
            bg-[grey] z-10 
            transform -translate-x-1/2 -translate-y-1/2
            filter blur-lg mix-blend-darken
            top-[-9999px] left-[-9999px] opacity-0 transition-opacity duration-300"
        />
      </a>
    </div>
  );
}
