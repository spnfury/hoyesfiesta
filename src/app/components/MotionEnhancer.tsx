"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionEnhancer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const cleanupHover: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.to(".motion-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      const glow = document.querySelector<HTMLElement>(".motion-cursor-glow");
      if (glow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const xTo = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" });
        const yTo = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" });

        const onPointerMove = (event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        window.addEventListener("pointermove", onPointerMove);
        cleanupHover.push(() => window.removeEventListener("pointermove", onPointerMove));
      }

      gsap.fromTo(
        ".hero-media",
        { scale: 1.08 },
        { scale: 1.01, duration: 1.8, ease: "power3.out" },
      );

      gsap.to(".hero-media", {
        yPercent: 13,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-shell",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".hero-aurora__beam",
        { autoAlpha: 0, scaleX: 0.2, xPercent: -30 },
        {
          autoAlpha: 1,
          scaleX: 1,
          xPercent: 0,
          duration: 1.45,
          ease: "expo.out",
          stagger: 0.12,
        },
      );

      gsap.to(".hero-aurora__beam", {
        xPercent: 18,
        rotate: 4,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".hero-orbit span", {
        rotate: -360,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      gsap.from("[data-hero-reveal]", {
        autoAlpha: 0,
        y: 34,
        duration: 1,
        ease: "power3.out",
        stagger: 0.13,
        delay: 0.12,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = group.querySelectorAll("[data-stagger-item]");
        if (!children.length) return;

        gsap.from(children, {
          autoAlpha: 0,
          y: 32,
          scale: 0.98,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element, i) => {
        gsap.to(element, {
          y: i % 2 === 0 ? -16 : 16,
          rotate: i % 2 === 0 ? 1.5 : -1.5,
          duration: 2.4 + i * 0.18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".bridge-card").forEach((card) => {
          gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });

          const rotateX = gsap.quickTo(card, "rotateX", {
            duration: 0.35,
            ease: "power3.out",
          });
          const rotateY = gsap.quickTo(card, "rotateY", {
            duration: 0.35,
            ease: "power3.out",
          });
          const lift = gsap.quickTo(card, "y", {
            duration: 0.35,
            ease: "power3.out",
          });

          const onMove = (event: MouseEvent) => {
            const bounds = card.getBoundingClientRect();
            const px = (event.clientX - bounds.left) / bounds.width - 0.5;
            const py = (event.clientY - bounds.top) / bounds.height - 0.5;

            rotateX(py * -8);
            rotateY(px * 8);
            lift(-8);
          };

          const onLeave = () => {
            rotateX(0);
            rotateY(0);
            lift(0);
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanupHover.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      }

    });

    return () => {
      cleanupHover.forEach((cleanup) => cleanup());
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="motion-progress" aria-hidden="true" />
      <div className="motion-cursor-glow" aria-hidden="true" />
    </>
  );
}
