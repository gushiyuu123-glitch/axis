import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import BackButton from "../components/BackButton";

/* =====================
   CATEGORY META
===================== */
const CATEGORIES = [
  { slug: "ring", label: "Ring" },
  { slug: "necklace", label: "Necklace" },
  { slug: "bracelet", label: "Bracelet" },
];

/* =====================
   PRODUCT DATA
===================== */
const PRODUCTS = {
  ring: [
    { slug: "ring-01", name: "Ring No.01", price: "¥48,000", image: "/images/ring-011.png" },
    { slug: "ring-02", name: "Ring No.02", price: "¥52,000", image: "/images/ring-02.png" },
    { slug: "ring-03", name: "Ring No.03", price: "¥45,000", image: "/images/ring-03.png" },
    { slug: "ring-04", name: "Ring No.04", price: "¥50,000", image: "/images/ring-04.png" },
    { slug: "ring-05", name: "Ring No.05", price: "¥58,000", image: "/images/ring-05.png" },
    { slug: "ring-06", name: "Ring No.06", price: "¥60,000", image: "/images/ring-011.png" },
  ],
  necklace: [
    { slug: "necklace-01", name: "Necklace No.01", price: "¥72,000", image: "/images/necklace-011.png" },
    { slug: "necklace-02", name: "Necklace No.02", price: "¥78,000", image: "/images/necklace-02.png" },
    { slug: "necklace-03", name: "Necklace No.03", price: "¥69,000", image: "/images/necklace-03.png" },
    { slug: "necklace-04", name: "Necklace No.04", price: "¥74,000", image: "/images/necklace-04.png" },
    { slug: "necklace-05", name: "Necklace No.05", price: "¥82,000", image: "/images/necklace-05.png" },
    { slug: "necklace-06", name: "Necklace No.06", price: "¥85,000", image: "/images/necklace-06.png" },
  ],
  bracelet: [
    { slug: "bracelet-01", name: "Bracelet No.01", price: "¥58,000", image: "/images/bracelet-011.png" },
    { slug: "bracelet-02", name: "Bracelet No.02", price: "¥62,000", image: "/images/bracelet-02.png" },
    { slug: "bracelet-03", name: "Bracelet No.03", price: "¥55,000", image: "/images/bracelet-03.png" },
    { slug: "bracelet-04", name: "Bracelet No.04", price: "¥60,000", image: "/images/bracelet-04.png" },
    { slug: "bracelet-05", name: "Bracelet No.05", price: "¥66,000", image: "/images/bracelet-05.png" },
    { slug: "bracelet-06", name: "Bracelet No.06", price: "¥63,000", image: "/images/bracelet-06.png" },
  ],
};

export default function Object() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const items = PRODUCTS[slug];
  const category = CATEGORIES.find((c) => c.slug === slug);

  const isSP = window.matchMedia("(max-width: 768px)").matches;

  /* 不正 slug 保険 */
  useEffect(() => {
    if (!items) navigate("/");
  }, [items, navigate]);

  /* entrance animation（PC/SP共通・軽め） */
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-anim]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.04,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [slug]);

  if (!items || !category) return null;

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-black text-[var(--silver-light)]"
    >
      {/* =====================
          HEADER
      ===================== */}
      <section className="min-h-[42vh] md:min-h-[55vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p
            data-anim
            className="text-[0.6rem] tracking-[0.42em] text-[var(--silver-dark)] mb-6 uppercase"
          >
            Collection
          </p>

          <h1
            data-anim
            className="font-serif tracking-[0.28em]
              text-[clamp(2.4rem,10vw,3.6rem)]
              md:text-[clamp(2.8rem,8vw,5.4rem)]
            "
          >
            {category.label}
          </h1>
        </div>
      </section>

      {/* =====================
          PRODUCT GRID
      ===================== */}
      <section
        className="
          max-w-6xl mx-auto px-6
          py-24 md:py-32
          grid grid-cols-1 md:grid-cols-2
          gap-y-24 md:gap-y-32
          gap-x-24
        "
      >
        {items.map((p) => (
          <article
            key={p.slug}
            data-anim
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            <div className="overflow-hidden bg-black">
              <img
                src={p.image}
                alt={p.name}
                className="
                  w-full object-cover
                  transition-all duration-[1400ms] ease-out
                  md:group-hover:scale-[1.035]
                  md:group-hover:opacity-90
                "
              />
            </div>

            <div className="mt-5 md:mt-6">
              <p className="font-serif tracking-[0.22em] text-[1rem] md:text-lg">
                {p.name}
              </p>
              <p className="mt-1.5 md:mt-2 text-[0.7rem] md:text-xs tracking-[0.32em] text-[var(--silver-dark)]">
                {p.price}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* =====================
          CATEGORY LINKS
      ===================== */}
      <section className="py-24 md:py-32 text-center px-6">
        <ul className="flex justify-center gap-12 md:gap-16">
          {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
            <li
              key={c.slug}
              data-anim
              onClick={() => navigate(`/object/${c.slug}`)}
              className="
                cursor-pointer
                text-[0.6rem]
                tracking-[0.42em]
                uppercase
                text-[var(--silver-dark)]
                hover:text-[var(--silver-light)]
                transition
              "
            >
              {c.label}
            </li>
          ))}
        </ul>
      </section>

      {/* Back */}
      <div className="mb-10 flex justify-center" data-anim>
        <BackButton
          className="pt-16 md:pt-24"
          actions={[
            {
              to: "/",
              label: "Back to Home",
              icon: "←",
            },
          ]}
        />
      </div>

      {/* =====================
          PRESENCE
      ===================== */}
      <section className="py-32 md:py-40 text-center px-6 border-t border-white/10">
        <p
          data-anim
          className="text-[0.55rem] tracking-[0.42em] text-[var(--silver-dark)] uppercase"
        >
          Other pieces exist within this collection
        </p>
      </section>
    </main>
  );
}
