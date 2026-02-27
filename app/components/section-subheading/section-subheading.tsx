import TextType from "../text-type/text-type";

export function SectionSubheading({ children }: { children: React.ReactNode }) {
  const typingSpeed =
    typeof children === "string" ? 1000 / children.length : 100;
  return (
    <h4 className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4 font-light">
      <TextType
        text={`{ ${children} }`}
        typingSpeed={typingSpeed}
        loop={false}
        cursorCharacter="_"
        startOnVisible
      />
    </h4>
  );
}
