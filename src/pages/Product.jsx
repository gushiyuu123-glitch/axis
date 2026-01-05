import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { PRODUCTS } from "../data/products";
import BackButton from "../components/BackButton";

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const product =
    Object.values(PRODUCTS)
      .flat()
      .find((p) => p.slug === slug);

  const categoryKey = Object.keys(PRODUCTS).find((key) =>
    PRODUCTS[key].some((p) => p.slug === slug)
  );

  const list = PRODUCTS[categoryKey] || [];
  const currentIndex = list.findIndex((p) => p.slug === slug);

  const nextProduct =
    currentIndex !== -1 && currentIndex < list.length - 1
      ? list[currentIndex + 1]
      : null;

  /* 不正 slug 保険 */
  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  /* scroll reset */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* entrance animation */
  useEffect(() => {
    if (!rootRef.current) return;

    gsap.fromTo(
      rootRef.current.querySelectorAll("[data-anim]"),
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.06,
      }
    );
  }, [slug]);

  if (!product) return null;

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-black text-[var(--silver-light)]"
    >
      {/* =====================
          PRODUCT MAIN
      ===================== */}
      <section
        className="
          max-w-6xl mx-auto
          px-6
          py-24 md:py-32
          grid grid-cols-1 md:grid-cols-2
          gap-20 md:gap-24
          items-start
        "
      >
        {/* IMAGES */}
        <div className="space-y-12 md:space-y-16">
          {product.images.map((src, i) => (
            <img
              key={i}
              data-anim
              src={src}
              alt={product.name}
              className="w-full object-cover"
            />
          ))}
        </div>

        {/* INFO */}
        <div className="space-y-10 md:space-y-14 md:sticky md:top-32">
          <h1
            data-anim
            className="
              font-serif tracking-[0.18em]
              text-[clamp(2rem,7vw,2.6rem)]
              md:text-[clamp(2.2rem,5vw,3.2rem)]
            "
          >
            {product.name}
          </h1>

          <p data-anim className="tracking-widest text-[1.05rem] md:text-xl">
            {product.price}
          </p>

          <button
            data-anim
            className="
              w-full py-4
              border border-[var(--silver-light)]
              tracking-[0.32em] text-sm
              hover:bg-[var(--silver-light)]
              hover:text-black
              transition
            "
          >
            Add to cart
          </button>

          <ul
            data-anim
            className="
              pt-8 md:pt-10
              border-t border-white/10
              space-y-2
              text-[0.8rem] md:text-sm
              text-[var(--silver-dark)]
            "
          >
            {product.specs.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================
          NEXT PRODUCT
      ===================== */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-white/10">
        {nextProduct ? (
          <>
            <p
              data-anim
              className="
                text-[0.55rem]
                tracking-[0.42em]
                text-[var(--silver-dark)]
                uppercase
                mb-16
                text-center
              "
            >
              Next piece in this collection
            </p>

            <div
              data-anim
              onClick={() => navigate(`/product/${nextProduct.slug}`)}
              className="group cursor-pointer max-w-md mx-auto"
            >
              <img
                src={nextProduct.images[0]}
                alt={nextProduct.name}
                className="
                  w-full object-cover
                  transition-all duration-[1200ms] ease-out
                  md:group-hover:scale-[1.03]
                  md:group-hover:opacity-90
                "
              />
              <p className="mt-6 font-serif tracking-[0.22em] text-sm text-center">
                {nextProduct.name}
              </p>
              <p className="mt-1 text-xs tracking-[0.32em] text-[var(--silver-dark)] text-center">
                {nextProduct.price}
              </p>
            </div>
          </>
        ) : (
          <>
            <p
              data-anim
              className="
                text-[0.55rem]
                tracking-[0.42em]
                text-[var(--silver-dark)]
                uppercase
                mb-10
                text-center
              "
            >
              End of this collection
            </p>

            <div className="flex justify-center" data-anim>
              <BackButton
                actions={[
                  {
                    to: `/object/${categoryKey}`,
                    label: "Back to Collection",
                    icon: "←",
                  },
                ]}
              />
            </div>
          </>
        )}
      </section>

      {/* =====================
          GLOBAL BACK
      ===================== */}
      <div className="mb-10 flex justify-center" data-anim>
        <BackButton
          className="pt-16 md:pt-24"
          actions={[
            {
              to: "/",
              label: "Home",
              icon: "⌂",
            },
          ]}
        />
      </div>
    </main>
  );
}
