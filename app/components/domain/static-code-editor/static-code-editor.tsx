import React, { useEffect, useRef, useState } from "react";
import BlobCursor from "../../effects/blob-cursor/blob-cursor";

export function StaticCodeEditor() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [innerText, setInnerText] = useState("Copy");
  const editorTabsRef = useRef<HTMLDivElement>(null);
  const outerBorderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(true);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setShowTooltip(false);
  };

  const files = ["Bootstrap", "Controller", "Module"];

  const [codeMap, setCodeMap] = useState<Record<string, string>>({
    Bootstrap: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();`,
    Controller: `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`,
    Module: `# Sample Project

This is a demo project to show a custom editor component
with multiple tabs and syntax highlighting.`,
  });

  const [activeTab, setActiveTab] = useState("Bootstrap");
  const editorRef = useRef<HTMLDivElement>(null);

  const highlightCode = (text: string) => {
    const keywords = /\b(import|from|async|function|const|await)\b/g;
    const methodEndings = /(\w+)(?=\()/g;
    const braces = /({|})/g;
    const strings = /('[^']*'|`[^`]*`)/g;

    return text
      .replace(strings, `<span class="text-[#ffa657]">$1</span>`)
      .replace(keywords, `<span class="text-[#ff7b72]">$1</span>`)
      .replace(braces, `<span class="text-gray-300">$1</span>`)
      .replace(methodEndings, `<span class="text-[#a5d6ff]">$1</span>`)
      .replace(/\n/g, "<br>")
      .replace(/  /g, "&nbsp;&nbsp;");
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = highlightCode(codeMap[activeTab]);
    }
  }, [activeTab, codeMap]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setCodeMap((prev) => ({ ...prev, [activeTab]: text }));
  };

  return (
    <div className="border-16 border-[rgba(255,255,255,0.15)] rounded-[24px] w-[140%] relative">
      <style>
        {`
          .outer-border {
            position: absolute;
            top: -16px;
            left: -16px;
            right: -16px;
            bottom: -16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            z-index: 4;
          }
          .outer-border::before {
            content: '';
            position: absolute;
            top: -6px;
            left: -6px;
            right: -6px;
            bottom: -6px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 28px;
            z-index: 5;
          }
        `}
      </style>
      <div className="outer-border" ref={outerBorderRef} />
      <div className="absolute w-full h-full flex justify-center items-center">
        <div
          className="absolute w-[40%] h-[25%] rotate-320 bg-gradient-to-r from-[#ea2845] to-[#f47a87] 
            left-0 top-[20%] scale-x-200 perspective-500 perspective-origin-top-left
            rounded-[24px] filter blur-2xl 
            animate-blob"
        />
      </div>
      <div className="relative z-10 rounded-[6px] overflow-hidden">
        <div
          className="flex font-semibold bg-[#1A1A1A] border-b border-[rgba(255,255,255,0.1)] px-10 py-6"
          ref={editorTabsRef}
        >
          {files.map((file) => (
            <div
              key={file}
              onClick={() => setActiveTab(file)}
              className={`px-4 py-1 cursor-pointer ${
                file === activeTab
                  ? "text-white"
                  : "text-[rgba(255,255,255,0.25)]"
              }`}
            >
              {file}
            </div>
          ))}
        </div>
        <div className="font-mono font-light flex bg-[#181818] py-18 pl-18 font-light relative overflow-hidden">
          <div className="absolute top-[-25%] left-1/2 rounded-full transform -translate-x-1/2 w-[50%] h-[50%] opacity-5 bg-[radial-gradient(circle,_#fff,_transparent)] blur-lg" />
          <div className="text-right mr-2 select-none text-[#5A5A5A] w-[20px]">
            {codeMap[activeTab].split("\n").map((_, idx) => (
              <div key={idx} className="h-10 leading-10">
                {idx + 1}
              </div>
            ))}
          </div>

          <div
            ref={editorRef}
            contentEditable
            spellCheck={false}
            onInput={handleInput}
            className="flex-1 outline-none whitespace-pre overflow-x-auto px-2 leading-10 pb-40"
          />
        </div>
      </div>
      {/* Copy button and tooltip */}
      <div
        className="absolute top-[80px] bottom-0 left-[100px] right-0 z-[101] cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          navigator.clipboard.writeText(codeMap[activeTab]);
          setInnerText("Copied!");
          setTimeout(() => setInnerText("Copy"), 2000);
        }}
      >
        <BlobCursor
          innerText={innerText}
          shadowColor="none"
          show={showTooltip}
        />
      </div>
      <div
        className="absolute bottom-0 left-[-21px] right-[-30px] bg-gradient-to-t from-[var(--color-bg)] to-transparent
        z-[10] w-[calc(100%+60px)] h-[300px] translate-y-7"
      />
      <div
        className="absolute right-0 top-[-50px] bottom-0 bg-gradient-to-l from-[var(--color-bg)] to-transparent
        z-[10] w-[300px] h-full translate-y-7"
      />
      {/* <div
        ref={tooltipRef}
        className={`absolute rounded-full bg-white text-black w-[192px] h-[192px] 
          z-100 flex items-center justify-center transform -translate-x-1/2
          ${showTooltip ? "scale-100" : "scale-0"} transition-transform duration-200 pointer-events-none`}
        style={{ left: tooltipPos.x, top: tooltipPos.y }}
      >
        <span
          className={`font-semibold text-base ${
            showTooltip ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 delay-200
          `}
        >
          Copy to clipboard
        </span>
      </div> */}
    </div>
  );
}
