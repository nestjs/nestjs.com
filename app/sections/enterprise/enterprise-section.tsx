import { BlurIn } from "../../components/animations/blur-in/blur-in";
import ScrollReveal from "../../components/animations/scroll-reveal/scroll-reveal";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button";
import { SectionSubheading } from "../../components/domain/section-subheading/section-subheading";

const CARDS = [
  {
    icon: <img src="/enterprise-icons/path.svg" />,
    title: "Providing technical guidance & architectural reviews",
  },
  {
    icon: <img src="/enterprise-icons/members.svg" />,
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
    icon: <img src="/enterprise-icons/security.svg" />,
    title: "Addressing security & performance concerns",
  },
  {
    icon: <img src="/enterprise-icons/reviews.svg" />,
    title: "Performing in-depth code reviews",
  },
  {
    icon: <img src="/enterprise-icons/lts.svg" />,
    title: "Long-term support (LTS) & upgrade assistance",
  },
];

export function EnterpriseSection({ className }: { className?: string }) {
  return (
    <>
      <div className={`flex justify-center ${className}`}>
        <div className="container relative md:px-0 px-5">
          <div className="grid md:grid-cols-[60%_10%_30%] sm:grid-cols-[60%_5%_35%] grid-rows-[auto] gap-0">
            <div>
              <SectionSubheading>Official Enterprise Support</SectionSubheading>
              <ScrollReveal
                ElementTag="h2"
                className="font-medium md:text-5xl sm:text-3xl text-4xl mb-4 md:leading-14 sm:leading-10 leading-12"
                enableBlur
              >
                Scale your enterprise with official support from the experts
                behind Nest
              </ScrollReveal>
            </div>
            <span></span>
            <ScrollReveal
              className="font-mono text-sm opacity-70 leading-6 font-light sm:pt-10 pt-4"
              ElementTag="p"
              enableBlur
            >
              Our enterprise support program offers direct access to the core
              NestJS team, providing expert guidance, architectural reviews, and
              long-term support to ensure your success at scale.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container relative md:px-0 px-5">
          <div className="card-responsive grid lg:grid-cols-3 grid-cols-2 gap-0 mt-20">
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

                @media (max-width: 1024px) {
                 .enterprise-card:nth-of-type(2) {
                    border-right-width: 1px;
                    border-top-right-radius: var(--border-radius);
                  }

                  .enterprise-card:nth-of-type(3) {
                    border-top-right-radius: 0;
                    border-right-width: 0;
                  }

                  .enterprise-card:nth-of-type(4) {
                    border-bottom-left-radius: 0;
                    border-right-width: 1px;
                    border-bottom-width: 0;
                  }

                  .enterprise-card:nth-of-type(5) {
                    border-bottom-left-radius: var(--border-radius);
                  }
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
                <div className="flex flex-col relative text-white flex-start h-full card flex flex-col sm:justify-center sm:flex-start relative lg:aspect-[4/3] min-h-[200px] w-full max-w-full md:px-16 md:py-8 px-8 py-12">
                  {card.icon && <div className="mb-8">{card.icon}</div>}
                  <h3
                    className={`text-left font-medium xl:text-lg text-md m-0 mb-1`}
                  >
                    {card.title}
                  </h3>
                </div>
              </BlurIn>
            ))}
          </div>
          <div className="my-20 justify-center flex">
            <BlurIn duration={0.5} delay={0.5}>
              <PrimaryButton href="mailto:enterprise@nestjs.com">
                Request enterprise support
              </PrimaryButton>
            </BlurIn>
          </div>
        </div>
      </div>
    </>
  );
}
