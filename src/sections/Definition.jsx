// src/sections/Definition.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Definition() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-smoke]");
    if (!items.length) return;

    // 初期状態：煙の中
    gsap.set(items, {
      opacity: 0,
      y: 4,
      filter: "blur(6px)",
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
gsap.to(items, {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  duration: 1.25,
  ease: "power2.out",
  stagger: 0, // ← 完全同時
});

        io.disconnect();
      },
      {
        rootMargin: "-25% 0px -20% 0px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        max-w-3xl
        mx-auto
        px-6
        text-center
        overflow-hidden
        py-[18vh]
        md:py-[26vh]
      "
      aria-label="AXIS definition"
    >
      {/* 空気 */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          z-0
          opacity-[0.035]
          bg-[radial-gradient(
            circle,
            rgba(255,255,255,0.12) 1px,
            transparent 1.2px
          )]
          bg-[length:48px_48px]
        "
      />

      <div className="relative z-10">
        <p
          data-smoke
          className="
            mb-10
            text-[0.6rem]
            tracking-[0.4em]
            text-[var(--silver-dark)]
          "
        >
          DEFINITION
        </p>

        <p
          data-smoke
          className="
            font-serif
            tracking-[0.22em]
            text-[var(--silver-mid)]
            text-[0.95rem]
            leading-[2.3]
            md:text-[1.05rem]
            md:leading-[2.6]
          "
        >
          飾るためのものではない。
          <br />
          見せるために、あるわけでもない。
        </p>

        <p
          data-smoke
          className="
            uppercase
            text-[var(--silver-dark)]
            mt-12
            text-[0.55rem]
            tracking-[0.3em]
            md:mt-16
            md:text-[0.6rem]
            md:tracking-[0.32em]
          "
        >
          Not for decoration.
          <br />
          Not meant to be displayed.
        </p>
      </div>
    </section>
  );
}
