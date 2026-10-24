"use client";

import React, { useEffect, useState } from "react";

interface TypingBannerProps {
  onOpenWithPrompt: (prompt: string) => void;
}

const WORDS = ["Tune", "Build", "Integrate"];

export default function TypingBanner({ onOpenWithPrompt }: TypingBannerProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const currentWord = WORDS[wordIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIdx < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 100);
    } else if (!isDeleting && charIdx === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 60);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onOpenWithPrompt(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="rows main-2" id="chat-input">
      <div className="columns columns-1">
        <h1 id="typingText" className="typing">
          {displayText}
        </h1>
      </div>
      <div className="columns columns-2" id="column-2">
        <div className="input">
          <textarea
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Hey, How can I assist you today?"
            id="main-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          ></textarea>
          <div
            className="input-send"
            id="input-send"
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Send query"
          >
            <i className="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
