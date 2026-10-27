"use client";

import React, { useRef, useState, useEffect } from "react";

interface TuneYourAiProps {
  onScrollTo: (targetId: string) => void;
}

interface TestMessage {
  role: "user" | "assist";
  content: string;
}

export default function TuneYourAi({ onScrollTo }: TuneYourAiProps) {
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [isTestMode, setIsTestMode] = useState(false);
  const [testInput, setTestInput] = useState("");
  const [testChat, setTestChat] = useState<TestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testResponseRef = useRef<HTMLDivElement>(null);
  const testInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTestMode && testInputRef.current) {
      testInputRef.current.focus();
    }
  }, [isTestMode]);

  useEffect(() => {
    if (testResponseRef.current) {
      testResponseRef.current.scrollTop = testResponseRef.current.scrollHeight;
    }
  }, [testChat, isLoading]);

  const handleSwitchToTest = () => {
    if (knowledgeBase.trim().length > 0) {
      setIsTestMode(true);
    }
  };

  const handleSwitchToTune = () => {
    setIsTestMode(false);
  };

  const handleSendTestMessage = async () => {
    const text = testInput.trim();
    if (!text || isLoading) return;

    const newChat: TestMessage[] = [...testChat, { role: "user", content: text }];
    setTestChat(newChat);
    setTestInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tune",
          message: text,
          context: knowledgeBase,
        }),
      });

      const data = await res.json();
      setTestChat([
        ...newChat,
        {
          role: "assist",
          content: data.text || "No response received.",
        },
      ]);
    } catch {
      setTestChat([
        ...newChat,
        {
          role: "assist",
          content: "<p>Error connecting to AI. Please try again.</p>",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 id="tune-head" className="gsap-emt text-[40px] min-[825px]:text-[55px] mt-[50px] min-[825px]:mt-[70px] text-center min-[825px]:text-left min-[825px]:ml-[calc(6vw+20px)] opacity-80 ">
        Try <span className="linear">Tune</span> your AI
      </h1>
      <div className="gsap-emt flex flex-col my-[100px] mt-[10px] px-[20px] min-[825px]:px-[6vw] min-[825px]:pl-[calc(6vw+10px)]">
        <textarea
          id="tune-textarea"
          className="grow resize-none p-[20px] rounded-[15px] h-[calc(50vh-20px)] min-[825px]:h-[50vh] focus:outline-none border-[25px] border-[hsl(120,100%,95%)] bg-white"
          placeholder={`Knowledge base here... \n\nYou are a helpful assist for [Organisation name]. [Overview about the Organisation].\n`}
          maxLength={1000}
          value={knowledgeBase}
          onChange={(e) => setKnowledgeBase(e.target.value)}
          style={{ display: isTestMode ? "none" : "flex" }}
        ></textarea>

        <div
          className="grow p-[10px] min-[825px]:p-[20px] rounded-[15px] h-[50vh] flex-col relative bg-[rgb(250,252,250)] border border-transparent"
          id="test-your-build"
          style={{ display: isTestMode ? "flex" : "none" }}
        >
          <div
            className="absolute top-[7px] min-[825px]:top-[10px] right-[7px] min-[825px]:right-[10px] cursor-pointer text-[25px] w-[25px] h-[25px] min-[825px]:w-[30px] min-[825px]:h-[30px] rounded-full flex justify-center items-center bg-[rgb(250,252,250)] border border-[#e5ffe5]"
            onClick={handleSwitchToTune}
            role="button"
            aria-label="Close test mode"
          >
            <i className="bi bi-x"></i>
          </div>

          <div className="grow rounded-[10px] mb-[10px] p-[10px] px-[20px] bg-white flex flex-col overflow-y-auto scroll-smooth" id="test-response" ref={testResponseRef}>
            <img src="/orgetise.png" alt="Orgetise" draggable={false} className="w-[50px] mx-auto mt-auto select-none" />
            <h1 id="para-test-response" className="text-[23px] min-[825px]:text-[2rem] mx-auto text-center opacity-60 text-[rgb(0,77,0)] font-semibold">Start messaging your AI</h1>
            <p className="text-[12px] min-[825px]:text-[14px] text-center opacity-40 mb-auto">reminder: this is for the testing purpose, not the advanced one.</p>

            <div className="flex flex-col gap-[10px] mt-[30px]" id="test-response-chat">
              {testChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.role === "user" ? "max-w-[70%] ml-auto py-[15px] px-[30px] rounded-[10px] bg-[#e5ffe5]" : "py-[15px] px-0"}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              ))}
              {isLoading && (
                <div className="py-[15px] px-0">
                  <em>Thinking...</em>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0">
            <input
              id="test-input"
              ref={testInputRef}
              className="grow py-[10px] px-[15px] min-[825px]:px-[20px] min-[825px]:pl-[4vw] h-[30px] rounded-[10px] focus:outline-none border-2 border-[rgb(250,252,250)] bg-white placeholder:font-medium"
              placeholder="Enter your test INPUT here..."
              autoComplete="off"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendTestMessage();
                }
              }}
            />
            <div
              className="self-center ml-[6px] w-[45px] h-[45px] rounded-full flex justify-center items-center bg-[#e5ffe5] cursor-pointer"
              id="test-input-send"
              onClick={handleSendTestMessage}
              role="button"
              aria-label="Send test query"
            >
              <i className="bi bi-arrow-up text-[24px]"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-col-reverse" id="input-for-tuned-ai">
          <div className="grow h-[50px] border-none flex items-center gap-[20px]">
            <button
              onClick={handleSwitchToTest}
              id="tune-test-button"
              className="h-[40px] px-[14px] rounded-[10px] border-none font-medium w-[110px] cursor-pointer transition-colors"
              style={{
                backgroundColor: isTestMode
                  ? "lightgreen"
                  : "rgba(140, 140, 140, 0.11)",
              }}
            >
              Test
            </button>
            <button
              id="integrate-build"
              className="h-[40px] px-[14px] rounded-[10px] border-none font-medium w-[110px] cursor-pointer bg-[rgba(140,140,140,0.11)]"
              onClick={() => onScrollTo("find-the-build-textarea")}
            >
              Integrate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
