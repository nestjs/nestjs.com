import { useCallback, useEffect, useRef, useState } from "react";
import { BlurIn } from "../blur-in/blur-in";
import LightRays from "../light-rays/light-rays";

const CARD_CHANGE_INTERVAL = 8000;

type ServiceCardProps = {
  title: string;
  description: string;
  screenshotUrl: string;
  background?: string;
  itemsBackground?: string;
  lightsOpacity?: number;
  cardItems: Array<{
    title: string;
    description: string;
  }>;
};

export function ServiceCard({
  title,
  description,
  screenshotUrl,
  cardItems,
  lightsOpacity = 0.4,
  background = "radial-gradient(circle at 50% 50%, rgba(90, 90, 90, 1), rgba(4, 4, 4, 1) 30%)",
  itemsBackground = `radial-gradient(circle at 75% 50%, rgba(40, 40, 40, 1), #191919 25%)`,
}: ServiceCardProps) {
  const [activeCardItem, setActiveCardItem] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const itemUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!tooltipRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tooltipRef.current.style.left = `${e.clientX - rect.left}px`;
    tooltipRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(true);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(false);
  };

  const handleItemClick = useCallback(
    (idx: number) => {
      setActiveCardItem(idx);
      if (itemUpdateIntervalRef.current) {
        clearInterval(itemUpdateIntervalRef.current);
      }
      itemUpdateIntervalRef.current = setInterval(() => {
        setActiveCardItem((prev) => (prev + 1) % cardItems.length);
      }, CARD_CHANGE_INTERVAL);
    },
    [cardItems.length],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardItem((prev) => (prev + 1) % cardItems.length);
    }, CARD_CHANGE_INTERVAL);

    itemUpdateIntervalRef.current = interval;
    return () => {
      if (itemUpdateIntervalRef.current) {
        clearInterval(itemUpdateIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center h-[98vh] rounded-[24px] overflow-hidden">
      <div className="relative flex flex-grow-1 w-full">
        <div
          className="text-center flex-grow-1 min-h-[250px] px-16 py-16 pb-0 relative z-10 overflow-hidden"
          style={{
            background,
          }}
        >
          <div className="relative z-10">
            <BlurIn duration={0.5} ease="power2.out">
              <h3 className="text-6xl font-medium mb-6">{title}</h3>
            </BlurIn>
            <BlurIn delay={0.1} duration={0.5} ease="power2.out">
              <h5 className="font-mono text-sm font-light max-w-xl mx-auto leading-6">
                {description}
              </h5>
            </BlurIn>
          </div>
          <BlurIn
            delay={0.2}
            duration={0.5}
            ease="power2.out"
            className="relative z-2 max-h-[35vh]"
          >
            <div
              className="p-4 pb-0 max-w-[90%] relative mx-auto mt-10 z-2
                border border-1 border-[rgba(255,255,255,0.1)] rounded-tl-[20px] rounded-tr-[20px]
                after:absolute after:inset-0 after:border after:border-[rgba(255,255,255,0.1)] after:rounded-tl-[24px] after:rounded-tr-[24px] after:top-[-8px] after:left-[-8px] after:right-[-8px] after:bottom-[-8px] after:z-0
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/15 before:to-white/5 before:pointer-events-none before:top-[-8px] before:left-[-8px] before:right-[-8px] before:bottom-[-8px] before:rounded-tl-[24px] before:rounded-tr-[24px] before:z-0"
            >
              <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] bg-gradient-to-t from-white/15 to-white/5 top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] z-0"></div>
              <img
                src={screenshotUrl}
                className="rounded-tl-[12px] rounded-tr-[12px] z-2 relative"
              />
            </div>
          </BlurIn>
          <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-1">
            <LightRays
              raysOrigin="bottom-left"
              raysColor="#fff"
              raysSpeed={1}
              lightSpread={50}
              rayLength={25}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.25}
              distortion={0.05}
              opacity={lightsOpacity}
            />
          </div>
          <div className="absolute inset-0 z-0 left-0 right-0 top-0 bottom-0 z-3">
            <div
              className="absolute w-[40%] h-[20%] rotate-300 bg-gradient-to-r from-[#fff] to-[rgba(255,255,255,0.1)] 
                  right-[-20%] bottom-[20%] scale-x-200 perspective-500 perspective-origin-top-left
                  rounded-[80px] filter blur-3xl opacity-75
                  animate-blob"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 left-0 right-0 z-[101] cursor-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {}}
          ></div>
          <div
            ref={tooltipRef}
            className={`absolute rounded-full bg-white text-black w-[192px] h-[192px] 
          z-100 flex items-center justify-center transform -translate-x-1/2
          ${showTooltip ? "scale-100" : "scale-0"} transition-transform duration-200 pointer-events-none`}
            style={{ left: "-9999px", top: "-9999px" }}
          >
            <span
              className={`font-semibold text-base ${
                showTooltip ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300 delay-200
          `}
            >
              Check it out
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row p-14 w-full flex-grow-1"
        style={{
          background: itemsBackground,
        }}
      >
        <div className="grid grid-cols-3 gap-10 flex-grow-1 flex min-h-[100px] relative">
          <style>
            {`
              .service-card-item h4 {
                opacity: 0.25;
              }
              .service-card-item p {
                opacity: 0.25;
              }
              .service-card-item:hover h4,
              .service-card-item:hover p {
                opacity: 1;
              }
            `}
          </style>
          {cardItems.map((item, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer service-card-item"
              onClick={() => handleItemClick(idx)}
            >
              <h4
                className={`text-xl font-medium mb-4 ${activeCardItem === idx ? "!opacity-100" : ""} transition-opacity duration-150`}
              >
                {item.title}
              </h4>
              <p
                className={`text-sm leading-6 font-light font-mono ${activeCardItem === idx ? "!opacity-100" : ""} transition-opacity duration-150`}
              >
                {item.description}
              </p>
              <div className="progress-bar mt-4 w-full bg-[rgba(255,255,255,0.1)] rounded-[4px] h-[2px] absolute bottom-0 left-0 right-0 overflow-hidden">
                <style>
                  {`
                  @keyframes progressBar {
                    from { width: 0%; }
                    to { width: 100%; }
                  }

                  .animate-progressBar {
                    animation: progressBar ${CARD_CHANGE_INTERVAL}ms linear 1;
                  }
                `}
                </style>
                <div
                  className={`absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-r from-[#222] to-[#fff] rounded-[4px] h-[2px] ${
                    activeCardItem === idx ? "animate-progressBar" : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
