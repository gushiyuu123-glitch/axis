// src/sections/Contact.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const block = el.querySelector(".contact-inner");
    if (!block) return;

    // 初期状態：右に寄せて沈黙
    gsap.set(block, {
      opacity: 0,
      x: 22,
      filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
  delay: 0.2,
});

        // 本体
        tl.to(block, {
          opacity: 1,
          x: 0,
          duration: 0.6,
        })
          // 残像（影だけ一瞬）
          .to(
            block,
            {
              filter: "drop-shadow(-12px 0 16px rgba(255,255,255,0.18))",
              duration: 0.25,
            },
            "-=0.45"
          )
          .to(block, {
            filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
            duration: 0.4,
          });

        io.disconnect(); // 一度きり
      },
{
  rootMargin: "-40% 0px -15% 0px", // ← ここ
  threshold: 0,
}

    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* =====================
          CONTACT
          ※ 右から一瞬、存在を示す
      ===================== */}
      <section
        ref={sectionRef}
        id="contact"
        aria-label="Contact"
        className="
          relative
          min-h-[42vh]
          flex
          items-center
          justify-center
          px-6
          mt-[12vh] md:mt-[16vh]
        "
      >
        <div
          className="
            contact-inner
            w-full
            max-w-6xl
            flex
            flex-col
            gap-14
          "
        >
          {/* 上段：日本語 */}
          <p
            className="
              text-center
              text-[0.7rem]
              tracking-[0.22em]
              text-[var(--silver-mid)]
              leading-[2.4]
            "
          >
            サイズのこと。　
            オーダーのこと。　
            修理や、これからのこと。
          </p>

          {/* 区切り */}
          <span
            aria-hidden
            className="
              block
              mx-auto
              w-[160px]
              h-px
              bg-gradient-to-r
              from-transparent
              via-[var(--silver-dark)]/35
              to-transparent
            "
          />

          {/* 下段 */}
          <div
            className="
              flex
              flex-col
              items-center
              gap-6
            "
          >
            <p
              className="
                text-[0.6rem] md:text-[0.65rem]
                tracking-[0.32em]
                text-[var(--silver-dark)]
                opacity-75
              "
            >
              必要になったときに、話せる場所は用意しています。
            </p>

            <p
              className="
                text-[0.6rem]
                tracking-[0.32em]
                text-[var(--silver-dark)]
                opacity-45
                italic
              "
            >
              If you need to talk. If you need to adjust.
            </p>

            <a
              href="/contact"
              className="
                mt-2
                text-[0.55rem]
                tracking-[0.42em]
                text-[var(--silver-dark)]
                opacity-40
                transition
                hover:opacity-70
              "
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* =====================
          SP ONLY：スクロールの重力
      ===================== */}
      <div
        aria-hidden
        className="
          md:hidden
          flex
          justify-center
          pb-24
        "
      />
    </>
  );
}
