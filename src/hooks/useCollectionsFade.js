import { useEffect } from "react";
import gsap from "gsap";

export default function useCollectionsFade() {
  useEffect(() => {
    // Ring / Necklace / Bracelet のみ対象
    const titles = document.querySelectorAll(
      "[data-collections] h3"
    );

    if (!titles.length) return;

    // 初期状態（静か）
    gsap.set(titles, {
      opacity: 0,
      y: 14,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(titles, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power2.out",
          stagger: 0.14,
        });

        observer.disconnect();
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0,
      }
    );

    const section = document.querySelector("[data-collections]");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
}
