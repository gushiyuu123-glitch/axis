export default function Spacer() {
  return (
    <section
      className="
        relative
        w-full
        bg-black
        overflow-hidden

        /* SP */
        py-[12vh]

        /* PC */
        md:py-[18vh]
      "
      aria-hidden="true"
    >
      {/* 空気の中心 */}
      <div className="relative w-full flex justify-center items-center">
        <span
          className="
            block
            w-[120px]
            h-px
            bg-gradient-to-r
            from-transparent
            via-[var(--silver-dark)]
            to-transparent
            opacity-35
            animate-[silver-breath_10s_ease-in-out_infinite]
          "
        />
      </div>
    </section>
  );
}
