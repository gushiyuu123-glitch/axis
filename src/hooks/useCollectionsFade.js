import { useEffect } from "react";
import gsap from "gsap";

export default function useCollectionsFade() {
  useEffect(() => {
    const titles = document.querySelectorAll(
      "[data-collections] h3"
    );

    if (!titles.length) return;

    // 初期状態（ほぼ気配）
    gsap.set(titles, {
      opacity: 0,
      y: 8,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(titles, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power1.out",
          stagger: 0.08,
        });

        observer.disconnect();
      },
      {
        rootMargin: "-28% 0px -28% 0px",
        threshold: 0,
      }
    );

    const section = document.querySelector("[data-collections]");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
}
