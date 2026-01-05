import { useNavigate } from "react-router-dom";

export default function BackButton({
  actions = [],        // [{ to, label, icon }]
  className = "",
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`
        inline-flex items-center gap-10
        ${className}
      `}
    >
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => action.to ? navigate(action.to) : navigate(-1)}
          className="
            relative
            inline-flex items-center gap-3
            text-[0.6rem] tracking-[0.42em] uppercase
            text-[var(--silver-dark)]
            hover:text-[var(--silver-light)]
            transition
            select-none

            /* SP タップ補強（見た目は変えない） */
            px-2 py-2
            md:px-0 md:py-0
          "
          aria-label={action.label}
          type="button"
        >
          {action.icon && (
            <span className="opacity-70">{action.icon}</span>
          )}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
