import type { CourseCurriculumBlock } from "../../marketing-ui/components/domain/course-curriculum/course-curriculum";

export const FUNDAMENTALS_CURRICULUM: CourseCurriculumBlock[] = [
  {
    title: "Getting Started",
    lessonCountLabel: "4 lessons",
    isOpened: true,
    lessons: [
      { title: "Introduction to NestJS", duration: "3:54" },
      {
        title: "Installing the NestJS CLI (command-line interface)",
        duration: "1:27",
      },
      {
        title: "Generating our first NestJS Application",
        duration: "1:32",
        isPreview: true,
        videoId: "433942660",
      },
      { title: "What's inside a NestJS Application", duration: "4:04" },
      {
        title: "What we'll be building in this course",
        kind: "article",
      },
      {
        title: "Beginning your NestJS Journey",
        kind: "article",
      },
    ],
  },
  {
    title: "Creating a REST API application",
    lessonCountLabel: "15 lessons",
    lessons: [
      { title: "Prerequisite: Install Insomnia", duration: "0:29" },
      { title: "Running NestJS in Development Mode", duration: "1:06" },
      { title: "Creating a Basic Controller", duration: "4:52" },
      {
        title: "Use Route Parameters",
        duration: "2:05",
        isPreview: true,
        videoId: "433943559",
      },
      { title: "Handling Request Body / Payload", duration: "1:48" },
      { title: "Response Status Codes", duration: "4:13" },
      {
        title: "Handling Update and Delete Requests",
        duration: "3:04",
      },
      {
        title: "Implement Pagination with Query Parameters",
        duration: "2:19",
      },
      { title: "Creating a Basic Service", duration: "7:53" },
      {
        title: "Send User-Friendly Error Messages",
        duration: "3:49",
      },
      {
        title: "Encompass Business-Domain in Modules",
        duration: "4:37",
      },
      {
        title: "Introduction to Data Transfer Objects",
        duration: "6:29",
      },
      {
        title: "Validate Input Data with Data Transfer Objects",
        duration: "7:24",
        isPreview: true,
        videoId: "447088958",
      },
      { title: "Handling Malicious Request Data", duration: "2:09" },
      {
        title: "Auto-transform Payloads to DTO instances",
        duration: "3:01",
      },
      {
        title: "Chapter 2 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Add PostgreSQL with TypeORM",
    lessonCountLabel: "13 lessons",
    lessons: [
      { title: "Before we Get Started", duration: "0:46" },
      { title: "Prerequisite: Install Docker", duration: "2:09" },
      { title: "Running PostgreSQL", duration: "3:06" },
      { title: "Introducing the TypeORM Module", duration: "4:04" },
      { title: "Creating a TypeORM Entity", duration: "4:00" },
      { title: "Use Repository to Access Database", duration: "7:02" },
      {
        title: "Create a Relation between two Entities",
        duration: "6:14",
      },
      {
        title: "Retrieve Entities with their Relations",
        duration: "3:14",
      },
      {
        title: "Using Cascading Inserts and Updates",
        duration: "4:49",
      },
      { title: "Adding Pagination", duration: "4:55" },
      { title: "Use Transactions", duration: "5:33" },
      { title: "Adding Indexes to Entities", duration: "0:54" },
      { title: "Setting up Migrations", duration: "6:57" },
      {
        title: "Chapter 3 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Dependency Injection",
    lessonCountLabel: "11 lessons",
    lessons: [
      {
        title: "Understand Dependency Injection",
        duration: "3:59",
        isPreview: true,
        videoId: "430687886",
      },
      {
        title: "Control NestJS Module Encapsulation",
        duration: "3:06",
      },
      { title: "Diving Into Custom Providers", duration: "1:17" },
      { title: "Value based Providers", duration: "0:56" },
      {
        title: "Non-class-based Provider Tokens",
        duration: "3:10",
      },
      { title: "Class Providers", duration: "1:03" },
      { title: "Factory Providers", duration: "2:20" },
      { title: "Leverage Async Providers", duration: "2:08" },
      { title: "Create a Dynamic Module", duration: "3:55" },
      { title: "Control Providers Scope", duration: "3:59" },
      {
        title: "Diving Deeper Into Request-Scoped Providers",
        duration: "3:23",
      },
      {
        title: "Chapter 4 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Application Configuration",
    lessonCountLabel: "7 lessons",
    lessons: [
      { title: "Introducing the Config Module", duration: "4:41" },
      { title: "Custom Environment File Paths", duration: "1:17" },
      { title: "Schema Validation", duration: "2:59" },
      { title: "Using the Config Service", duration: "2:19" },
      { title: "Custom Configuration Files", duration: "4:32" },
      {
        title: "Configuration Namespaces and Partial Registration",
        duration: "4:58",
      },
      {
        title: "Asynchronously Configure Dynamic Modules",
        duration: "3:08",
      },
      {
        title: "Chapter 5 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Other Building Blocks by Example",
    lessonCountLabel: "10 lessons",
    lessons: [
      { title: "Introducing More Building Blocks", duration: "2:20" },
      { title: "Understanding Binding Techniques", duration: "6:19" },
      { title: "Catch Exceptions with Filters", duration: "7:24" },
      { title: "Protect Routes with Guards", duration: "7:39" },
      {
        title: "Using Metadata to Build Generic Guards or Interceptors",
        duration: "10:05",
      },
      {
        title: "Add Pointcuts with Interceptors",
        duration: "7:01",
        isPreview: true,
        videoId: "447091051",
      },
      {
        title: "Handling Timeouts with Interceptors",
        duration: "4:02",
      },
      { title: "Creating Custom Pipes", duration: "5:48" },
      {
        title: "Bonus: Add Request Logging with Middleware",
        duration: "6:15",
      },
      {
        title: "Bonus: Create Custom Param Decorators",
        duration: "3:49",
      },
      {
        title: "Chapter 6 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Generating OpenAPI Specification",
    lessonCountLabel: "5 lessons",
    lessons: [
      { title: "Introducing the Swagger Module", duration: "3:44" },
      { title: "Enabling CLI Plugin", duration: "3:42" },
      { title: "Decorating Model Properties", duration: "1:20" },
      { title: "Adding Example Responses", duration: "2:03" },
      { title: "Using Tags to Group Resources", duration: "1:04" },
      {
        title: "Chapter 7 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Testing",
    lessonCountLabel: "6 lessons",
    lessons: [
      { title: "Introduction to Jest", duration: "1:50" },
      { title: "Getting Started with Test Suites", duration: "8:44" },
      { title: "Adding Unit Tests", duration: "7:43" },
      { title: "Diving Into e2e Tests", duration: "6:08" },
      { title: "Creating our First e2e Test", duration: "6:58" },
      { title: "Implementing e2e Test Logic", duration: "4:11" },
      {
        title: "Chapter 8 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
  {
    title: "Bonus: Add MongoDB with Mongoose",
    lessonCountLabel: "9 lessons",
    lessons: [
      { title: "Before we Get Started", duration: "0:43" },
      { title: "Prerequisite: Install Docker", duration: "2:31" },
      { title: "Running MongoDB", duration: "2:59" },
      { title: "Introducing the Mongoose Module", duration: "2:45" },
      { title: "Creating a Mongoose Model", duration: "4:51" },
      {
        title: "Using a Mongoose Model to Access MongoDB",
        duration: "8:41",
      },
      { title: "Adding Pagination", duration: "4:56" },
      { title: "Use Transactions", duration: "6:03" },
      { title: "Adding Indexes to Schemas", duration: "1:17" },
      {
        title: "Chapter 9 - Review Quiz",
        kind: "quiz",
      },
    ],
  },
];
