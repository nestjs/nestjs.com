import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import AnimatedContent from "../../animations/animated-content/animated-content";
import LightRays from "../../animations/light-rays/light-rays";
import NoiseOverlay from "../../backgrounds/noise-overlay/noise-overlay";
import { PrimaryButton } from "../../buttons/primary-button/primary-button";

const TILT_DEGREES = 3;
const SPRING_CONFIG = { stiffness: 200, damping: 20 };

export function TiltedText({}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [TILT_DEGREES, -TILT_DEGREES]),
    SPRING_CONFIG,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-TILT_DEGREES, TILT_DEGREES]),
    SPRING_CONFIG,
  );

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <AnimatedContent distance={250} delay={0.1} initialOpacity={0}>
      <section
        id="testimonial"
        className="flex justify-center md:my-24 my-12 px-4"
        style={{ perspective: 1000 }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="rounded-[20px] border border-white/15 p-2 relative container will-change-transform"
        >
          <div className="bg-gradient-to-b from-[#1b1b1b] to-[#0e0e0e] rounded-[16px] md:py-42 py-16 md:px-12 relative z-10 overflow-hidden">
            <NoiseOverlay opacity={0.1} />
            <div className="absolute scale-150 inset-0 pointer-events-none rounded-[16px]">
              <LightRays
                raysOrigin="top-right"
                raysSpeed={0.75}
                lightSpread={5}
                rayLength={50}
                followMouse={false}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                opacity={0.3}
              />
            </div>
            <div className="flex md:items-start md:flex-row flex-col-reverse max-w-5xl mx-auto z-100 relative">
              <div className="flex items-center flex-col w-full md:mt-0 mt-12">
                <h3 className="text-6xl md:text-8xl font-medium text-center">
                  Start a free trial today
                </h3>
                <p className="font-mono text-sm opacity-70 leading-6 font-light mt-6 mb-4 text-center">
                  Experience the full power of NestJS with our free trial, and
                  see how it can transform your development process and
                  accelerate your projects.
                </p>
                <PrimaryButton className="mt-6" href="/dashboard">
                  Deploy your first app
                </PrimaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </AnimatedContent>
  );
}
