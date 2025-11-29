import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LightRays from "./light-rays";

export function LightRaysPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // don't render portal on first render
  }

  return createPortal(
    <LightRays
      raysOrigin="top-right"
      raysColor="#fff"
      raysSpeed={1.5}
      lightSpread={5}
      rayLength={4}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.05}
      distortion={0.05}
      opacity={0.3}
    />,
    document.getElementsByClassName("light-rays-portal")[0] as HTMLElement
  );
}
