import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { useLocation } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export function GsapRouteHandler({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // After route change, refresh ScrollTrigger once the new DOM is ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Kill ALL ScrollTrigger instances and tweens on route change
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, [location.pathname]);

  return <>{children}</>;
}
