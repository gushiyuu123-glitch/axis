import { useEffect, useRef } from "react";
import gsap from "gsap";
import initParticles from "../utils/particles";

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    initParticles(canvasRef.current);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      q(".hero-image"),
      { scale: 1.08, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2.2,
        ease: "expo.out",
      }
    )
      .fromTo(
        q(".hero-title"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "expo.out",
        },
        "-=1.4"
      )
      .fromTo(
        q(".hero-sub"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1.1"
      )
      .fromTo(
        q(".hero-scroll"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.out",
        },
        "-=0.6"
      );

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        flex
        items-center
        justify-center
      "
      aria-label="AXIS hero section"
    >
      {/* BACKGROUND IMAGE */}
      <img
        src="/images/hero-axis.png"
        alt="AXIS constructed jewelry worn by a model"
        className="
          hero-image
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-[65%_center]
          pointer-events-none
          select-none
        "
        loading="eager"
        decoding="async"
      />

      {/* 視認性シャドウ */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      {/* 粒子 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
      />

      {/* =====================
          CENTER TYPO
      ===================== */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-center

          /* SP */
          left-0
          translate-y-[-2vh]

          /* PC（完全保持） */
          md:left-[-9vw]
          md:translate-y-[-1.5vh]
        "
      >
        <h1
          className="
            hero-title
            font-serif
            tracking-[0.18em]

            /* SP */
            text-[clamp(3rem,18vw,5.2rem)]

            /* PC */
            md:text-[clamp(4rem,12vw,9rem)]

            bg-gradient-to-b
            from-[var(--silver-light)]
            via-[var(--silver-mid)]
            to-[var(--silver-dark)]
            bg-clip-text
            text-transparent
            drop-shadow-[0_1px_8px_rgba(255,255,255,0.08)]
            animate-[silver-breath_6s_ease-in-out_infinite]
          "
        >
          AXIS
        </h1>

        <p
          className="
            hero-sub
            uppercase
            text-[#b8b8b8]

            /* SP */
            mt-4
            text-[0.62rem]
            tracking-[0.32em]

            /* PC */
            md:mt-6
            md:text-[0.7rem]
            md:tracking-[0.38em]

            animate-[silver-breath_6s_ease-in-out_infinite]
          "
        >
          Constructed Jewelry
        </p>
      </div>

      {/* SCROLL */}
      <div
        className="
          hero-scroll
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          tracking-[0.4em]
          text-[0.6rem]
          text-white/60
          select-none

          /* SP 微調整 */
          md:bottom-6
        "
        aria-hidden="true"
      >
        SCROLL
      </div>
    </section>
  );
}
