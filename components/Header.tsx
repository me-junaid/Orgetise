"use client";

import React, { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onOpenChat: () => void;
  onScrollTo: (targetId: string) => void;
}

export default function Header({ onOpenChat, onScrollTo }: HeaderProps) {
  const [mobNavOpen, setMobNavOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobNavOpen(false);
    onScrollTo(id);
  };

  return (
    <>
      <header className="header">
        <div className="name" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <img src="/orgetise.png" alt="Orgetise Logo" draggable={false} />
          <h1>orgetise</h1>
        </div>
        <nav>
          <li className="nav-name" id="products" onClick={() => handleNavClick("product-list")}>
            Products
          </li>
          <li className="nav-name" id="tune" onClick={() => handleNavClick("tune-textarea")}>
            Tune
          </li>
          <li className="nav-name" id="build" onClick={() => handleNavClick("find-the-build-textarea")}>
            Build
          </li>
          <li className="nav-name" id="integrate" onClick={() => handleNavClick("find-the-build-textarea")}>
            Integrate
          </li>
        </nav>
        <div id="go-to-input" onClick={onOpenChat} style={{ cursor: "pointer" }} title="Open AI Chat">
          <i className="bi bi-magic"></i>
        </div>
        <div id="mob-open" onClick={() => setMobNavOpen(!mobNavOpen)} style={{ cursor: "pointer" }}>
          <i id="open-close" className={`bi ${mobNavOpen ? "bi-x" : "bi-list"}`}></i>
        </div>
      </header>

      <div
        className="mob-nav"
        id="mob-nav"
        style={{ display: mobNavOpen ? "block" : "none" }}
      >
        <nav>
          <li className="nav-name" id="products-mob" onClick={() => handleNavClick("product-list")}>
            Products
          </li>
          <li className="nav-name" id="tune-mob" onClick={() => handleNavClick("tune-textarea")}>
            Tune
          </li>
          <li className="nav-name" id="build-mob" onClick={() => handleNavClick("find-the-build-textarea")}>
            Build
          </li>
          <li className="nav-name" id="integrate-mob" onClick={() => handleNavClick("find-the-build-textarea")}>
            Integrate
          </li>
        </nav>
      </div>
    </>
  );
}
