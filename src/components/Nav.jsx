// src/components/Nav.jsx
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Collections", href: "#collections" },
    { label: "Essays", href: "#essays" },
    { label: "Inquiry", href: "#contact" },
    { label: "Statement", href: "#statement" },
  ];

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
        {/* BRAND */}
        <div
          className="
            font-serif
            tracking-[0.22em]
            text-[0.85rem]
            bg-gradient-to-b
            from-[var(--silver-mid)]
            to-[var(--silver-dark)]
            bg-clip-text
            text-transparent
            select-none
          "
        >
          AXIS
          <span className="ml-2 text-[#bfa76a]">—</span>
        </div>

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
          className="
            fixed inset-0
            z-[60]               /* ← headerより上 */
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
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
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
