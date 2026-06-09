import { ShoppingBagIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import KamilAvatar from "../../../assets/avatars/kamil.png";
import MarkAvatar from "../../../assets/avatars/mark.png";
import { PrimaryButton } from "../../buttons/primary-button/primary-button";

export function CheckoutBox() {
  const [iframeElementDimensions, setIframeDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) {
      return;
    }

    const containerWidth = containerElement.offsetWidth;
    const padding = 40;
    const iframeWidth = containerWidth - padding * 2;
    const iframeHeight = (iframeWidth / 16) * 9; // 16:9 aspect ratio
    setIframeDimensions({
      width: iframeWidth,
      height: iframeHeight,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="p-[1px] relative h-full rounded-[20px] overflow-hidden bg-[radial-gradient(circle_at_top_center,_#fff_0%,_#222_20%,_#222_100%)]"
    >
      <div
        className={`rounded-[20px] p-10 flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_#9a9a9a_0%,_#7a7a7a_5%,_#4a4a4a_9%,_#1f1f1f_15%,_#050303_21%)]`}
      >
        <div
          className="
          absolute top-0 left-0 right-0 bottom-0 opacity-20 pointer-events-none
          bg-[length:51px_51px]
          bg-[image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_30%)]
          [-webkit-mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_30%)]"
        ></div>
        <div
          className="noise rounded-[20px] opacity-95! 
          [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_50%)]
          [-webkit-mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_50%)]"
        />
        <iframe
          src="https://player.vimeo.com/video/433943559?autoplay=1&muted=1&title=0&byline=0&portrait=0&sidedock=0"
          width={iframeElementDimensions.width}
          height={iframeElementDimensions.height}
          allow="autoplay; fullscreen"
        ></iframe>
        <h4 className="text-[1.7rem] font-normal mt-10">
          NestJS Fundamentals Course
        </h4>
        <div className="flex items-start gap-3 mt-2">
          <span className="text-[1.3rem]">$129</span>
          <span className="line-through opacity-70 text-md font-light">
            $175
          </span>
          <span className="font-mono text-white uppercase bg-[var(--primary-color)] font-thin text-xs p-[6px] rounded-[8px]">
            Save 25%
          </span>
        </div>
        <div className="font-mono text-sm opacity-70 leading-6 font-light mt-2">
          <span>+VAT for EU 🇪🇺</span>
        </div>
        <div className="mt-8 mb-6">
          <PrimaryButton
            href="/dashboard"
            className="w-full text-center"
            inline={false}
          >
            <div className="flex items-center gap-2 mx-auto justify-center">
              <ShoppingBagIcon weight="fill" className="inline-block mr-2" />
              <span>Purchase now</span>
            </div>
          </PrimaryButton>
        </div>
        <div className="font-mono text-sm leading-6 font-light mt-2">
          <p className="text-white/70 text-center">
            Need more than 5 licenses?{" "}
            <a
              href="mailto:support@nestjs.com"
              className="underline text-[var(--primary-color)] hover:no-underline"
            >
              Contact us
            </a>{" "}
            and get a discount!
          </p>
        </div>
        <div className="border-t border-white/10 w-full mt-8 flex pt-10 pb-2 justify-center gap-8">
          <div className="flex items-center gap-2">
            <img src={KamilAvatar} className="rounded-full w-8" />
            <div className="font-light flex flex-col">
              <span className="font-semibold text-md">Kamil Myśliwiec</span>
              <span className="uppercase text-white/50 text-xs font-mono font-light">
                Creator of NestJS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={MarkAvatar} className="rounded-full w-8" />
            <div className="flex flex-col">
              <span className="font-semibold text-md">Mark Pieszak</span>
              <span className="uppercase text-white/50 text-xs font-mono font-light">
                Core team member
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
