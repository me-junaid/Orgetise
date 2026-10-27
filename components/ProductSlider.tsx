"use client";

import React, { useRef, useState } from "react";

interface ProductCard {
  id: string;
  responseId: string;
  queryId: string;
  inputId: string;
  wrapperId: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  systemInstruction: string;
  titleId?: string;
}

const PRODUCTS: ProductCard[] = [
  {
    id: "ai-agent",
    responseId: "ai-agent",
    queryId: "ai-agent-query",
    inputId: "ai-agent-input",
    wrapperId: "ai-response-ai-agent",
    title: "AI Agents",
    subtitle: "For customer support",
    imgSrc: "/service-logo/video_2025-02-21_15-51-57-ezgif.com-video-to-gif-converter.gif",
    systemInstruction: `you are a chatbot specially tuned to give customer support about our service which are AI agents.
You only want to response about the benifits of our service.
If the user is asking anything beyond our service you can simply say i am sorry, response accordinglly. allways answer the questions only in simple form, no need to give big response. deal like a professional salesman. try to use some emojies.

Cost: the service starts at the range of ₹2000 - ₹10000 per month by considering the complexity of the agent that you are looking for.

Time to complete the development: The develop will takes time between 1 week to a month depending of your needs, we will try our level best to complete it fast.
by looking at the history of the chat you have, after you feel like user is in a point to book an appointment, tell them they can able to book the appointment by clicking a button 'note: you don't need to give me the button' and ask them comeback after submitting the request.

don't replay by start with 'You', it is just a chat history between you and the user, so don't mention the word you: in the begining of the conversation.`,
  },
  {
    id: "social-mm",
    responseId: "social-mm",
    queryId: "social-mm-query",
    inputId: "social-mm-input",
    wrapperId: "ai-response-social-mm",
    title: "Digital Marketing",
    subtitle: "Marketing AI for your business",
    imgSrc: "/service-logo/AiScocialMM.jpg",
    systemInstruction: "your name is social",
  },
  {
    id: "lead-capture",
    responseId: "lead-capture",
    queryId: "lead-capture-query",
    inputId: "lead-capture-input",
    wrapperId: "ai-response-lead-capture",
    title: "Lead Capturing",
    subtitle: "Traffic to valid leads",
    imgSrc: "/service-logo/or.gif",
    systemInstruction: "your name is lead",
  },
  {
    id: "product-recommendation",
    responseId: "product-recommendation",
    queryId: "product-recommendation-query",
    inputId: "product-recommendation-input",
    wrapperId: "ai-response-product-recommendation",
    title: "Product Recommendation",
    subtitle: "AI prowered personalized search",
    imgSrc: "/service-logo/pdr.gif",
    systemInstruction: `You are an ai agent to let users know about the benefit of ai product recommendation in their business. you only need to provide information related to the importance of product recommendation for their business. please don't replay to anything out of the topic. The Topic is 'Product Recommendation.'. 

Here is a small brief on how our product recommendation works. imagine someones searching for a bag. the our client website their will be a input field to text what they are looking for. The ai will find the product and recommend it to the user.
This is how it works, keep in mind that it is not based on the user previos data or any other past search and thing like that and you don't need to tell this to users. 

also show them an examples like this 'I am looking for a bag for my kid.' and the example should need to be primarly related to their business.

and replay very mild and presize. please ingore the bold in outputs.

if they are asking for the cost for building it then replay like you mean that the cost is depend on the complexity of your service and number of catlog to be listed and the other thing to concern and at the end tell them to book a meeting with us and try to convert them into a lead.`,
  },
  {
    id: "web-development",
    responseId: "web-development",
    queryId: "web-development-query",
    inputId: "web-development-input",
    wrapperId: "ai-response-web-development",
    title: "AI Dynamic Website",
    subtitle: "AI prowered intractive and dynamic modern website",
    imgSrc: "/service-logo/dynamic-web.png",
    titleId: "title-2",
    systemInstruction: `You are an agent to let users know about the benefit of ai agents in their business. you only need to provide information related to the importance of ai dynamic website for their business. please don't replay to anything out of the topic. The Topic is 'AI Dynamic Website'. 

Here is a small brief on how our AI dynamic website works. we develop a dynamic website that changes the content dynamicaly by check the user input and what they are looking for.

This is how it works, keep in mind that it is not based on the user previos data or any other past search and thing like that and your don't need to tell this to users. 

also show them an example which is primarly related to their business.

and replay very mild and presize and in plain text. please ingore the bold in outputs.

if they are asking for the cost for building it then replay like you mean that the cost is depend on the complexity of your service and pages need need to add and your specific requirement and the other thing to concern and at the end tell them to book a meeting with us and try to convert them into a lead.`,
  },
];

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [queries, setQueries] = useState<Record<string, string>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleFocusClick = (prodId: string) => {
    setIsExpanded((prev) => ({ ...prev, [prodId]: true }));
  };

  const handleSend = async (prod: ProductCard) => {
    const val = (inputs[prod.id] || "").trim();
    if (!val) return;

    setQueries((prev) => ({ ...prev, [prod.id]: val }));
    setInputs((prev) => ({ ...prev, [prod.id]: "" }));
    setResponses((prev) => ({ ...prev, [prod.id]: "Thinking..." }));
    setIsExpanded((prev) => ({ ...prev, [prod.id]: true }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service",
          message: val,
          systemInstruction: prod.systemInstruction,
        }),
      });
      const data = await res.json();
      setResponses((prev) => ({ ...prev, [prod.id]: data.text || "No response" }));
    } catch {
      setResponses((prev) => ({
        ...prev,
        [prod.id]: "Sorry, failed to get response. Please try again.",
      }));
    }
  };

  return (
    <>
      <div className="flex overflow-x-scroll overflow-y-hidden gap-[10px] min-[825px]:gap-[30px] mb-[10px] pr-[20px] pl-[15px] min-[825px]:pl-[calc(6vw+10px)] h-auto min-[825px]:h-[360px] snap-x snap-mandatory" id="product-list" ref={scrollRef}>
        {PRODUCTS.map((prod) => {
          const userQuery = queries[prod.id] || "";
          const aiResponse = responses[prod.id] || "";
          const expanded = isExpanded[prod.id];

          return (
            <div className="product-card snap-center mt-[2px] min-[825px]:mt-[20px] rounded-[27px] min-[825px]:rounded-[30px] flex flex-col min-[825px]:flex-row shrink-0 bg-[rgb(250,252,250)] w-[90vw] min-[825px]:w-[80vw] min-w-0 min-[825px]:min-w-[800px] max-w-[300px] min-[825px]:max-w-none overflow-hidden last:mr-[500px] translate-y-[100px] opacity-0" key={prod.id}>
              <div className="aspect-square shrink-0 flex rounded-[5px] min-[825px]:rounded-[15px] self-center justify-center select-none overflow-hidden mt-[15px] min-[825px]:mt-0 ml-0 min-[825px]:ml-[20px] w-[270px] h-[270px] min-[825px]:w-[300px] min-[825px]:h-[300px] bg-[rgb(250,252,250)] min-[825px]:bg-white">
                <img draggable={false} src={prod.imgSrc} alt={prod.title} loading="lazy" className="w-full h-full object-cover rounded-[5px]" />
              </div>

              <div className="grow p-[10px] flex flex-col overflow-hidden">
                <div className="flex-grow-0 min-[825px]:grow flex flex-col justify-start min-[825px]:justify-center items-start min-[825px]:items-center shrink-0 mx-[10px] min-[825px]:mx-0">
                  <h1 id={prod.titleId} className="text-[22px] min-[825px]:text-[40px] shrink-0 text-left min-[825px]:text-center whitespace-nowrap text-ellipsis max-w-[250px] min-[825px]:max-w-none w-[75vw] min-[825px]:w-auto">
                    <span className="linear res-linear">{prod.title}</span>
                  </h1>
                  <p className="shrink-0 text-[14px] min-[825px]:text-[15px] text-left min-[825px]:text-center font-normal min-[825px]:mx-[20px] m-0">{prod.subtitle}</p>
                </div>

                <div
                  className="ai-response my-[5px] p-0 min-[825px]:px-[20px] max-h-[30vh] min-[825px]:max-h-none overflow-y-auto rounded-[10px] bg-white min-[825px]:bg-[rgb(250,252,250)]"
                  id={prod.wrapperId}
                  style={
                    expanded
                      ? {
                          backgroundColor: "#fafafa",
                          minHeight: "80px",
                          display: userQuery || aiResponse ? "block" : "none",
                        }
                      : undefined
                  }
                >
                  <p
                    id={prod.queryId}
                    style={{
                      opacity: userQuery ? 1 : 0,
                      display: userQuery ? "block" : "none",
                      color: "black",
                      backgroundColor: "#FAFAFA",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      margin: "4px 0",
                    }}
                  >
                    {userQuery}
                  </p>
                  <p
                    id={prod.responseId}
                    style={{
                      padding: "4px 6px",
                      color: "#1a1a1a",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      display: aiResponse ? "block" : "none",
                    }}
                  >
                    {aiResponse}
                  </p>
                </div>

                <div className="flex justify-between mt-auto min-h-[54px]">
                  <input
                    enterKeyHint="send"
                    autoComplete="off"
                    type="text"
                    placeholder="Ask AI"
                    id={prod.inputId}
                    className="px-[20px] min-[825px]:px-[40px] rounded-[10px] text-[16px] grow bg-white text-black border-[3px] border-white max-h-[50px] placeholder:font-bold focus:outline-none"
                    value={inputs[prod.id] || ""}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [prod.id]: e.target.value }))
                    }
                    onFocus={() => handleFocusClick(prod.id)}
                    onClick={() => handleFocusClick(prod.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend(prod);
                      }
                    }}
                  />
                  <div
                    className="ml-[10px] h-[40px] min-w-[40px] w-[40px] rounded-full flex justify-center items-center self-center opacity-80 hover:opacity-100 transition-all duration-300 bg-[#e5ffe5] border border-black cursor-pointer"
                    onClick={() => handleSend(prod)}
                    title="Send message"
                  >
                    <i className="bi bi-send text-[20px] mr-[5px] text-black rotate-45"></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-[40px] justify-center mt-[30px]">
        <div id="scroll-project-left" className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-[#e5ffe5] hover:bg-[#e5ffe5]" onClick={() => scroll("left")} role="button" aria-label="Scroll left">
          <i className="bi bi-arrow-left text-[20px]"></i>
        </div>
        <div id="scroll-project-right" className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-[#e5ffe5] hover:bg-[#e5ffe5]" onClick={() => scroll("right")} role="button" aria-label="Scroll right">
          <i className="bi bi-arrow-right text-[20px]"></i>
        </div>
      </div>
    </>
  );
}
