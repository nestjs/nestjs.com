export function SectionSubheading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h4 className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4 font-light">
      {'{'} {children} {'}'}
    </h4>
  );
}