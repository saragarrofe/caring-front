import { WateringEntry } from 'src/types/plant';

type WateringHistoryProps = {
  entries: WateringEntry[];
};

export function WateringHistory({ entries }: WateringHistoryProps) {
  return (
    <section className="watering-history">
      <h2 className="watering-history-title">Watering history</h2>
      {entries.length === 0 ? (
        <p className="text-muted">
          No waterings logged yet. Water your plant to get started!
        </p>
      ) : (
        <ul className="watering-history-list">
          {[...entries].reverse().map((entry, i) => (
            <li key={`${entry.date}-${i}`} className="watering-history-entry">
              <div className="watering-history-dot" />
              <div className="watering-history-content">
                <span className="watering-history-date">{entry.date}</span>
                {entry.note && (
                  <span className="watering-history-note">{entry.note}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
