import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Essays() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = root.querySelectorAll("[data-line]");
    if (!lines.length) return;

    // 初期状態をロック（画面外でも表示されない）
    gsap.set(lines, { opacity: 0, y: 10 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1.2,
 ease: "power2.out",
 stagger:0.28,
        });

        observer.disconnect(); // 一度きり
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0,
      }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* =====================
          ESSAYS（PC完成形・触らない）
      ===================== */}
      <section
        ref={rootRef}
        className="max-w-5xl mx-auto px-6 py-44"
        aria-label="Essays"
      >
        {/* Header */}
        <div
          aria-hidden
          className="
            mb-24
            pt-4
            relative
          "
        >
          <span
            aria-hidden
            className="
              block
              h-px
              w-[120px]
              bg-gradient-to-r
              from-transparent
              via-white/45
              to-transparent
              opacity-30
            "
          />

          <p
            className="
              mt-6
              tracking-[0.32em]
              text-[0.65rem]
              text-[var(--silver-dark)]
            "
            data-line
          >
            ESSAYS
          </p>
        </div>

        {/* Text */}
        <div
          className="
            space-y-14
            text-[0.9rem]
            leading-[2.2]
            text-[var(--silver-mid)]
          "
        >
          <p data-line>選ぶ理由は、いつも後からついてくる。</p>

          <p data-line className="opacity-80">
            Before reason, there is instinct.
          </p>

          <p data-line>
            先にあるのは、<br />
            「これだ」という感覚だけ。
          </p>

          <p data-line className="opacity-80">
            You either feel it, or you don’t.
          </p>

          <p data-line>
            それを疑い始めた瞬間、<br />
            似合わなくなる。
          </p>

          <p data-line className="opacity-70 italic">
            Hesitation breaks the form.
          </p>

          <p data-line className="opacity-60">
            説明はいらない。
          </p>
        </div>
      </section>

      {/* =====================
          SP ONLY：読み終わりの重力
          ※ PC には一切表示されない
      ===================== */}
      <div
        aria-hidden
        className="
          md:hidden
          flex
          justify-center
          pb-24
        "
      >
        {/* ここは次で設計 */}
      </div>
    </>
  );
}
