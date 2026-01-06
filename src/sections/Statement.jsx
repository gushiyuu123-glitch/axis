// src/sections/Statement.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Statement() {
  const textRef = useRef(null);
  const jpRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const text = textRef.current;
    const jp = jpRef.current;
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!text || !jp || !wrapper || !section) return;

    // ===== 初期状態（締めなので一塊で）=====
    gsap.set([text, jp], {
      opacity: 0,
      y: 12,
    });

    const createSparks = () => {
      const count = 14;

      const rectEN = text.getBoundingClientRect();
      const rectJP = jp.getBoundingClientRect();
      const parentRect = wrapper.getBoundingClientRect();

      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const spark = document.createElement("span");
          spark.className = "spark";
          spark.style.transform = `scale(${0.6 + Math.random() * 0.6})`;
          spark.style.opacity = 0.6 + Math.random() * 0.3;

          // 7割EN / 3割JP
          const baseRect = Math.random() < 0.7 ? rectEN : rectJP;

          const x =
            baseRect.left -
            parentRect.left +
            Math.random() * baseRect.width;

          const y =
            baseRect.top -
            parentRect.top +
            baseRect.height * (0.6 + Math.random() * 0.4);

          spark.style.left = `${x}px`;
          spark.style.top = `${y}px`;

          wrapper.appendChild(spark);

          gsap.fromTo(
            spark,
            { opacity: 0, y: 0, scale: 0.5 },
            {
              opacity: 0.8,
              y: 26 + Math.random() * 16,
              scale: 1,
              duration: 2.2 + Math.random() * 0.8,
              ease: "power2.out",
              onComplete: () => spark.remove(),
            }
          );
        }, i * 140);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayed.current) return;

        // ① テキストを先に立ち上げる
        gsap.to([text, jp], {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power2.out",
        });

        // ② 少し遅れて火花
        gsap.delayedCall(0.5, createSparks);

        hasPlayed.current = true;
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -10% 0px",
      }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Statement"
      className="
        relative
        min-h-[40vh]
        flex
        items-center
        justify-center
        text-center
        px-6

        /* 上との余白を少し足す */
        mt-[18vh] md:mt-[22vh]
      "
    >
      <div ref={wrapperRef} className="relative space-y-12">
        {/* EN（主） */}
        <p
          ref={textRef}
          className="
            relative
            text-[0.95rem]
            tracking-[0.26em]
            text-[var(--silver-mid)]
          "
        >
          If you hesitate,
          <br />
          this is not for you.
        </p>

        {/* JP（芯だけ） */}
        <p
          ref={jpRef}
          className="
            text-[0.62rem]
            tracking-[0.34em]
            text-[var(--silver-dark)]
            opacity-80
          "
        >
          迷いがあるなら、選ばなくていい。
        </p>
      </div>
    </section>
  );
}
