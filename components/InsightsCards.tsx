"use client";

import React, { useRef } from "react";

const INSIGHTS = [
  {
    title: "Ecommerce",
    points: [
      {
        heading: "Product Recommendations",
        desc: "Instantly suggesting relevant products based on search terms.",
      },
      {
        heading: "Chatbots and Virtual Assistants",
        desc: "AI-powered chatbots provide 24/7 support, answering FAQs, resolving issues, and guiding customers through the shopping journey.",
      },
      {
        heading: "Customer Retention",
        desc: "By providing better service and personalization, AI helps retain customers, saving on acquisition costs.",
      },
    ],
  },
  {
    title: "Real estate",
    points: [
      {
        heading: "Smart Search Tools",
        desc: "AI algorithms help buyers and renters find properties that match their preferences by analyzing search criteria, location, budget, and lifestyle needs.",
      },
      {
        heading: "AI-Powered CRMs",
        desc: "AI systems segment potential buyers or tenants, prioritize leads, and capture to CRM",
      },
      {
        heading: "Chatbots",
        desc: "Automated bots provide 24/7 customer support, answer queries, and guide users through listings.",
      },
    ],
  },
  {
    title: "Agency",
    points: [
      {
        heading: "Automated Tasks",
        desc: "AI tools can handle repetitive tasks like data entry, scheduling, and email management, freeing up time for employees to focus on strategic work.",
      },
      {
        heading: "24/7 Support",
        desc: "Chatbots and virtual assistants ensure round-the-clock customer support, improving client satisfaction.",
      },
      {
        heading: "Lead Scoring",
        desc: "AI identifies and prioritizes high-quality leads, improving conversion rates.",
      },
    ],
  },
  {
    title: "Health care",
    points: [
      {
        heading: "Virtual Health Assistants",
        desc: "AI chatbots provide instant responses to patient inquiries, help schedule appointments, and remind patients to take medications.",
      },
      {
        heading: "Effortless Booking",
        desc: "Patients can schedule appointments via chat without waiting for human staff.",
      },
      {
        heading: "Personalized Recommendations",
        desc: "Analyze patient needs, such as symptoms or medical history, to suggest the most relevant specialists.",
      },
    ],
  },
];

export default function InsightsCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="containers cards-scroll-wrapper" id="containers" ref={scrollRef}>
        {INSIGHTS.map((item, index) => (
          <div className="cards" key={index}>
            <h1>{item.title}</h1>
            <div className="card-details">
              {item.points.map((pt, pIdx) => (
                <p key={pIdx}>
                  <span className="linear">{pt.heading}</span>
                  <br />
                  {pt.desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-cards-container">
        <div id="scroll-cards-left" onClick={() => scroll("left")} role="button" aria-label="Scroll left">
          <i className="bi bi-arrow-left"></i>
        </div>
        <div id="scroll-cards-right" onClick={() => scroll("right")} role="button" aria-label="Scroll right">
          <i className="bi bi-arrow-right"></i>
        </div>
      </div>
    </>
  );
}
