import React, { useCallback, useRef } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || !overlayRef.current || isFocusedRef.current)
        return;

      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      overlayRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 60%)`;
    },
    [spotlightColor],
  );

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
    if (overlayRef.current) overlayRef.current.style.opacity = "0.6";
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0.6";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-120 ease-in-out"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
