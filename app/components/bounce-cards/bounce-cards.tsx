import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { debounce } from "../../utils/debounce";
import { BlurIn } from "../blur-in/blur-in";
import LightRays from "../light-rays/light-rays";
import classes from "./bounce-cards.module.scss";

interface CardMetadata {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BounceCardsProps {
  containerHeight?: number;
  className?: string;
  cards: CardMetadata[];
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  duration?: number;
}

export default function BounceCards({
  className = "",
  cards = [],
  animationDelay = 0.5,
  containerHeight = 350,
  animationStagger = 0.06,
  duration = 0.4,
  easeType = "elastic.out(1, 0.8)",
  enableHover = false,
}: BounceCardsProps) {
  const DEFAULT_TRANSFORM_STYLES = [
    "rotate(-5deg) translate(-600px)",
    "rotate(0deg) translate(-400px)",
    "rotate(5deg) translate(-200px)",
    "rotate(-5deg)",
    "rotate(0deg) translate(200px)",
    "rotate(-5deg) translate(400px)",
    "rotate(0deg) translate(600px)",
  ];
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [transformStyles, setTransformStyles] = useState<string[]>(
    DEFAULT_TRANSFORM_STYLES
  );
  const DEFAULT_HOVERED_IDX = null;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(
    DEFAULT_HOVERED_IDX
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      // Generate transform styles based on number of cards and container width
      const styles: string[] = [];
      const centerIdx = Math.floor(cards.length / 2);
      const xOffset = 300;
      const spacing = (width - xOffset) / (cards.length + 1);

      const rotations = [0, -5, 5];
      cards.forEach((_, i) => {
        const offsetFromCenter = i - centerIdx;
        const rotation =
          rotations[Math.abs(offsetFromCenter) % rotations.length];
        const translationX = offsetFromCenter * spacing;
        styles.push(`rotate(${rotation}deg) translate(${translationX}px)`);
      });

      setTransformStyles(styles);
    };
    handleResize();

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  useEffect(() => {
    const cardElements = document.querySelectorAll(".card");
    if (cardElements.length === 0) return;

    gsap.fromTo(
      ".card",
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    );
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (
    baseTransform: string,
    offsetX: number
  ): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) {
      return;
    }

    setHoveredIdx(hoveredIdx);

    cards.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) {
      return;
    }
    setHoveredIdx(DEFAULT_HOVERED_IDX);

    cards.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";
      gsap.to(selector, {
        transform: baseTransform,
        duration,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth ?? "100%",
        height: containerHeight,
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`${classes.card} card-${idx} absolute w-[350px] aspect-square overflow-hidden text-center`}
          style={{
            transform: transformStyles[idx] || "none",
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <BlurIn
            className="flex w-full h-full"
            delay={idx * 0.1}
            distance={100}
            duration={0.4}
          >
            <div
              className={`${classes.borderGlow} flex w-full h-full rounded-[24px]`}
            >
              <div
                className={`${classes.cardContainer} flex relative w-full h-full rounded-[24px] overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${idx === hoveredIdx ? "opacity-70" : "opacity-0"}`}
                >
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
                  />
                </div>
                <div
                  className={`flex flex-col justify-center w-full h-full text-white z-10 ${classes.cardContent}`}
                >
                  <div className="w-[75px] h-[75px] aspect-square self-center mb-5 mt-5">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="opacity-80 text-sm font-mono leading-6 font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </BlurIn>
        </div>
      ))}
    </div>
  );
}
