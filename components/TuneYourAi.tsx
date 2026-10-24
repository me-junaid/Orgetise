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
      <h1 id="tune-head" className="the-subheadings gsap-emt">
        Try <span className="linear">Tune</span> your AI
      </h1>
      <div className="tune-your-ai gsap-emt">
        <textarea
          id="tune-textarea"
          placeholder={`Knowledge base here... \n\nYou are a helpful assist for [Organisation name]. [Overview about the Organisation].\n`}
          maxLength={1000}
          value={knowledgeBase}
          onChange={(e) => setKnowledgeBase(e.target.value)}
          style={{ display: isTestMode ? "none" : "flex" }}
        ></textarea>

        <div
          className="test-your-build"
          id="test-your-build"
          style={{ display: isTestMode ? "flex" : "none" }}
        >
          <div
            className="close-test-your-build"
            onClick={handleSwitchToTune}
            role="button"
            aria-label="Close test mode"
          >
            <i className="bi bi-x"></i>
          </div>

          <div className="test-response" id="test-response" ref={testResponseRef}>
            <img src="/orgetise.png" alt="Orgetise" draggable={false} />
            <h1 id="para-test-response">Start messaging your AI</h1>
            <p>reminder: this is for the testing purpose, not the advanced one.</p>

            <div className="test-response-chat" id="test-response-chat">
              {testChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.role === "user" ? "test-user-chat" : "test-assist-chat"}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              ))}
              {isLoading && (
                <div className="test-assist-chat">
                  <em>Thinking...</em>
                </div>
              )}
            </div>
          </div>

          <div className="test-input">
            <input
              id="test-input"
              ref={testInputRef}
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
              className="test-input-send"
              id="test-input-send"
              onClick={handleSendTestMessage}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label="Send test query"
            >
              <i className="bi bi-arrow-up"></i>
            </div>
          </div>
        </div>

        <div className="input-for-tuned-ai" id="input-for-tuned-ai">
          <div className="tune-buttons">
            <button
              onClick={handleSwitchToTest}
              id="tune-test-button"
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
