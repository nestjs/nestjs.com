import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import EnterpriseTestimonialAvatar from "../../../assets/testimonials/otg/author.jpeg";
import AnimatedContent from "../../animations/animated-content/animated-content";
import LightRays from "../../animations/light-rays/light-rays";
import NoiseOverlay from "../../backgrounds/noise-overlay/noise-overlay";

const TILT_DEGREES = 3;
const SPRING_CONFIG = { stiffness: 200, damping: 20 };

export function TiltedTestimonial({}) {
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
            <div className="flex md:items-start md:flex-row flex-col-reverse max-w-3xl mx-auto z-100 relative">
              <div className="flex items-center flex-col md:mt-0 mt-12">
                <AnimatedContent distance={20} delay={0.2} initialOpacity={0}>
                  <div className="rounded-[13px] w-[180px] h-[180px] overflow-hidden">
                    <img
                      src={EnterpriseTestimonialAvatar}
                      alt="Natalie Mazza"
                    />
                  </div>
                </AnimatedContent>
                <div className="mt-6 md:text-left text-center">
                  <AnimatedContent distance={20} delay={0.3} initialOpacity={0}>
                    <h6 className="font-medium text-lg">Natalie Mazza</h6>
                  </AnimatedContent>
                  <AnimatedContent distance={20} delay={0.4} initialOpacity={0}>
                    <p className="text-sm opacity-75 font-mono font-light leading-[1.5] mt-1">
                      Partner, CPO @ OTG Management
                    </p>
                  </AnimatedContent>
                </div>
              </div>
              <div className="relative md:ml-14 md:px-0 px-8 md:pt-0 pt-8">
                <AnimatedContent distance={20} delay={0.5} initialOpacity={0}>
                  <span className="md:absolute text-[6rem] md:-top-4 -left-2 leading-1 block">
                    “
                  </span>
                </AnimatedContent>
                <AnimatedContent distance={20} delay={0.6} initialOpacity={0}>
                  <p className="md:text-xl md:leading-9 text-lg leading-8">
                    At the onset of a new project, we were looking for experts
                    to help us understand a new tech stack (with NestJS) and
                    implement it quickly and seamlessly. We sought out Trilon as
                    the experts in the space and were thrilled we did so. They
                    were able to quickly get our team up to speed on best
                    practices and made themselves readily available for
                    questions at all times...“
                  </p>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </AnimatedContent>
  );
}
