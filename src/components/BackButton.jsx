import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton({
  actions = [], // [{ to, label, icon }]
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (action) => {
    // ===== 明示的遷移先があれば最優先 =====
    if (action.to) {
      navigate(action.to);
      return;
    }

    // ===== SP 判定 =====
    const isSP = window.matchMedia("(max-width: 768px)").matches;

    // ===== 履歴判定 =====
    const hasHistory = window.history.length > 1;

    /**
     * 判断軸：
     * - SP：履歴が壊れやすい → 安定優先
     * - PC：履歴があれば戻る
     * - 外部流入 / 直リンク：トップ
     */

    if (hasHistory && !isSP) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
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

            /* SP タップ補強（見た目維持） */
            px-3 py-3
            md:px-0 md:py-0

            /* iOS / Safari 安定化 */
            focus:outline-none
            active:opacity-80
            touch-manipulation
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
