import AnimatedContent from "../../marketing-ui/components/animations/animated-content/animated-content";

type Bulletpoint = {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  footnote?: React.ReactNode;
  videoId?: string;
};

export function CourseBulletpoints({
  bulletpoints,
  setSelectedVideoId,
}: {
  bulletpoints: Bulletpoint[];
  setSelectedVideoId: (videoId: string) => void;
}) {
  return (
    <>
      {bulletpoints.map((item, index) => (
        <AnimatedContent
          key={index}
          delay={index * 0.2}
          distance={10}
          duration={0.8}
        >
          <div
            key={index}
            className={`${index !== bulletpoints.length - 1 ? "border-b border-white/10" : ""} w-full py-8 flex gap-8 items-center`}
          >
            {typeof item.icon === "string" ? (
              <img src={item.icon} alt={`${item.title} Icon`} />
            ) : (
              item.icon
            )}
            <div className="">
              <AnimatedContent delay={0.15} distance={10} duration={0.8}>
                <h5 className="text-lg">{item.title}</h5>
              </AnimatedContent>
              <AnimatedContent delay={0.3} distance={10} duration={0.8}>
                <p className="font-mono text-sm opacity-70 leading-6 font-light mt-2">
                  {item.description}
                </p>
                {item.footnote && (
                  <div className="mt-2 text-[var(--primary-color)] hover:underline font-semibold">
                    {item.videoId ? (
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => setSelectedVideoId(item.videoId!)}
                        type="button"
                      >
                        {item.footnote}
                      </button>
                    ) : (
                      item.footnote
                    )}
                  </div>
                )}
              </AnimatedContent>
            </div>
          </div>
        </AnimatedContent>
      ))}
    </>
  );
}
