import { Link } from 'react-router-dom';
import { Flower2, Droplet, ChevronRight } from 'lucide-react';
import { Plant } from 'src/types/Plant';
import { getHydrationPercent } from '@utils/reminders';
import { addDays, daysUntil } from '@utils/dates';

type UpcomingListProps = {
  plants: Plant[];
};

export function UpcomingList({ plants }: UpcomingListProps) {
  if (plants.length === 0) {
    return (
      <p className="py-[24px] text-center text-[14px] text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
        No upcoming waterings this week.
      </p>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-[6px] p-0">
      {plants.map((plant) => {
        const hydration = getHydrationPercent(plant);
        const nextDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency.intervalDays);
        const days = daysUntil(nextDate);
        const daysLabel = days === 1 ? 'tomorrow' : `in ${days} days`;

        return (
          <li key={plant.id}>
            <Link
              to={`/my-plants/${plant.id}`}
              className="group flex items-center gap-[12px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg)] px-[14px] py-[12px] text-inherit no-underline transition-[background,border-color] duration-150 hover:border-[var(--color-primary-light)] hover:bg-[var(--color-bg-card-green)] hover:text-inherit [[data-theme='dark']_&]:border-white/[0.08] [[data-theme='dark']_&]:bg-[var(--color-bg-card-dark)] [[data-theme='dark']_&]:hover:border-[var(--color-primary)] [[data-theme='dark']_&]:hover:bg-white/[0.04]"
            >
              <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[var(--color-bg-card-green)] text-[18px] text-[var(--color-accent)] [[data-theme='dark']_&]:bg-[var(--color-bg-dark)]">
                {plant.imageUrl ? (
                  <img src={plant.imageUrl} alt={plant.name} className="h-full w-full object-cover" />
                ) : (
                  <Flower2 size={18} />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold text-[var(--color-text)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]">
                  {plant.name}
                </span>
                <span className="flex items-center gap-[4px] text-[12px] text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
                  <Droplet
                    size={11}
                    className="text-[var(--color-accent)] [[data-theme='dark']_&]:text-[var(--color-primary-light)]"
                  />{' '}
                  {daysLabel}
                </span>
              </div>

              <div className="flex w-[100px] flex-shrink-0 items-center gap-[8px] max-[480px]:w-[80px]">
                <div className="h-[6px] flex-1 overflow-hidden rounded-[3px] bg-[var(--color-muted)] [[data-theme='dark']_&]:bg-white/10">
                  <div
                    className="h-full rounded-[3px] bg-[var(--color-primary)] transition-[width] duration-[400ms] ease-in-out [[data-theme='dark']_&]:bg-[var(--color-accent-bright)]"
                    style={{ width: `${hydration}%` }}
                  />
                </div>
                <span className="min-w-[32px] text-right text-[12px] font-bold text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-white/60">
                  {hydration}%
                </span>
              </div>

              <ChevronRight
                size={14}
                className="flex-shrink-0 text-[var(--color-text-faint)] [[data-theme='dark']_&]:text-white/30"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
