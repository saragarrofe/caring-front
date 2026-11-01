import { WateringEntry } from 'src/types/Plant';

type WateringHistoryProps = {
  entries: WateringEntry[];
};

export function WateringHistory({ entries }: WateringHistoryProps) {
  return (
    <section className="mt-0">
      <h2 className="mb-4 text-[16px] font-bold text-[var(--color-primary)]">Watering history</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No waterings logged yet. Water your plant to get started!</p>
      ) : (
        <ul className="m-0 list-none p-0">
          {[...entries].reverse().map((entry, i) => (
            <li
              key={`${entry.date}-${i}`}
              className="relative ml-[6px] flex items-start gap-[12px] border-l-2 border-[var(--color-border)] py-[10px] pl-[16px]"
            >
              <div className="absolute left-[-6px] top-[14px] h-[10px] w-[10px] rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-primary-dark)]" />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[14px] font-semibold text-[var(--color-primary)]">
                  {entry.date}
                </span>
                {entry.note && (
                  <span className="text-[13px] text-[var(--color-text-subtle)]">{entry.note}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
