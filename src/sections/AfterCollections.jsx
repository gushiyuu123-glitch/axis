// src/sections/AfterCollections.jsx
export default function AfterCollections() {
  return (
    <>
      {/* =====================
          AFTER COLLECTIONS（PC完成形）
          ※ 中身は一切変更しない
      ===================== */}
      <section
        aria-label="After Collections"
        className="
          relative
          min-h-[55vh]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* =====================
            AIR ONLY（気配）
        ===================== */}
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0
            -z-10
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(255,255,255,0.05),
              rgba(0,0,0,0) 72%
            )]
            animate-[airPulse_14s_ease-in-out_infinite]
          "
        />

        {/* =====================
            WHISPER COPY
        ===================== */}
        <div className="relative mt-28 flex flex-col items-center text-center">
          {/* 上：判断（主） */}
          <p
            className="
              text-[0.7rem]
              tracking-[0.3em]
              text-[var(--silver-mid)]
              leading-[2.4]
            "
          >
            似合うかどうかは、もう決まっている。
          </p>

          {/* 下：条件（囁き） */}
          <p
            className="
              mt-8
              text-[0.65rem]
              tracking-[0.42em]
              text-[var(--silver-dark)]
              opacity-90
              italic
              drop-shadow-[0_0_6px_rgba(200,200,200,0.12)]
            "
          >
            迷っているなら、まだ早い。
          </p>

          {/* 沈黙 */}
          <span
            aria-hidden
            className="
              block
              mt-12
              w-[64px]
              h-px
              bg-[var(--silver-dark)]
              opacity-25
              mx-auto
            "
          />
        </div>
      </section>

      {/* =====================
          SP ONLY：次へ進む重力
          ※ PCには一切表示されない
      ===================== */}
      <div
        aria-hidden
        className="
          md:hidden
          flex
          justify-center
          pb-20
        "
      >
        <span
          className="
            text-[0.55rem]
            tracking-[0.4em]
            text-[var(--silver-dark)]
            opacity-40
            select-none
          "
        >
          ↓
        </span>
      </div>
    </>
  );
}
