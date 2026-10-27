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
      <div className="flex overflow-x-scroll overflow-y-hidden mt-[10px] gap-[20px] p-[20px] pl-[6vw] min-[825px]:pl-[calc(6vw+10px)] snap-x snap-mandatory" id="containers" ref={scrollRef}>
        {INSIGHTS.map((item, index) => (
          <div className="cards opacity-0 snap-center scroll-smooth shrink-0 rounded-[15px] flex transition-all duration-300 p-[20px] pb-[20px] min-[825px]:pb-[40px] flex-col relative overflow-hidden w-[430px] max-[824px]:max-w-[70vw] last:mr-[1000px] shadow-[0_0_8px_-6px_black] hover:shadow-[0_0_10px_-6px_black] bg-[url(/card-bg.svg)] bg-center bg-cover" key={index}>
            <h1 className="shrink-0 z-[1] text-[28px] font-semibold m-[10px] mt-[10px] min-[825px]:m-[45px] min-[825px]:mt-[35px] min-[825px]:mr-0 min-[825px]:mb-[10px]">{item.title}</h1>
            <div className="card-details grow ml-0 min-[825px]:ml-[35px] z-[1] overflow-y-auto">
              {item.points.map((pt, pIdx) => (
                <p key={pIdx} className="m-[10px] mb-[20px] text-black/50 text-[14px] leading-relaxed">
                  <span className="linear text-[20px]">{pt.heading}</span>
                  <br />
                  {pt.desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-[40px] justify-center mt-[30px]">
        <div id="scroll-cards-left" className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-[#e5ffe5] hover:bg-[#e5ffe5]" onClick={() => scroll("left")} role="button" aria-label="Scroll left">
          <i className="bi bi-arrow-left text-[20px]"></i>
        </div>
        <div id="scroll-cards-right" className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-[#e5ffe5] hover:bg-[#e5ffe5]" onClick={() => scroll("right")} role="button" aria-label="Scroll right">
          <i className="bi bi-arrow-right text-[20px]"></i>
        </div>
      </div>
    </>
  );
}
