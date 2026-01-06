import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Definition() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // 初期状態ロック
    gsap.set(content, {
      opacity: 0,
      y: 12,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
        });

        observer.disconnect();
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
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

        /* SP */
        py-[18vh]

        /* PC */
        md:py-[26vh]
      "
      aria-label="AXIS definition"
    >
      {/* =====================
          ABSTRACT BACKGROUND
      ===================== */}
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

      {/* =====================
          CONTENT
      ===================== */}
      <div ref={contentRef} className="relative z-10">
        <p
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
          className="
            font-serif
            tracking-[0.22em]
            text-[var(--silver-mid)]

            /* SP */
            text-[0.95rem]
            leading-[2.3]

            /* PC */
            md:text-[1.05rem]
            md:leading-[2.6]
          "
        >
          飾るためのものではない。
          <br />
          見せるために、あるわけでもない。
        </p>

        <p
          className="
            uppercase
            text-[var(--silver-dark)]

            /* SP */
            mt-12
            text-[0.55rem]
            tracking-[0.3em]

            /* PC */
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
