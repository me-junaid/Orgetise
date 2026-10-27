import React from "react";

const STACKS = [
  { icon: "bi bi-envelope-open-fill", label: "Email Automation Agent" },
  { icon: "bi bi-robot", label: "Virtual Agent" },
  { icon: "bi bi-person-raised-hand", label: "AI Model for E-commerce" },
  { icon: "bi bi-window-sidebar", label: "AI Dynamic Website" },
  { icon: "bi bi-search", label: "Product Search Agent" },
  { icon: "bi bi-voicemail", label: "AI Voice Assistant" },
];

export default function WhatMoreStacks() {
  return (
    <>
      <h1 className="gsap-emt text-[40px] min-[825px]:text-[55px] mt-[50px] min-[825px]:mt-[70px] text-center min-[825px]:text-left min-[825px]:ml-[calc(6vw+20px)] opacity-80">
        What more
      </h1>
      <div className="flex gap-[10px] overflow-x-scroll mt-[10px] rounded-[10px] flex-wrap shrink-0 justify-center h-auto overflow-y-hidden px-[10px] py-[10px] min-[825px]:px-[calc(6vw+10px)] snap-x snap-mandatory">
        {STACKS.map((item, index) => (
          <div
            className="our-stacks opacity-0 grow rounded-[10px] h-[100px] min-w-[260px] max-w-[400px] w-[25vw] shrink-0 p-[15px] flex justify-center flex-col items-center bg-[rgb(250,252,250)] text-center font-medium"
            key={index}
          >
            <i className={`${item.icon} text-[24px] mb-[6px]`}></i>
            <p className="text-[14px] opacity-75">{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
