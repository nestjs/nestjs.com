import { useMemo } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";

type Avatar = {
  id: number;
  x: number;
  y: number;
  size: number;
  url: string;
};

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function CommunitySection() {
  const avatars: Avatar[] = useMemo(() => {
    let count = 20,
      cols = 4,
      rows = 5,
      xJitter = 5,
      yJitter = 4;

    switch (true) {
      case window.innerWidth > 1200:
        break;
      case window.innerWidth > 992:
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

        const userId = Math.floor(getRandom(1, 1000));

        points.push({
          id,
          x,
          y,
          size: 48,
          url: `https://avatars.githubusercontent.com/u/${userId}?v=4`,
        });

        id++;
      }
    }

    return points;
  }, [window.innerWidth]);

  return (
    <div className="relative w-full h-screen mt-60">
      {avatars.map((a) => (
        <BlurIn
          key={a.id}
          className="absolute rounded-full object-cover shadow-md overflow-hidden"
          style={{
            top: `${a.y}%`,
            left: `${a.x}%`,
            width: `${a.size}px`,
            height: `${a.size}px`,
            transform: "translate(-50%, -50%)",
          }}
          delay={Math.random() * 1.25}
          scale={0}
        >
          <img src={a.url} alt="avatar" className="grayscale opacity-30" />
        </BlurIn>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center container mx-auto px-4 bg-[radial-gradient(circle,var(--color-bg),transparent)] shadow-lg">
          <ScrollReveal
            ElementTag="h2"
            className="font-medium xl:text-8xl md:text-6xl sm:text-5xl text-4xl mb-4 xl:leading-28 md:leading-18 sm:leading-15 leading-12"
            enableBlur
          >
            Join our ever-growing community of students
          </ScrollReveal>
          <ScrollReveal
            className="font-mono text-sm opacity-70 leading-6 font-light pt-4 max-w-4xl"
            ElementTag="p"
            enableBlur
          >
            Our courses are trusted by over 100,000 students worldwide. Become a
            part of our thriving community and start your NestJS journey today.
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
