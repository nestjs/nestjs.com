import { useState } from "react";
import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

export type FaqItem = {
  question: string;
  answer: string | React.ReactNode;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do courses have subtitles (Closed Captions)?",
    answer:
      "Yes! All courses have subtitles (Closed Captions) and full written transcripts for each lesson in English.",
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "All course purchases have unlimited lifetime access & free updates. No subscriptions needed, you can access the course anytime, forever.",
  },
  {
    question: "What are my payment options?",
    answer:
      "Our online checkout accepts all major Credit Cards and Google Pay. Checkout is a fully secure 128-bit SSL encrypted payment system through Stripe.",
  },
  {
    question: "Do you offer large team discounts?",
    answer: (
      <>
        Yes of course! Please contact us at{" "}
        <a href="mailto:support@nestjs.com" className="text-white underline">
          support@nestjs.com
        </a>{" "}
        about the size of your team, and we can help you purchase all course
        licenses with discount codes.
      </>
    ),
  },
  {
    question: "Can I share my course with someone else?",
    answer: (
      <>
        Each purchase is limited to <strong>ONE</strong> license & user viewing
        the course. Our licensing agreement prohibits any form of sharing.
        Account activity is tracked and abuse of copyright taken very seriously.
        If you are purchasing for larger teams (10+) shoot us an email at{" "}
        <a href="mailto:support@nestjs.com" className="text-white underline">
          support@nestjs.com
        </a>{" "}
        to retrieve a large-team discount code.
      </>
    ),
  },
  {
    question: "Do I receive a certificate of completion?",
    answer:
      "Yes. When completing each course you will receive an official Certificate indicating that you have completed each Nest certified course. You can download an official certificate of completion that can be used to be reimbursed by your employer or land that dream job you are applying for.",
  },
];

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
            d={open ? "M6 0V12M0 6H12" : "M0 6H12"}
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    </div>
  );
}

export default function FaqSection({ className }: { className?: string }) {
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
        {FAQ_ITEMS.map(({ question, answer }, index) => (
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
