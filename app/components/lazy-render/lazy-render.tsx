import { useEffect, useRef, useState } from "react";

const LazyRender = ({
  children,
  className,
  dynamic = true,
  threshold = 0.1,
  rootMargin = "0px",
}: {
  children: React.ReactNode;
  className?: string;
  dynamic?: boolean;
  threshold?: number;
  rootMargin?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (dynamic) {
          // For dynamic rendering, update visibility on each intersection change
          // that said, non-visible elements will be unmounted
          setIsVisible(entry.isIntersecting);
          if (!entry.isIntersecting) {
            console.log("Element out of view, unmounting children.");
          }
        } else {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // stop observing once visible
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current! as HTMLElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyRender;
