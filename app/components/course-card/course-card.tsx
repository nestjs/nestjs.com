/* @ts-ignore */
import { useRef } from "react";
/* @ts-ignore */
import TimeIcon from "./time.svg?react";
/* @ts-ignore */
import PlayIcon from "./play.svg?react";

type CourseCardProps = {
  title: string;
  duration: string;
  lessonCount: number;
  color: string;
};

export function CourseCard({
  title,
  duration,
  lessonCount,
  color,
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
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 -40px 100px rgba(${color}, 0.45)`;
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (cardRef.current) {
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
        className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/30 to-white/0 pointer-events-none
        top-[-1px] left-[-1px] right-[-1px] bottom-[-1px]"
      ></div>
      <div
        ref={cardRef}
        className={`course-card rounded-[24px] p-[6px] w-full max-w-sm relative overflow-hidden
          transition duration-300 hover:brightness-120 cursor-pointer`}
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
            className="top-0 left-0 right-0 bottom-0 absolute flex items-center justify-center p-4"
            style={{
              background: `linear-gradient(200deg, rgba(${color},1.0), #050303 70%)`,
            }}
          >
            <div className="noise" />
            <h3 className="text-[22px] font-medium leading-[1.4]">{title}</h3>
          </div>
        </div>
        <div className="mb-4 font-mono text-[#9B9A9A] text-sm px-6 py-1 leading-8">
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
    </>
  );
}
