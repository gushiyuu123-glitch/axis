import { useNavigate } from "react-router-dom";

export default function BackButton({
  actions = [], // [{ to, label, icon }]
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = (action) => {
    // ===== SP 判定 =====
    const isSP = window.matchMedia("(max-width: 768px)").matches;

    // 明示的な遷移先がある場合は最優先
    if (action.to) {
      navigate(action.to);
      return;
    }

    // SP は history に依存しない
    if (isSP) {
      navigate("/", { replace: true });
      return;
    }

    // PC のみ history back
    navigate(-1);
  };

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
          type="button"
          onClick={() => handleClick(action)}
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

            /* iOS対策 */
            focus:outline-none
            active:opacity-80
          "
          aria-label={action.label}
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
