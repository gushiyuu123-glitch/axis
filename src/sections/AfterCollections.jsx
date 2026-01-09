// src/sections/AfterCollections.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AfterCollections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const main = el.querySelector(".after-main");
    const sub = el.querySelector(".after-sub");
    const line = el.querySelector(".after-line");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
        });
tl.fromTo(
  main,
  { opacity: 0, y: 5 },
  { opacity: 0.95, y: 0, duration: 1.35 } // 1.45 → 1.35
)
  .fromTo(
    sub,
    { opacity: 0, y: 4 },
    { opacity: 0.9, y: 0, duration: 1.2 }, // 1.3 → 1.2
    "-=0.55" // -0.6 → -0.55
  )
  .fromTo(
    line,
    { opacity: 0, scaleX: 0.6 },
    { opacity: 0.25, scaleX: 1, duration: 1.2 }, // 1.3 → 1.2
    "-=0.65" // -0.7 → -0.65
  );


        io.disconnect(); // 一度きり
      },
      {
        threshold: 0.15,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* =====================
          AFTER COLLECTIONS
          ※ 気配 → 判断 → 囁き → 沈黙
      ===================== */}
      <section
        ref={sectionRef}
        aria-label="After Collections"
        className="
          relative
          min-h-[55vh]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* =====================
            AIR ONLY（先に存在する気配）
        ===================== */}
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0
            -z-10
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(255,255,255,0.05),
              rgba(0,0,0,0) 72%
            )]
            animate-[airPulse_14s_ease-in-out_infinite]
          "
        />

        {/* =====================
            WHISPER COPY
        ===================== */}
        <div
          className="
            relative
            mt-28
            flex
            flex-col
            items-center
            text-center
          "
        >
          {/* 判断（主） */}
          <p
            className="
              after-main
              text-[0.7rem]
              tracking-[0.3em]
              text-[var(--silver-mid)]
              leading-[2.4]
              opacity-95
            "
          >
            似合うかどうかは、もう決まっている。
          </p>

          {/* 条件（囁き） */}
          <p
            className="
              after-sub
              mt-8
              text-[0.65rem]
              tracking-[0.42em]
              text-[var(--silver-dark)]
              opacity-90
              italic
              drop-shadow-[0_0_6px_rgba(200,200,200,0.12)]
            "
          >
            迷っているなら、まだ早い。
          </p>

          {/* 沈黙 */}
          <span
            aria-hidden
            className="
              after-line
              block
              mt-12
              w-[64px]
              h-px
              bg-[var(--silver-dark)]
              opacity-25
              mx-auto
              origin-center
            "
          />
        </div>
      </section>

      {/* =====================
          SP ONLY：次へ進む重力
      ===================== */}
      <div
        aria-hidden
        className="
          md:hidden
          flex
          justify-center
          pb-20
        "
      >
        <span
          className="
            text-[0.55rem]
            tracking-[0.4em]
            text-[var(--silver-dark)]
            opacity-40
            select-none
          "
        >
          ↓
        </span>
      </div>
    </>
  );
}
