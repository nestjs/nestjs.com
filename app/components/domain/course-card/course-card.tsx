/* @ts-ignore */
import { useRef } from "react";
/* @ts-ignore */
import TimeIcon from "./time.svg?react";
/* @ts-ignore */
import { StackIcon } from "@phosphor-icons/react";
import PlayIcon from "./play.svg?react";

type CourseCardProps = {
  title: string;
  subtitle?: string;
  duration: string;
  lessonCount: number;
  color: string;
  borderOpaque?: boolean;
  price?: number;
  discount?: number;
  isBundle?: boolean;
  shadowOnHover?: boolean;
  variant?: "full" | "compact";
  align?: "left" | "center";
};

export function CourseCard({
  title,
  duration,
  lessonCount,
  color,
  subtitle,
  price,
  discount,
  isBundle = false,
  variant = "compact",
  borderOpaque = false,
  shadowOnHover = true,
  align = "center",
}: CourseCardProps) {
  const meshRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (meshRef.current) {
      meshRef.current.style.backgroundPosition = `${x / 20}px ${y / 20}px`;
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (cardRef.current && shadowOnHover) {
      cardRef.current.style.boxShadow = `0 -40px 100px rgba(${color}, 0.45)`;
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (cardRef.current && shadowOnHover) {
      cardRef.current.style.boxShadow = `none`;
    }
  };

  return (
    <>
      <style>
        {`
          .course-card {
            transition: box-shadow 0.3s ease, filter 0.3s ease;
          }

          .noise { 
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E");
            pointer-events: none;
            filter: invert(1);
            opacity: 0.85;
            z-index: 0;
          }

          .icon-course-card path {
            fill: #9B9A9A;
          }
        `}
      </style>
      <div
        className={`absolute inset-0 rounded-[24px] ${borderOpaque ? (variant === "full" ? "bg-gradient-to-b from-white/20 to-white/10" : "bg-gradient-to-b from-white/20 to-white/0") : "bg-gradient-to-b from-[#504e4e] to-[#050303]"} transition-background pointer-events-none
        top-[-1px] left-[-1px] right-[-1px] bottom-[-1px]`}
      ></div>
      <div
        ref={cardRef}
        className={`course-card rounded-[24px] p-[6px] w-full relative overflow-hidden
          transition duration-300 hover:brightness-120 cursor-pointer ${variant === "compact" ? "max-w-sm" : "max-w-none"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: `radial-gradient(ellipse at top,
            color-mix(in srgb, rgba(${color}, 1.0) 25%, #050303) 60%,
            color-mix(in srgb, rgba(${color}, 1.0) 5%, #050303) 100%
        )`,
        }}
      >
        <div
          ref={meshRef}
          className="
          absolute top-0 left-0 right-0 bottom-0 opacity-20 pointer-events-none
          bg-[length:50px_50px]
          bg-[image:linear-gradient(to_right,grey_1px,transparent_1px),linear-gradient(to_bottom,grey_1px,transparent_1px)]
          [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]
          [-webkit-mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]"
        ></div>
        <div
          className="p-4 rounded-[20px] text-white mb-4 min-h-[190px] min-w-[224px] 
        border border-solid border-[rgba(255,255,255,0.2)] relative overflow-hidden"
        >
          <div
            className={`top-0 left-0 right-0 bottom-0 absolute flex items-center ${align === "center" ? "justify-center p-4" : "justify-start p-6"}`}
            style={{
              background: `linear-gradient(200deg, rgba(${color},1.0), #050303 70%)`,
            }}
          >
            <div className="noise" />
            <div className="flex flex-col">
              {isBundle && (
                <div
                  className="flex w-fit flex-row items-center gap-2 mb-6 border border-white/12 px-2 py-1 rounded-[8px]"
                  style={{
                    background: `color-mix(in srgb, rgba(${color}, 1.0) 10%, rgba(255, 255, 255, 0.1) 50%)`,
                  }}
                >
                  <StackIcon weight="fill" className="w-[16px] h-[16px]" />
                  <span className="text-xs uppercase font-mono opacity-80">
                    Bundle
                  </span>
                </div>
              )}
              <h3
                className={`text-[22px] font-medium leading-[1.4] ${align === "center" ? "text-center" : "text-left"}`}
              >
                {title}
              </h3>
              {subtitle && (
                <p
                  className={`text-sm mt-2 font-thin font-mono ${align === "center" ? "text-center" : "text-left"}`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 font-mono text-[#9B9A9A] text-sm px-6 py-1 leading-8">
          {price ? (
            <div className="flex items-start gap-3 mt-2 text-white">
              <span className="text-[1.3rem]">${price}</span>
              {discount ? (
                <>
                  <span className="line-through opacity-70 text-md font-light leading-7">
                    ${Math.round(price + price * (discount / 100))}
                  </span>
                  <span className="mt-1 font-mono text-white uppercase bg-[var(--primary-color)] font-thin text-xs py-[5px] px-[6px] rounded-[8px]">
                    Save {discount}%
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
          <div
            className={`flex leading-8 mt-1 ${variant === "full" ? "flex-row items-center gap-8" : "flex-col"}`}
          >
            <div className="flex flex-row items-center gap-2">
              <PlayIcon className="icon-course-card w-[14px] h-[14px]" />
              <span>{lessonCount} lessons</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <TimeIcon className="icon-course-card w-[16px] h-[16px] ml-[-2px]" />
              <span className="mr-4">{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
