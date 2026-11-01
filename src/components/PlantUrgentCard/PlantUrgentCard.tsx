import { Link } from 'react-router-dom';
import { AlertCircle, Droplet, Flower2 } from 'lucide-react';
import { Plant } from 'src/types/Plant';
import { getWateringReminder } from '@utils/reminders';
import { daysUntil } from '@utils/dates';

type PlantUrgentCardProps = {
  plant: Plant;
  onWater: (plantId: number) => void;
};

export function PlantUrgentCard({ plant, onWater }: PlantUrgentCardProps) {
  const reminder = getWateringReminder(plant);
  const daysSinceWatered = -daysUntil(plant.lastWatered);

  const lastWateredLabel =
    daysSinceWatered === 0
      ? 'Today'
      : daysSinceWatered === 1
        ? 'Yesterday'
        : `${daysSinceWatered}d ago`;

  const isDanger = reminder.status === 'overdue';

  return (
    <div className="group flex min-w-[220px] max-w-[240px] shrink-0 flex-col overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[var(--shadow-lg)]">
      <Link
        to={`/my-plants/${plant.id}`}
        className="flex flex-col text-inherit no-underline"
        aria-label={`${plant.name} — ${reminder.label}`}
      >
        <div className="aspect-[16/10] overflow-hidden bg-[var(--color-bg-card-green)]">
          {plant.imageUrl ? (
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--color-accent)]">
              <Flower2 size={32} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[4px] px-[14px] pt-[12px] pb-[8px]">
          <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-[var(--color-text)]">
            {plant.name}
          </h3>
          <p className="m-0 text-[12px] italic text-[var(--color-text-muted)]">{plant.species}</p>
          <span
            className={`mt-[4px] inline-flex w-fit items-center gap-[4px] rounded-[20px] px-[8px] py-[3px] text-[11px] font-semibold ${
              isDanger
                ? 'border border-[rgba(239,83,80,0.2)] bg-[rgba(239,83,80,0.12)] text-[var(--color-danger-dark)]'
                : 'border border-[rgba(178,106,0,0.2)] bg-[rgba(178,106,0,0.12)] text-[var(--color-warning)]'
            }`}
          >
            {isDanger ? (
              <AlertCircle size={11} />
            ) : (
              <Droplet size={11} fill="currentColor" />
            )}
            {reminder.label}
          </span>
          <span className="mt-[2px] inline-flex items-center gap-[4px] text-[11px] text-[var(--color-text-subtle)]">
            <Droplet size={12} className="text-[var(--color-accent)]" /> {lastWateredLabel}
          </span>
        </div>
      </Link>

      <button
        className="mx-[14px] mt-[8px] mb-[14px] flex cursor-pointer items-center justify-center gap-[6px] rounded-[10px] border-none bg-[var(--color-primary)] p-[10px] text-[13px] font-semibold text-[var(--color-bg)] transition-[background,transform] duration-150 hover:-translate-y-[1px] hover:bg-[var(--color-primary-dark)] active:translate-y-0"
        onClick={(e) => {
          e.stopPropagation();
          onWater(plant.id);
        }}
        aria-label={`Water ${plant.name}`}
      >
        <Droplet size={14} fill="currentColor" />
        Water now
      </button>
    </div>
  );
}
