import React, { useEffect, useRef, useState } from "react";

const StaticCodeEditor: React.FC = () => {
  const files = ["Bootstrap", "Controller", "Module"];

  // Store code for each tab
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

  // Highlight TypeScript/JS keywords, braces, strings
  const highlightCode = (text: string) => {
    const keywords = /(import|from|async|function|const|await)/g;
    const methodEndings = /(\w+)(?=\()/g;
    const braces = /({|})/g;
    const strings = /('[^']*'|`[^`]*`)/g;

    return text
      .replace(strings, `<span class="text-[#ea2845]">$1</span>`)
      .replace(keywords, `<span class="text-blue-400">$1</span>`)
      .replace(braces, `<span class="text-gray-300">$1</span>`)
      .replace(methodEndings, `<span class="text-[#DE9C33]">$1</span>`)
      .replace(/\n/g, "<br>")
      .replace(/  /g, "&nbsp;&nbsp;");
  };

  // Update contentEditable div whenever the active tab changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = highlightCode(codeMap[activeTab]);
    }
  }, [activeTab, codeMap]);

  // Handle user typing
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
      <div className="outer-border" />
      <div className="absolute w-full h-full flex justify-center items-center">
        <div
          className="absolute w-[40%] h-[25%] rotate-320 bg-gradient-to-r from-[#ea2845] to-[#f47a87] 
            left-0 top-[20%] scale-x-200 perspective-500 perspective-origin-top-left
            rounded-[24px] filter blur-2xl 
            animate-blob"
        />
      </div>
      <div className="relative z-10 rounded-[6px] overflow-hidden">
        <div className="flex font-semibold bg-[#1A1A1A] border-b border-[rgba(255,255,255,0.1)] px-10 py-6">
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
        <div className="font-mono font-light flex bg-[#181818] p-18 font-light relative overflow-hidden">
          <div className="absolute top-[-25%] left-1/2 rounded-full transform -translate-x-1/2 w-[50%] h-[50%] opacity-5 bg-[radial-gradient(circle,_#fff,_transparent)] blur-lg" />
          <div className="text-right mr-2 select-none text-[#5A5A5A]">
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
      <div
        className="absolute bottom-0 left-[-21px] right-[-30px] bg-gradient-to-t from-[var(--color-bg)] to-transparent
        z-[10] w-[calc(100%+60px)] h-[500px] translate-y-7"
      />
      <div
        className="absolute right-0 top-[-50px] bottom-0 bg-gradient-to-l from-[var(--color-bg)] to-transparent
        z-[10] w-[300px] h-full translate-y-7"
      />
    </div>
  );
};

export default StaticCodeEditor;
