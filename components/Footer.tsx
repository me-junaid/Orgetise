import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="mt-[100px] flex flex-col min-[825px]:flex-row justify-between py-[10px] px-[10vw] gap-[20px] min-[825px]:gap-0">
        <div className="mb-[10px] min-[825px]:mb-0" id="quick-links">
          <strong className="block mb-[5px]">Quick links</strong>
          <p className="my-[5px] flex justify-between cursor-pointer group">
            About Us <i className="bi bi-send ml-[15px] mr-[5px] transition-all duration-300 text-[rgb(250,252,250)] group-hover:text-[#e5ffe5] group-hover:rotate-45"></i>
          </p>
          <p className="my-[5px] flex justify-between cursor-pointer group">
            Contact Us <i className="bi bi-send ml-[15px] mr-[5px] transition-all duration-300 text-[rgb(250,252,250)] group-hover:text-[#e5ffe5] group-hover:rotate-45"></i>
          </p>
        </div>
        <div className="mb-[10px] min-[825px]:mb-0" id="resources">
          <strong className="block mb-[5px]">Resources</strong>
          <p className="my-[5px] flex justify-between cursor-pointer group">
            Privacy Policy <i className="bi bi-send ml-[15px] mr-[5px] transition-all duration-300 text-[rgb(250,252,250)] group-hover:text-[#e5ffe5] group-hover:rotate-45"></i>
          </p>
          <p className="my-[5px] flex justify-between cursor-pointer group">
            Blogs <i className="bi bi-send ml-[15px] mr-[5px] transition-all duration-300 text-[rgb(250,252,250)] group-hover:text-[#e5ffe5] group-hover:rotate-45"></i>
          </p>
        </div>
        <div className="flex flex-col">
          <p>
            <strong>Stay Connected</strong>
          </p>
          <div className="flex gap-[10px] self-start min-[825px]:self-end mt-[5px]">
            <i className="bi bi-instagram text-[18px] cursor-pointer hover:text-[rgb(0,77,0)] transition-colors" aria-label="Instagram"></i>
            <i className="bi bi-facebook text-[18px] cursor-pointer hover:text-[rgb(0,77,0)] transition-colors" aria-label="Facebook"></i>
            <i className="bi bi-twitter-x text-[18px] cursor-pointer hover:text-[rgb(0,77,0)] transition-colors" aria-label="Twitter X"></i>
            <i className="bi bi-linkedin text-[18px] cursor-pointer hover:text-[rgb(0,77,0)] transition-colors" aria-label="LinkedIn"></i>
          </div>
        </div>
      </footer>
      <hr className="mx-[10vw] mt-[25px] border-t border-black/20" />

      <div className="flex justify-between py-[40px] px-[10vw] text-black/60 text-[14px]">
        <small>Copyright &copy; {new Date().getFullYear()} Orgetise, All rights reserved</small>
        <small>India</small>
      </div>
    </>
  );
}
