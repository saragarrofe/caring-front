interface Props {
  level: 'Easy' | 'Medium' | 'Hard';
}

const LEVEL_CLASSES = {
  Easy: 'care-badge--easy bg-[rgba(91,140,90,0.12)] text-[var(--color-primary)]',
  Medium: 'care-badge--medium bg-[rgba(234,179,8,0.12)] text-[#b45309]',
  Hard: 'care-badge--hard bg-[rgba(239,68,68,0.1)] text-[#dc2626]',
} as const;

export function CareLevelBadge({ level }: Props) {
  return (
    <>
      {/* Dark-theme color swaps depend on the [data-theme='dark'] ancestor, which is
          not expressible via Tailwind's dark: variant in this project — kept minimal. */}
      <style>{`
        [data-theme='dark'] .care-badge--easy { background: rgba(108, 208, 68, 0.12); color: var(--color-primary-light); }
        [data-theme='dark'] .care-badge--medium { background: rgba(234, 179, 8, 0.1); color: #fbbf24; }
        [data-theme='dark'] .care-badge--hard { background: rgba(239, 68, 68, 0.12); color: #f87171; }
      `}</style>
      <span
        className={`inline-block rounded-[20px] px-[10px] py-[2px] text-[11px] font-bold uppercase tracking-[0.04em] ${LEVEL_CLASSES[level]}`}
      >
        {level}
      </span>
    </>
  );
}
