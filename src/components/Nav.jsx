// src/components/Nav.jsx
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  const links = [
    { label: "Collections", href: "#collections" },
    { label: "Essays", href: "#essays" },
    { label: "Inquiry", href: "#contact" },
    { label: "Statement", href: "#statement" },
  ];

  /* =====================
     SP MENU OPEN ANIMATION
  ===================== */
  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();

    // 初期状態ロック
    gsap.set(overlay, { opacity: 0 });
    gsap.set(linksRef.current, { opacity: 0, y: 10 });

    tl.to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }).to(
      linksRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      },
      "-=0.1"
    );

    return () => tl.kill();
  }, [open]);

  return (
    <>
      {/* =====================
          HEADER（常時）
      ===================== */}
      <header
        aria-label="Global navigation"
        className="
          fixed top-0 left-0
          w-full h-[68px]
          z-50
          flex items-center justify-between
          px-6 md:px-10
          backdrop-blur-sm
          bg-black/40
        "
      >
   {/* BRAND LOGO */}
<a
  href="#top"
  aria-label="Back to top"
  className="
    group
    relative
    flex
    items-center
    gap-3
    font-serif
    tracking-[0.22em]
    text-[0.85rem]
    select-none
    transition
  "
>
  {/* AXIS TEXT */}
  <span
    className="
      relative
      bg-gradient-to-b
      from-[var(--silver-mid)]
      to-[var(--silver-dark)]
      bg-clip-text
      text-transparent
      transition-all
      duration-300
      group-hover:tracking-[0.28em]
    "
  >
    AXIS
  </span>

  {/* AXIS LINE（縦軸） */}
  <span
    aria-hidden
    className="
      block
      h-[18px]
      w-px
      bg-[var(--silver-dark)]
      opacity-50
      transition-all
      duration-300
      group-hover:opacity-80
      group-hover:scale-y-110
    "
  />

  {/* SUB MARK */}
  <span
    className="
      text-[0.6rem]
      tracking-[0.18em]
      text-[#bfa76a]
      opacity-70
      transition
      duration-300
      group-hover:opacity-100
    "
  >
    —
  </span>
</a>


        {/* PC NAV */}
        <nav className="hidden md:block">
          <ul
            className="
              flex gap-10
              text-[0.7rem]
              tracking-[0.32em]
              uppercase
              text-[var(--silver-dark)]
            "
          >
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="
                    relative
                    transition-all
                    duration-300
                    hover:text-[var(--silver-light)]
                    hover:tracking-[0.38em]
                    after:absolute
                    after:left-0
                    after:-bottom-1.5
                    after:h-px
                    after:w-0
                    after:bg-[#bfa76a]/70
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  "
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* SP MENU TOGGLE */}
        <button
          onClick={() => setOpen(true)}
          className="
            md:hidden
            text-[0.65rem]
            tracking-[0.32em]
            uppercase
            text-[var(--silver-dark)]
          "
          aria-label="Open menu"
        >
          Menu
        </button>
      </header>

      {/* =====================
          SP OVERLAY MENU
      ===================== */}
      {open && (
        <div
          ref={overlayRef}
          className="
            fixed inset-0
            z-[60]
            bg-black/95
            flex flex-col
            items-center justify-center
            space-y-10
            text-[0.8rem]
            tracking-[0.36em]
            uppercase
            text-[var(--silver-light)]
          "
        >
          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="
              absolute top-6 right-6
              text-[0.6rem]
              tracking-[0.32em]
              text-[var(--silver-dark)]
              hover:text-[var(--silver-light)]
            "
            aria-label="Close menu"
          >
            Close
          </button>

          {/* LINKS */}
          {links.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={() => setOpen(false)}
              className="hover:opacity-70 transition"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
