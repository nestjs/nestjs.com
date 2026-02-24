import { BlurIn } from "../components/blur-in/blur-in";
import { PrimaryButton } from "../components/primary-button/primary-button";
import ScrollReveal from "../components/scroll-reveal/scroll-reveal";
import { SectionSubheading } from "../components/section-subheading/section-subheading";

const CARDS = [
  {
    icon: <img src="/icons/path.svg" />,
    title: "Providing technical guidance & architectural reviews",
  },
  {
    icon: <img src="/icons/members.svg" />,
    title: "Mentoring team members",
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6694 8.00016V12.0002H6.66938V8.00016H10.6694ZM4.00271 5.3335V14.6668H13.3361V5.3335H4.00271ZM17.3361 5.3335H28.0027V8.00016H17.3361V5.3335ZM17.3361 14.6668H28.0027V17.3335H17.3361V14.6668ZM17.3361 24.0002H28.0027V26.6668H17.3361V24.0002ZM14.2789 21.6096L12.3932 19.724L8.00271 24.1146L5.61218 21.724L3.72656 23.6096L8.00271 27.8858L14.2789 21.6096Z"
          fill="white"
        />
      </svg>
    ),
    title: "Advising best practices",
  },
  {
    icon: <img src="/icons/security.svg" />,
    title: "Addressing security & performance concerns",
  },
  {
    icon: <img src="/icons/reviews.svg" />,
    title: "Performing in-depth code reviews",
  },
  {
    icon: <img src="/icons/lts.svg" />,
    title: "Long-term support (LTS) & upgrade assistance",
  },
];

export function EnterpriseSection() {
  return (
    <>
      <div className="flex justify-center mt-30">
        <div className="container relative">
          <div className="grid grid-cols-[50%_10%_40%] gap-0">
            <div>
              <BlurIn duration={0.5}>
                <SectionSubheading>
                  Official Enterprise Support
                </SectionSubheading>
              </BlurIn>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium text-5xl mb-4 leading-14"
                enableBlur
              >
                Scale your enterprise with official support from the experts
                behind Nest
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light pt-10"
              ElementTag="p"
              enableBlur
            >
              Implementing Nest in our company was a turning point for how we
              manage energy and operations. The system is intuitive, reliable,
              and has given us clear visibility into our consumption and savings
              from day one.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container relative">
          <div className="card-responsive grid grid-cols-3 gap-0 mt-20">
            <style>
              {`
                .enterprise-card {
                  --border-color: rgba(255, 255, 255, 0.15);
                  --border-radius: 20px;
                  border-radius: 0;
                  border-left-color: var(--border-color);
                  border-right-color: var(--border-color);
                  border-bottom-color: var(--border-color);
                  border-top-color: var(--border-color);
                  border-style: solid;
                  border-top-width: 1px;
                  border-left-width: 1px;
                }

                .enterprise-card:nth-of-type(1) {
                  border-top-left-radius: var(--border-radius);
                }

                .enterprise-card:nth-of-type(3) {
                  border-top-right-radius: var(--border-radius);
                }

                .enterprise-card:nth-of-type(4) {
                  border-bottom-left-radius: var(--border-radius);
                }

                .enterprise-card:nth-of-type(6) {
                  border-bottom-right-radius: var(--border-radius);
                }

                .enterprise-card:nth-of-type(n+4) {
                  border-bottom-width: 1px;
                }

                .enterprise-card:nth-of-type(3),
                .enterprise-card:nth-of-type(6) {
                  border-right-width: 1px;
                }
              `}
            </style>
            {CARDS.map((card, index) => (
              <BlurIn
                key={index}
                delay={0.1 + index * 0.1}
                duration={0.8}
                distance={10}
                className="enterprise-card"
              >
                <div className="flex flex-col relative text-white flex-start h-full card flex flex-col justify-center relative aspect-[4/3] min-h-[200px] w-full max-w-full px-16 py-8">
                  {card.icon && <div className="mb-8">{card.icon}</div>}
                  <h3 className={`text-left font-medium text-lg m-0 mb-1`}>
                    {card.title}
                  </h3>
                </div>
              </BlurIn>
            ))}
          </div>
          <div className="my-20 justify-center flex">
            <BlurIn duration={0.5}>
              <PrimaryButton>Request enterprise support</PrimaryButton>
            </BlurIn>
          </div>
        </div>
      </div>
    </>
  );
}
