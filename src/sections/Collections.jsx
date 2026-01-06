// src/sections/Collections.jsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

/* =====================
   COLLECTION DATA
===================== */
const collections = [
  { slug: "ring", label: "Ring", sub: "Fragment", image: "/images/ring-01.png" },
  { slug: "necklace", label: "Necklace", sub: "Fragment", image: "/images/necklace-01.png" },
  { slug: "bracelet", label: "Bracelet", sub: "Fragment", image: "/images/bracelet-01.png" },
];

export default function Collections() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef(null);
  const bgRefs = useRef({});

  // ===== SP 判定（PCロジックは触らない）=====
  const isSP = window.matchMedia("(max-width: 768px)").matches;

  /* =====================
     INTERSECTION OBSERVER
  ===================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* =====================
     NAVIGATION
  ===================== */
  const goObject = (slug) => {
    const el = bgRefs.current[slug];

    /* ===== SP：安全版 ===== */
    if (isSP) {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0.25, scale: 1.04, filter: "blur(6px)" },
          { opacity: 0, scale: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }
        );
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate(`/object/${slug}`);
      return;
    }

    /* ===== PC（既存挙動：完全維持）===== */
    if (el) {
      gsap.to(el, { opacity: 0.35, scale: 1.02, duration: 0.25, ease: "power2.out" });
    }

    gsap.to("body", {
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: "power1.out",
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        navigate(`/object/${slug}`);
        gsap.to("body", { opacity: 1, duration: 0.4 });
      },
    });
  };

  /* =====================
     BACKGROUND CONTROL（PC ONLY）
  ===================== */
  const showBg = (slug) => {
    if (isSP || !inView) return;
    setActive(slug);

    Object.entries(bgRefs.current).forEach(([key, el]) => {
      if (!el) return;
      gsap.to(el, {
        opacity: key === slug ? 0.28 : 0,
        scale: key === slug ? 1 : 1.06,
        filter: key === slug ? "blur(0px)" : "blur(10px)",
        duration: 1.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  const hideBg = () => {
    if (isSP) return;
    setActive(null);

    Object.values(bgRefs.current).forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        scale: 1.06,
        filter: "blur(10px)",
        x: 0,
        y: 0,
        duration: 1.6,
        ease: "power4.out",
        overwrite: "auto",
      });
    });
  };

  /* =====================
     POINTER FLOAT（PC ONLY）
  ===================== */
  const onPointerMove = (e) => {
    if (isSP || !active || !inView) return;
    const el = bgRefs.current[active];
    if (!el) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    gsap.to(el, { x, y, duration: 0.9, ease: "power2.out", overwrite: "auto" });
  };

  /* =====================
     SUBTLE BREATH（PC ONLY）
  ===================== */
  useEffect(() => {
    if (!active || isSP || !inView) return;
    const el = bgRefs.current[active];
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { scale: 1.012, duration: 4.5, ease: "sine.inOut" });
    return () => tl.kill();
  }, [active, isSP, inView]);

  /* =====================
     RESET WHEN OUT OF VIEW
  ===================== */
  useEffect(() => {
    if (inView) return;
    setActive(null);

    Object.values(bgRefs.current).forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, scale: 1.08, x: 0, y: 0, filter: "blur(10px)" });
    });
  }, [inView]);

  /* =====================
     RENDER
  ===================== */
  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 z-0" onPointerMove={onPointerMove}>
        {collections.map((c) => (
          <img
            key={c.slug}
            ref={(el) => (bgRefs.current[c.slug] = el)}
            src={c.image}
            alt=""
            className="
              absolute inset-0 w-full h-full
              object-cover opacity-0 scale-[1.08]
              pointer-events-none
            "
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-[18vh] md:py-[28vh]">
        <p className="uppercase tracking-[0.32em] text-[0.65rem] text-muted mb-24 text-center md:text-left">
          Collections
        </p>

        <div className="space-y-20 md:space-y-28">
          {collections.map((c) => (
            <div
              key={c.slug}
              onMouseEnter={() => showBg(c.slug)}
              onMouseLeave={hideBg}
              onClick={() => goObject(c.slug)}
              className="
                group cursor-pointer select-none
                text-center md:text-left

                /* ほんの少しだけボタン感 */
                transition-transform duration-300
                hover:translate-y-[-2px]
                active:translate-y-[0px]
              "
            >
              <h3
                className="
                  font-serif
                  tracking-[0.24em]
                  text-[var(--silver-mid)]
                  opacity-90
                  transition-all duration-500
                  group-hover:text-[var(--silver-light)]
                  group-hover:opacity-100

                  text-[clamp(2.2rem,10vw,3rem)]
                  md:text-[clamp(2.8rem,6vw,4.4rem)]
                  mx-auto md:mx-0
                "
              >
                {c.label}
              </h3>

              <p
                className="
                  mt-3
                  text-[0.55rem]
                  tracking-[0.42em]
                  text-[var(--silver-dark)]
                  uppercase
                  text-center md:text-left
                "
              >
                {c.sub}
              </p>

              <span
                className="
                  block mt-6 h-px
                  bg-[var(--silver-dark)]
                  opacity-30
                  transition-all duration-700

                  mx-auto w-[48px]
                  group-hover:w-[96px]

                  md:mx-0 md:w-[56px]
                  md:group-hover:w-[120px]

                  group-hover:opacity-60
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
