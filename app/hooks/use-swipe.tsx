import { useRef } from "react";

type SwipeHandlers = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
};

type SwipeBind = {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
};

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: SwipeHandlers): SwipeBind {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onStart = (x: number, y: number) => {
    startX.current = x;
    startY.current = y;
  };

  const onEnd = (x: number, y: number) => {
    if (startX.current === null || startY.current === null) return;

    const dx = x - startX.current;
    const dy = y - startY.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold) onSwipeRight?.();
      if (dx < -threshold) onSwipeLeft?.();
    } else {
      if (dy > threshold) onSwipeDown?.();
      if (dy < -threshold) onSwipeUp?.();
    }

    startX.current = null;
    startY.current = null;
  };

  return {
    onTouchStart: (e: React.TouchEvent) =>
      onStart(e.touches[0].clientX, e.touches[0].clientY),

    onTouchEnd: (e: React.TouchEvent) =>
      onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY),

    onMouseDown: (e: React.MouseEvent) => onStart(e.clientX, e.clientY),

    onMouseUp: (e: React.MouseEvent) => onEnd(e.clientX, e.clientY),
  };
}
