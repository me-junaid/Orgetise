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
      <h1 className="the-subheadings gsap-emt">What more</h1>
      <div className="contain-stacks">
        {STACKS.map((item, index) => (
          <div className="our-stacks" key={index}>
            <i className={item.icon}></i>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
