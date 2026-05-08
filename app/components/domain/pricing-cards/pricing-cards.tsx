import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { BlurIn } from "../../animations/blur-in/blur-in";
import ScrollReveal from "../../animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../buttons/primary-button/primary-button";
import { SectionSubheading } from "../section-subheading/section-subheading";

export type Plan = {
  type: string;
  name: string;
  shortDescription: string;
  bullets: Array<{
    text: string;
    available?: boolean;
  }>;
  price: string;
  symbol: string;
  currency: string;
  trial?: boolean;
  extraNote?: string;
  originalPrice?: string;
  discount?: number;
  discountCode?: string;
};

interface PricingCardsProps {
  className?: string;
  plans?: Plan[];
}

function IntervalButton({
  children,
  active,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 cursor-pointer rounded-[18px] font-semibold transition-colors duration-200 ${
        active
          ? "bg-white text-black"
          : "bg-transparent text-white hover:bg-white/5"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function PricingCards({ className, plans }: PricingCardsProps) {
  const [billingInterval, setBillingInterval] = useState<
    "monthly" | "annually"
  >("annually");
  return (
    <div className={`flex justify-center overflow-hidden ${className}`}>
      <div className="container relative centered justify-center items-center flex flex-col">
        <SectionSubheading>Pricing</SectionSubheading>
        <ScrollReveal
          ElementTag="h2"
          className="font-medium md:text-7xl sm:text-5xl text-4xl text-center md:leading-[1.1] md:px-0 px-4"
          enableBlur
        >
          Affordable plans for everyone
        </ScrollReveal>
        <ScrollReveal
          className="font-mono text-sm opacity-70 leading-6 font-light md:pt-10 pt-4 max-w-xl text-center md:px-0 px-4"
          ElementTag="p"
          enableBlur
        >
          Choose the plan that best fits your needs. You can always upgrade or
          downgrade later, and you can also cancel at any time.
        </ScrollReveal>
        <BlurIn className="mt-20 flex justify-center" duration={0.5}>
          <div className="border border-white/10 rounded-[24px] p-2 bg-gradient-to-r from-[#1A1A1A] via-[#2c2c2c] via-40% to-[#1A1A1A] flex text-md">
            <IntervalButton
              active={billingInterval === "monthly"}
              onClick={() => setBillingInterval("monthly")}
            >
              Monthly
            </IntervalButton>
            <IntervalButton
              active={billingInterval === "annually"}
              className="ml-2 flex items-center gap-[12px]"
              onClick={() => setBillingInterval("annually")}
            >
              <span>Annually</span>
              <span className="font-mono text-white uppercase bg-[var(--primary-color)] font-thin text-xs p-[8px] rounded-[8px]">
                Save 41%
              </span>
            </IntervalButton>
          </div>
        </BlurIn>
        <div className="mt-20 grid lg:grid-cols-3 gap-8 w-full">
          {plans?.map((plan, index) => (
            <BlurIn
              key={index}
              delay={0.2 * index}
              duration={0.5}
              distance={100}
              className="relative"
            >
              <div className="p-[1px] relative h-full rounded-[20px] overflow-hidden bg-[radial-gradient(circle_at_top_center,_#fff_0%,_#222_20%,_#222_100%)]">
                <div
                  className={`rounded-[20px] p-8 flex flex-col h-full ${
                    index === 1
                      ? "bg-[radial-gradient(circle_at_top_right,_#f316b0_0%,_#c0138a_5%,_#9a0f6f_9%,_#6a0c4d_15%,_#3a082b_21%,_#1a0616_27%,_#050303_34%)]"
                      : index === 2
                        ? "bg-[radial-gradient(circle_at_top_right,_#e7b442_0%,_#c99a34_5%,_#a67d2a_9%,_#7a5a1f_15%,_#4a3714_21%,_#221a0a_27%,_#050303_34%)]"
                        : "bg-[radial-gradient(circle_at_top_right,_#9a9a9a_0%,_#7a7a7a_5%,_#4a4a4a_9%,_#1f1f1f_15%,_#050303_21%)]"
                  }`}
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
                  <h4 className="text-3xl font-normal mt-2">{plan.name}</h4>
                  <p className="font-mono text-sm opacity-70 leading-6 font-light mt-4">
                    {plan.shortDescription}
                  </p>
                  <div className="mt-8 mb-2 flex items-center gap-2">
                    <span className="text-4xl font-normal">
                      {plan.symbol}
                      {plan.price}
                    </span>
                    <span className="text-sm opacity-80 font-mono ml-2 font-light">
                      billed{" "}
                      {billingInterval === "monthly" ? "monthly" : "annually"}
                    </span>
                  </div>
                  <div className="py-8 border-b border-white/10 w-full">
                    <PrimaryButton
                      href="/dashboard"
                      className={`w-full text-center`}
                      inline={false}
                    >
                      {plan.trial ? "Start free trial" : "Deploy now"}
                    </PrimaryButton>
                  </div>
                  <ul className="mt-10 pb-10 space-y-5 flex-1">
                    {plan.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className={`flex items-center font-mono font-light gap-4 text-sm ${
                          bullet.available === false ? "opacity-50" : ""
                        }`}
                      >
                        {bullet.available === false ? (
                          <XIcon size="18px" />
                        ) : (
                          <CheckIcon size="18px" />
                        )}
                        <span>{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BlurIn>
          ))}
        </div>
      </div>
    </div>
  );
}
