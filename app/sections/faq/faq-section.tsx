import { useState } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

export type FaqItem = {
  question: string;
  answer: string | React.ReactNode;
};

function FaqListItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string | React.ReactNode;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="container relative flex sm:flex-row flex-col sm:items-center items-left border-t border-[#292929] md:py-14 py-8 cursor-pointer group"
      onClick={() => setOpen((o) => !o)}
    >
      <span className="font-mono opacity-50 text-xs group-hover:opacity-80 transition-opacity">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>
      <div className="sm:ml-14 ml-0 mt-4 sm:mt-0 transition-opacity flex-1">
        <h4 className="font-medium sm:text-2xl text-xl group-hover:opacity-65 leading-[1.4]">
          {question}
        </h4>
        {open && (
          <BlurIn
            className="mt-4"
            duration={0.3}
            distance={10}
            initialOpacity={0}
          >
            <div className="font-mono text-sm opacity-70 leading-6 font-light">
              {answer}
            </div>
          </BlurIn>
        )}
      </div>
      <div className="sm:ml-auto sm:pl-15 sm:block hidden">
        <svg
          width="32"
          height="32"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={open ? "M0 6H12" : "M6 0V12M0 6H12"}
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    </div>
  );
}

export default function FaqSection({
  className,
  items,
}: {
  className?: string;
  items: FaqItem[];
}) {
  return (
    <div className={`px-5 pt-24 pb-24 ${className}`}>
      <div className="container relative flex mx-auto flex-row items-center">
        <div className="relative">
          <SectionSubheading>Faq</SectionSubheading>
          <ScrollReveal
            ElementTag="h2"
            className="font-medium md:text-8xl sm:text-6xl text-[2.3rem] leading-[1.1]"
            enableBlur
          >
            Any questions?
          </ScrollReveal>
        </div>
      </div>
      <div className="container relative flex flex-col mx-auto sm:mt-24 mt-16 border-b border-[#292929]">
        {items.map(({ question, answer }, index) => (
          <FaqListItem
            key={index}
            question={question}
            answer={answer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
