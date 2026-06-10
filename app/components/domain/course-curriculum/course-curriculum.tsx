import { PlayCircleIcon } from "@phosphor-icons/react";
import { FileText, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";

export type CourseCurriculumLesson = {
  title: string;
  duration?: string;
  kind?: "article" | "quiz";
  isPreview?: boolean;
  videoId?: string;
};

export type CourseCurriculumBlock = {
  title: string;
  lessonCountLabel: string;
  isOpened?: boolean;
  lessons: CourseCurriculumLesson[];
};

type CourseCurriculumProps = {
  blocks: CourseCurriculumBlock[];
};

type CourseVideoModalProps = {
  videoId: string | null;
  onClose: () => void;
};

function getInitialOpenState(blocks: CourseCurriculumBlock[]) {
  return Object.fromEntries(
    blocks.map((block) => [block.title, Boolean(block.isOpened)]),
  ) as Record<string, boolean>;
}

function formatLessonIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function LessonChip({
  kind,
}: {
  kind: NonNullable<CourseCurriculumLesson["kind"]>;
}) {
  if (kind === "quiz") {
    return (
      <span className="inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
        <ListChecks className="h-3.5 w-3.5" />
        Quiz
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
      <FileText className="h-3.5 w-3.5" />
      article
    </span>
  );
}

export function CourseVideoModal({ videoId, onClose }: CourseVideoModalProps) {
  if (!videoId) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="w-full max-w-[1170px] overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&sidedock=0`}
          width="1170"
          height="675"
          frameBorder="0"
          className="featured-lesson aspect-video h-auto w-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Featured lesson"
        ></iframe>
      </div>
    </div>
  );
}

export function CourseCurriculum({ blocks }: CourseCurriculumProps) {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>(() =>
    getInitialOpenState(blocks),
  );
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    setOpenBlocks(getInitialOpenState(blocks));
  }, [blocks]);

  const toggleBlock = (title: string) => {
    setOpenBlocks((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const closeVideoModal = () => {
    setSelectedVideoId(null);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        const isOpen = openBlocks[block.title] ?? false;
        const panelId = `course-curriculum-panel-${index}`;

        return (
          <section
            className={`overflow-hidden rounded-[20px] ${isOpen ? "mb-8" : ""}`}
            key={block.title}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className={`${isOpen ? "bg-white text-black" : "border border-white/10 text-white rounded-[20px]"}
              flex w-full items-center gap-4 md:px-8 md:py-7 px-4 py-6 text-left hover:cursor-pointer`}
              onClick={() => toggleBlock(block.title)}
              type="button"
            >
              <div className="min-w-0 flex-1">
                <h5
                  className={`text-md font-medium sm:text-lg ${isOpen ? "text-black" : "text-white"}`}
                >
                  {block.title}
                </h5>
              </div>
              <span className="shrink-0 text-sm font-mono">
                {block.lessonCountLabel}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOpen ? "M0 6H12" : "M6 0V12M0 6H12"}
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </svg>
            </button>

            {isOpen ? (
              <div
                className="border border-white/10 rounded-b-[20px]"
                id={panelId}
              >
                {block.lessons.map((lesson, lessonIndex) => (
                  <div
                    className="flex flex-col gap-3 border-b border-white/10 md:px-6 md:py-8 px-4 py-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
                    key={lesson.title}
                  >
                    <div className="min-w-0 flex-1 text-white">
                      <h6 className={`text-sm font-mono font-light`}>
                        <span className="sm:mr-6 mr-4 font-mono text-xs">
                          [ {formatLessonIndex(lessonIndex)} ]
                        </span>
                        {lesson.title}
                      </h6>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      {lesson.duration ? (
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs sm:text-sm ${lesson.videoId ? "" : "text-[#5A5A5A]"}`}
                          >
                            {lesson.duration}
                          </span>
                          {!lesson.videoId && (
                            <PlayCircleIcon
                              weight="fill"
                              className={`w-5 h-5 ${lesson.videoId ? "" : "text-[#5A5A5A]"}`}
                            />
                          )}
                        </div>
                      ) : lesson.kind ? (
                        <LessonChip kind={lesson.kind} />
                      ) : null}

                      {lesson.videoId ? (
                        <button
                          className="inline-flex items-center font-mono gap-2 rounded-[12px] bg-[var(--primary-color)] py-2 px-2.5 text-xs font-light text-white uppercase transition hover:bg-[var(--primary-color)]/18 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/60"
                          data-video-id={lesson.videoId}
                          onClick={() => setSelectedVideoId(lesson.videoId!)}
                          type="button"
                        >
                          <PlayCircleIcon
                            className="h-3.5 w-3.5 fill-current"
                            weight="fill"
                          />
                          Watch
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        );
      })}

      <CourseVideoModal videoId={selectedVideoId} onClose={closeVideoModal} />
    </div>
  );
}
