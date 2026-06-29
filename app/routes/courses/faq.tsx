import type { FaqItem } from "../../marketing-ui/sections/faq/faq-section";

export const FAQ_ITEMS: FaqItem[] = [
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
