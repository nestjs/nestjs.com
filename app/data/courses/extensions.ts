export type CourseExtension = {
  title: string;
  duration: string;
  lessonCount: number;
  color: string;
  price: number;
  discount?: number;
  subtitle?: string;
  badge?: string;
  isBundle?: boolean;
  extensionKey?: string;
  purchaseLink?: string;
};

export const COURSE_EXTENSIONS: CourseExtension[] = [
  {
    title: "All-in-One bundle",
    subtitle: "All courses",
    duration: "+17 hours",
    lessonCount: 202,
    color: "42,157,143",
    price: 349,
    discount: 30,
    badge: "Bundle -30%",
    isBundle: true,
    purchaseLink: "https://learn.nestjs.com/purchase?product_id=5772222",
  },
  {
    title: "Extensions - bundle",
    subtitle: "All extensions",
    duration: "+12 hours",
    lessonCount: 122,
    color: "233,94,43",
    price: 269,
    discount: 30,
    badge: "Bundle -30%",
    isBundle: true,
    purchaseLink: "https://learn.nestjs.com/purchase?product_id=5772223",
  },
  {
    title: "Architecture and Advanced patterns",
    duration: "2,5 hours",
    lessonCount: 21,
    color: "192,13,39",
    price: 95,
    extensionKey: "architecture",
  },
  {
    title: "Advanced concepts",
    duration: "2 hours",
    lessonCount: 18,
    color: "192,13,39",
    price: 69,
    extensionKey: "advanced-concepts",
  },
  {
    title: "GraphQL - Bundle",
    subtitle: "Code first + Schema first",
    duration: "4 hours",
    lessonCount: 44,
    color: "121,32,205",
    price: 59,
    discount: 25,
    badge: "Bundle -25%",
    isBundle: true,
    extensionKey: "graphql-bundle",
  },
  {
    title: "Authentication and Authorization",
    duration: "2 hours",
    lessonCount: 19,
    color: "166,13,116",
    price: 79,
    extensionKey: "authentication",
  },
  {
    title: "GraphQL - Code first",
    duration: "2 hours",
    lessonCount: 23,
    color: "121,32,205",
    price: 39,
    extensionKey: "code-first",
  },
  {
    title: "Microservices",
    duration: "2 hours",
    lessonCount: 20,
    color: "0,108,128",
    price: 59,
    extensionKey: "microservices",
  },
  {
    title: "Advanced - Bundle",
    subtitle: "Architecture + Concepts",
    duration: "4,5 hours",
    lessonCount: 39,
    color: "192,13,39",
    price: 129,
    discount: 22,
    badge: "Bundle -22%",
    isBundle: true,
    extensionKey: "advanced-bundle",
  },
  {
    title: "GraphQL - Schema first",
    duration: "2 hours",
    lessonCount: 21,
    color: "121,32,205",
    price: 39,
    extensionKey: "schema-first",
  },
];
