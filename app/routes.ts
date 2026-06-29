import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("enterprise", "routes/enterprise.tsx"),
  route("courses", "routes/courses.tsx"),
  // extensions
  route(
    "extensions/architecture-and-advanced-patterns",
    "routes/extensions/architecture-and-advanced-patterns.tsx",
  ),
  route(
    "extensions/advanced-concepts",
    "routes/extensions/advanced-concepts.tsx",
  ),
  route(
    "extensions/authentication-and-authorization",
    "routes/extensions/authentication-and-authorization.tsx",
  ),
  route("extensions/microservices", "routes/extensions/microservices.tsx"),
  route(
    "extensions/graphql-code-first",
    "routes/extensions/graphql-code-first.tsx",
  ),
  route(
    "extensions/graphql-schema-first",
    "routes/extensions/graphql-schema-first.tsx",
  ),
  route("jobs", "routes/jobs.tsx"),
  route("tools/mau", "routes/tools-mau.tsx"),
] satisfies RouteConfig;
