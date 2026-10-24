"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapInitializer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.set([".hero-section", ".main-1 .columns"], { opacity: 0, y: 20 });

      gsap.to([".hero-section", ".main-1 .columns"], {
        opacity: 1,
        y: 0,
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });

      gsap.to(".header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Staggered letters animation in hero section
      gsap.from("#typingno2 span", {
        opacity: 0,
        stagger: 0.2,
        backgroundColor: "rgb(175, 255, 155)",
        repeat: -1,
        yoyo: true,
      });

      // Scroll Animations for elements marked with .gsap-emt
      document.querySelectorAll(".gsap-emt").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 40%",
            once: true,
          },
        });
      });

      // Stacks animation
      gsap.utils.toArray<HTMLElement>(".our-stacks").forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
            once: true,
          },
        });
      });

      // Cards animation
      gsap.to(".cards", {
        opacity: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cards",
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
          once: true,
        },
      });

      // MatchMedia animations for responsive transitions
      const mm = gsap.matchMedia();

      mm.add("(min-width: 825px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".input",
            start: "bottom 90%",
            end: "bottom 70%",
            scrub: 1,
          },
        });

        tl.to(".columns-1", { width: 0, opacity: 0 })
          .to(".columns-1 h1", { autoAlpha: 0 }, "<")
          .to(
            ".columns-2",
            { flexGrow: 1, backgroundColor: "white", marginRight: "30px" },
            "<"
          )
          .to(
            ".input",
            {
              backgroundColor: "#d4edda",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
            },
            "<"
          )
          .to(".columns-2 .input textarea", { width: "50vw" }, "<");
      });

      mm.add("(max-width: 824px)", () => {
        gsap.to(".input", {
          backgroundColor: "#d4edda",
          scrollTrigger: {
            trigger: ".input",
            start: "0px 80%",
            end: "0px 30%",
            scrub: 1,
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}
