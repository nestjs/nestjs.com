import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("enterprise", "routes/enterprise.tsx"),
  route("courses", "routes/courses.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("tools/mau", "routes/tools-mau.tsx"),
] satisfies RouteConfig;
