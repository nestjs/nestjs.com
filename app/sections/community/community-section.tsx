// @ts-ignore
import { gsap } from "gsap/dist/gsap.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";

type Avatar = {
  id: number;
  x: number;
  y: number;
  size: number;
  url: string;
  offset: number;
  duration: number;
  delay: number;
};

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function CommunitySection() {
  const [viewportWidth, setViewportWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const avatars: Avatar[] = useMemo(() => {
    let count = 20,
      cols = 4,
      rows = 5,
      xJitter = 5,
      yJitter = 4;

    switch (true) {
      case viewportWidth > 1200:
        break;
      case viewportWidth > 992:
        count = 16;
        cols = 4;
        rows = 4;
        xJitter = 6;
        yJitter = 6;
        break;
      default:
        count = 9;
        cols = 3;
        rows = 3;
        xJitter = 4;
        yJitter = 4;
        break;
    }
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    const points: Avatar[] = [];

    let id = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (id >= count) break;

        const sign = Math.random() > 0.5 ? 1 : -1;
        const x = c * cellWidth + getRandom(10, cellWidth + xJitter * sign);
        const y = r * cellHeight + getRandom(10, cellHeight + yJitter * sign);

        const gender = Math.random() > 0.5 ? "men" : "women";
        const userId = Math.floor(getRandom(1, 100));

        points.push({
          id,
          x,
          y,
          size: 48,
          url: `https://randomuser.me/api/portraits/${gender}/${userId}.jpg`,
          offset: getRandom(24, 52),
          duration: getRandom(1.8, 3.8),
          delay: Math.random() * 1.25,
        });

        id++;
      }
    }

    return points;
  }, [viewportWidth]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    avatarRefs.current = avatarRefs.current.slice(0, avatars.length);

    const ctx = gsap.context(() => {
      const animateAvatar = (avatarElement: HTMLDivElement, avatar: Avatar) => {
        gsap.to(avatarElement, {
          y: getRandom(-avatar.offset, avatar.offset),
          duration: avatar.duration,
          ease: "sine.inOut",
          onComplete: () => animateAvatar(avatarElement, avatar),
        });
      };

      avatarRefs.current.forEach((avatarElement, index) => {
        const avatar = avatars[index];

        if (!avatarElement || !avatar) {
          return;
        }

        gsap.set(avatarElement, {
          y: getRandom(-avatar.offset, avatar.offset) * 0.65,
        });
        animateAvatar(avatarElement, avatar);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [avatars]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen mt-60">
      {avatars.map((a) => (
        <div
          key={a.id}
          ref={(node) => {
            avatarRefs.current[a.id] = node;
          }}
          className="absolute"
          style={{
            top: `${a.y}%`,
            left: `${a.x}%`,
            width: `${a.size}px`,
            height: `${a.size}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <BlurIn
            className="rounded-full object-cover shadow-md overflow-hidden"
            delay={a.delay}
            scale={0}
          >
            <img src={a.url} alt="avatar" className="grayscale opacity-30" />
          </BlurIn>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center container mx-auto px-4 shadow-lg">
          <ScrollReveal
            ElementTag="h2"
            className="font-medium xl:text-8xl md:text-6xl sm:text-5xl text-4xl mb-4 xl:leading-28 md:leading-18 sm:leading-15 leading-12"
            enableBlur
          >
            Over 15000 people certificated
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light pt-4 max-w-4xl"
            ElementTag="p"
            enableBlur
          >
            Become a
            part of our thriving community and start your NestJS journey today. 
            Join over 15,000 certified developers who have transformed their careers with our comprehensive courses.
          </ScrollReveal>
          <div className="mt-16">
            <PrimaryButton href="https://courses.nestjs.com/" target="_blank">
              Browse courses
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
