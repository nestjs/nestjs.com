import classes from "./animated-line.module.scss";

export function AnimatedLine({
  left,
  top,
  delay,
}: {
  left: string;
  top: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${classes.line}`}
      style={{ left, top, animationDelay: `${delay ?? 0}s` }}
    >
      <span
        className={`${classes.innerLine}`}
        style={{ animationDelay: `${delay ?? 0}s` }}
      ></span>
      <span
        className={`${classes.innerDot}`}
        style={{ animationDelay: `${delay ?? 0}s` }}
      ></span>
    </div>
  );
}
