// src/components/Footer.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const footerRef = useRef(null);
  const axisRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const axis = axisRef.current;
    if (!footer || !axis) return;

    // 初期状態（存在を消す）
    gsap.set(axis, {
      opacity: 0,
      y: 8,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(axis, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
        });

        observer.disconnect(); // 一度だけ
      },
      {
        rootMargin: "-35% 0px -10% 0px",
        threshold: 0,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      aria-label="Footer"
      className="
        relative
        mt-32
        py-28
        text-center
        border-t
        border-white/10 
      "
    >
      {/* =====================
          BRAND TRACE
      ===================== */}
      <p
        ref={axisRef}
        className="
          text-[0.65rem]
          tracking-[0.42em]
          text-[var(--silver-mid)]
          mb-14
          select-none
        "
      >
        AXIS
      </p>

      {/* =====================
          LINKS（出口）
      ===================== */}
      <nav
        aria-label="Footer navigation"
        className="
          flex
          justify-center
          gap-10
          text-[0.55rem]
          tracking-[0.42em]
          uppercase
          text-[var(--silver-dark)]
          mb-20
        "
      >
        <a href="#" className="hover:text-[var(--silver-light)] transition">
          Instagram
        </a>
        <a href="/contact" className="hover:text-[var(--silver-light)] transition">
          Contact
        </a>
        <a href="/privacy" className="hover:text-[var(--silver-light)] transition">
          Privacy
        </a>
      </nav>

      {/* =====================
          CREDIT + COPYRIGHT（消え際）
      ===================== */}
      <div className="space-y-4">
        <a
          href="https://gushikendesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block
            text-[0.5rem]
            tracking-[0.32em]
            text-[var(--silver-dark)]
            opacity-30
            hover:opacity-55
            transition
          "
        >
          Designed by Gushiken Design
        </a>

        <small
          className="
            block
            text-[0.55rem]
            tracking-[0.32em]
            text-[var(--silver-dark)]
            opacity-40
          "
        >
          © {new Date().getFullYear()} AXIS
        </small>
      </div>
    </footer>
  );
}
