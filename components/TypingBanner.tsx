"use client";

import React, { useEffect, useState } from "react";

interface TypingBannerProps {
  onOpenWithPrompt: (prompt: string) => void;
}

const WORDS = ["Tune", "Build", "Integrate"];

export default function TypingBanner({ onOpenWithPrompt }: TypingBannerProps) {
  const [displayText, setDisplayText] = useState("Tune");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(4);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const currentWord = WORDS[wordIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIdx < currentWord.length) {
      // Type forward
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 120);
    } else if (!isDeleting && charIdx === currentWord.length) {
      // Pause at complete word
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && charIdx > 1) {
      // Delete backward down to 1 letter (never 0 to prevent empty flicker)
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 70);
    } else if (isDeleting && charIdx === 1) {
      // Directly swap the 1st letter to the 1st letter of the next word
      const nextWordIdx = (wordIdx + 1) % WORDS.length;
      const nextWord = WORDS[nextWordIdx];
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIdx(nextWordIdx);
        setDisplayText(nextWord.substring(0, 1));
        setCharIdx(1);
      }, 120);
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
    <div className="flex flex-col-reverse min-[825px]:flex-row justify-between overflow-visible h-auto min-h-[130px] mt-[20px]" id="chat-input">
      <div id="column-1" className="rounded-[20px] m-[10px] items-center justify-center relative flex z-10 bg-white max-[824px]:self-center min-[825px]:max-w-[45vw] min-[825px]:w-[47vw]">
        <h1 id="typingText" className="typing text-[4rem] py-[50px] min-[825px]:text-[7vw] min-[825px]:py-0 select-none inline-flex items-center min-h-[1.2em]">
          {displayText}
        </h1>
      </div>
      <div id="column-2" className="rounded-[20px] max-[824px]:m-0 max-[824px]:p-0 min-[825px]:m-[10px] items-center justify-center text-center flex grow max-[824px]:bg-white min-[825px]:bg-[rgb(250,252,250)]">
        <div id="banner-input-box" className="justify-center flex m-[10px] rounded-[20px] max-[824px]:relative max-[824px]:p-[20px] max-[824px]:grow min-[825px]:bg-[rgb(250,252,250)]">
          <textarea
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Hey, How can I assist you today?"
            id="main-input"
            className="p-[20px] px-[40px] m-[10px] rounded-[10px] text-[16px] border-none bg-transparent resize-none h-[100px] text-black placeholder:text-[#585858]  focus:outline-none min-[825px]:min-w-[300px] max-[824px]:p-0 max-[824px]:pb-[50px] max-[824px]:grow max-[824px]:min-w-[10px]"
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
            className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer max-[824px]:absolute max-[824px]:bottom-0 max-[824px]:right-0 max-[824px]:bg-[rgb(250,252,250)] min-[825px]:bg-white min-[825px]:mr-[10px] min-[825px]:self-end min-[825px]:mb-[10px]"
            id="input-send"
            onClick={handleSubmit}
            role="button"
            aria-label="Send query"
          >
            <i className="bi bi-arrow-up text-[25px] text-[rgb(0,77,0)]"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
