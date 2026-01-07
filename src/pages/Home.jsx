// src/pages/Home.jsx
import Nav from "../components/Nav";
import Hero from "../sections/Hero";
import Silence from "../sections/Silence";
import Definition from "../sections/Definition";
import Spacer from "../sections/Spacer";
import Collections from "../sections/Collections";
import AfterCollections from "../sections/AfterCollections";
import Essays from "../sections/Essays";
import Statement from "../sections/Statement";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import useCollectionsFade from "../hooks/useCollectionsFade";
export default function Home() {
    useCollectionsFade();
  return (
    <>
      {/* =====================
          GLOBAL NAV
      ===================== */}
      <Nav />

      {/* =====================
          HERO（直感）
      ===================== */}
      <section id="top">
      <Hero />
</section>
      {/* =====================
          SILENCE（呼吸）
      ===================== */}
      <Silence />

      {/* =====================
          DEFINITION（切り分け）
      ===================== */}
      <Definition />

      {/* =====================
          SPACER（無意識の整理）
      ===================== */}
      <Spacer />

      {/* =====================
          COLLECTIONS（選択）
      ===================== */}
      <section id="collections" >
        <Collections />
      </section>

      {/* =====================
          AFTER COLLECTIONS（余韻）
      ===================== */}
      <AfterCollections />

      {/* =====================
          ESSAYS（言語化）
      ===================== */}
      <section id="essays">
        <Essays />
      </section>
{/* =====================
    INQUIRY（現実への入口）
===================== */}
<section id="Contact">
  <Contact />
</section>
      {/* =====================
          STATEMENT（最終判断）
      ===================== */}
      <section id="statement">
        <Statement />
      </section>

      {/* =====================
          FOOTER（現実への帰還）
      ===================== */}
      <Footer />
    </>
  );
}
