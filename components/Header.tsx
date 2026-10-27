"use client";

import React, { useState } from "react";

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
      <header className="header bg-[#fafafab7] h-[60px] flex justify-between items-center fixed top-0 right-0 left-0 z-[1000] px-[15px] min-[825px]:px-[8vw] backdrop-blur-[10px] -translate-y-[100px] opacity-0 active:text-[rgb(0,77,0)]">
        <div
          className="flex items-center w-[200px] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/orgetise.png"
            alt="Orgetise Logo"
            draggable={false}
            className="h-[40px] w-[40px] shrink-0 select-none"
          />
          <h1 className="text-[20px] min-[825px]:text-[14px] text-[rgb(0,77,0)] font-semibold shrink-0 select-none -ml-[7px] mt-[5px]">
            orgetise
          </h1>
        </div>
        <nav className="hidden min-[825px]:flex transition-all duration-200 hover:text-[rgb(115,115,115)]">
          <li
            className="list-none px-5 text-[14px] font-medium cursor-pointer transition-all duration-200 h-[50px] flex items-center select-none hover:text-black"
            id="products"
            onClick={() => handleNavClick("product-list")}
          >
            Products
          </li>
          <li
            className="list-none px-5 text-[14px] font-medium cursor-pointer transition-all duration-200 h-[50px] flex items-center select-none hover:text-black"
            id="tune"
            onClick={() => handleNavClick("tune-textarea")}
          >
            Tune
          </li>
          <li
            className="list-none px-5 text-[14px] font-medium cursor-pointer transition-all duration-200 h-[50px] flex items-center select-none hover:text-black"
            id="build"
            onClick={() => handleNavClick("find-the-build-textarea")}
          >
            Build
          </li>
          <li
            className="list-none px-5 text-[14px] font-medium cursor-pointer transition-all duration-200 h-[50px] flex items-center select-none hover:text-black"
            id="integrate"
            onClick={() => handleNavClick("find-the-build-textarea")}
          >
            Integrate
          </li>
        </nav>
        <div
          id="go-to-input"
          className="hidden min-[825px]:block text-[20px] w-[200px] text-right cursor-pointer"
          onClick={onOpenChat}
          title="Open AI Chat"
        >
          <i className="bi bi-magic"></i>
        </div>
        <div
          id="mob-open"
          className="block min-[825px]:hidden text-[23px] text-right pl-[5px] cursor-pointer"
          onClick={() => setMobNavOpen(!mobNavOpen)}
        >
          <i id="open-close" className={`bi ${mobNavOpen ? "bi-x" : "bi-list"}`}></i>
        </div>
      </header>

      <div
        className={`fixed inset-0 top-[47px] bg-[#fafafa8c] backdrop-blur-[10px] z-[2000] border-t-2 border-[#e5ffe5] pt-[30px] pl-[30px] ${
          mobNavOpen ? "block" : "hidden"
        } min-[825px]:hidden`}
        id="mob-nav"
      >
        <nav>
          <li
            className="list-none text-[30px] p-[5px] font-semibold cursor-pointer select-none"
            id="products-mob"
            onClick={() => handleNavClick("product-list")}
          >
            Products
          </li>
          <li
            className="list-none text-[30px] p-[5px] font-semibold cursor-pointer select-none"
            id="tune-mob"
            onClick={() => handleNavClick("tune-textarea")}
          >
            Tune
          </li>
          <li
            className="list-none text-[30px] p-[5px] font-semibold cursor-pointer select-none"
            id="build-mob"
            onClick={() => handleNavClick("find-the-build-textarea")}
          >
            Build
          </li>
          <li
            className="list-none text-[30px] p-[5px] font-semibold cursor-pointer select-none"
            id="integrate-mob"
            onClick={() => handleNavClick("find-the-build-textarea")}
          >
            Integrate
          </li>
        </nav>
      </div>
    </>
  );
}
