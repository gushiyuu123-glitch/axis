// src/sections/Contact.jsx
export default function Contact() {
  return (
    <>
      {/* =====================
          CONTACT（PC完成形）
          ※ 中身は一切変更しない
      ===================== */}
      <section
        id="contact"
        aria-label="Contact"
        className="
          relative
          min-h-[42vh]
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
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
          ※ PCには一切表示されない
      ===================== */}
      <div
        aria-hidden
        className="
          md:hidden
          flex
          justify-center
          pb-24
        "
      >

      </div>
    </>
  );
}
