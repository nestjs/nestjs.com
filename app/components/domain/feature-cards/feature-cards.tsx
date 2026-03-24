import { type EmblaCarouselType, type EmblaEventType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../../hooks/use-media-query";
import { debounce } from "../../../utils/debounce";
import { BlurIn } from "../../animations/blur-in/blur-in";
import LightRays from "../../animations/light-rays/light-rays";
import classes from "./feature-cards.module.scss";

interface CardMetadata {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardsProps {
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

export default function FeatureCards({
  className = "",
  cards = [],
  containerHeight = 350,
  duration = 0.4,
  enableHover = false,
}: FeatureCardsProps) {
  const isMobile = useMediaQuery("(max-width: 1080px)");
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500 }),
  ]);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
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
    DEFAULT_TRANSFORM_STYLES,
  );
  const DEFAULT_HOVERED_IDX = null;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(
    DEFAULT_HOVERED_IDX,
  );
  const lightRaysRef = useRef<HTMLDivElement>(null);
  const cardHostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardHostRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      let xOffset = 300;
      if (width < 1500) {
        xOffset = 100;
      } else if (width < 1200) {
        xOffset = 200;
      }

      // Generate transform styles based on number of cards and container width
      const styles: string[] = [];
      const centerIdx = Math.floor(cards.length / 2);
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
    offsetX: number,
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

        // Move LightRays into the hovered card
        const host = cardHostRefs.current[hoveredIdx];
        if (lightRaysRef.current && host) {
          gsap.killTweensOf(lightRaysRef.current);
          host.appendChild(lightRaysRef.current);
          gsap.to(lightRaysRef.current, {
            opacity: 0.7,
            duration: duration * 0.5,
            overwrite: "auto",
          });
        }
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

    if (lightRaysRef.current) {
      gsap.to(lightRaysRef.current, {
        opacity: 0,
        duration: duration * 0.5,
        overwrite: "auto",
      });
    }

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

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  const onSelect = (emblaApi: EmblaCarouselType, evt: EmblaEventType) => {
    if (!embla) {
      return;
    }
    const selectedIndex = emblaApi.selectedScrollSnap();
    setHoveredIdx(selectedIndex);

    // Move LightRays into the hovered card
    const host = mobileCardHostRefs.current[selectedIndex];
    if (lightRaysRef.current && host) {
      gsap.killTweensOf(lightRaysRef.current);
      host.appendChild(lightRaysRef.current);
      gsap.to(lightRaysRef.current, {
        opacity: 0.7,
        duration: duration * 0.5,
        overwrite: "auto",
      });
    }

    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    setSelectedSnap(selectedIndex);
    setSnapCount(embla.scrollSnapList().length);
  };

  useEffect(() => {
    if (!embla) {
      return;
    }
    if (!isMobile) {
      return;
    }
    embla.on("select", onSelect);
    onSelect(embla, null as any); // Set initial state based on first selected item
  }, [embla, isMobile]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: isMobile ? "100%" : (containerWidth ?? "100%"),
        height: isMobile ? "100%" : containerHeight,
      }}
    >
      {!isMobile &&
        cards.map((card, idx) => (
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
                    ref={(el) => {
                      cardHostRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />
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
      {isMobile && (
        <div className="relative w-full h-full mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-x">
              {cards.map((card, index) => (
                <div
                  className="flex-none p-2 md:max-w-[460px] sm:max-w-[400px] max-w-[380px] w-full"
                  key={index}
                >
                  <div
                    className={`${classes.card} ${hoveredIdx === index ? classes.hovered : "opacity-60"} card-${index} 
                    flex w-full aspect-square overflow-hidden text-center rounded-[24px] transition-opacity duration-300`}
                  >
                    <div
                      className={`${classes.borderGlow} flex w-full h-full rounded-[24px]`}
                    >
                      <div
                        className={`${classes.cardContainer} flex relative w-full h-full rounded-[24px] overflow-hidden`}
                      >
                        <div
                          ref={(el) => {
                            mobileCardHostRefs.current[index] = el;
                          }}
                          className="absolute inset-0 pointer-events-none"
                        />
                        <div
                          className={`flex flex-col justify-center w-full h-full text-white z-10 
                            ${classes.cardContent} ${hoveredIdx === index ? classes.hovered : ""} transition-opacity duration-300`}
                        >
                          <div className="w-[75px] h-[75px] aspect-square self-center mb-5 mt-5">
                            {card.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {card.title}
                          </h3>
                          <p className="opacity-80 text-sm font-mono leading-6 font-light">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 px-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="border-1 border-white/20 rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeftIcon
                  className="w-8 h-8 p-2"
                  stroke="currentColor"
                />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="border-1 border-white/20 rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRightIcon
                  className="w-8 h-8 p-2"
                  stroke="currentColor"
                />
              </button>
            </div>
            <div className="font-mono text-sm opacity-50">
              {selectedSnap + 1} / {snapCount}
            </div>
          </div>
        </div>
      )}
      {/* Single shared LightRays – always mounted, reparented into hovered card */}
      <div className="hidden">
        <div
          ref={lightRaysRef}
          className="absolute inset-0 pointer-events-none rounded-[24px] overflow-hidden"
          style={{ opacity: 0 }}
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
      </div>
    </div>
  );
}
