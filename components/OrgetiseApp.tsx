"use client";

import React, { useState, useCallback } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductSlider from "./ProductSlider";
import TypingBanner from "./TypingBanner";
import InsightsCards from "./InsightsCards";
import TuneYourAi from "./TuneYourAi";
import WhatMoreStacks from "./WhatMoreStacks";
import BuildSection from "./BuildSection";
import Footer from "./Footer";
import ChatModal from "./ChatModal";
import GsapInitializer from "./GsapInitializer";

export default function OrgetiseApp() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");

  const handleOpenChat = useCallback(() => {
    setChatPrompt("");
    setIsChatOpen(true);
  }, []);

  const handleOpenWithPrompt = useCallback((prompt: string) => {
    setChatPrompt(prompt);
    setIsChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false);
    setChatPrompt("");
  }, []);

  const handleScrollTo = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <>
      <GsapInitializer />

      <Header onOpenChat={handleOpenChat} onScrollTo={handleScrollTo} />

      <main>
        <Hero onScrollTo={handleScrollTo} />

        <ProductSlider />

        <TypingBanner onOpenWithPrompt={handleOpenWithPrompt} />

        <InsightsCards />

        <TuneYourAi onScrollTo={handleScrollTo} />

        <WhatMoreStacks />

        <BuildSection />
      </main>

      <Footer />

      <ChatModal
        isOpen={isChatOpen}
        initialPrompt={chatPrompt}
        onClose={handleCloseChat}
      />
    </>
  );
}
