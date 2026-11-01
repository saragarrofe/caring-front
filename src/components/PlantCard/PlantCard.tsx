import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Droplet, Flower2, MapPin } from 'lucide-react';
import { getWateringReminder, getHydrationPercent } from '@utils/reminders';
import { daysUntil } from '@utils/dates';
import { Plant } from 'src/types/Plant';
import { CareLevelBadge } from '@components/CareLevelBadge/CareLevelBadge';

type PlantCardProps = {
  plant: Plant;
};

const STATUS_CONFIG = {
  overdue: {
    label: 'Needs water',
    icon: AlertCircle,
    class: 'danger',
  },
  due: { label: 'Water today', icon: Droplet, iconFill: true, class: 'warning' },
  upcoming: {
    label: 'On track',
    icon: CheckCircle2,
    class: 'success',
  },
  completed: {
    label: 'Watered',
    icon: CheckCircle2,
    class: 'success',
  },
} as const;

const STATUS_BADGE_CLASSES: Record<string, string> = {
  success:
    'pc-status--success bg-[rgba(91,140,90,0.18)] text-[var(--color-primary-dark)] border border-[rgba(91,140,90,0.25)]',
  warning:
    'pc-status--warning bg-[rgba(178,106,0,0.14)] text-[var(--color-warning)] border border-[rgba(178,106,0,0.2)]',
  danger:
    'pc-status--danger bg-[rgba(239,83,80,0.14)] text-[var(--color-danger-dark)] border border-[rgba(239,83,80,0.2)]',
};

const HYDRATION_FILL_CLASSES: Record<string, string> = {
  success: 'pc-fill--success bg-[var(--color-primary)]',
  warning: 'pc-fill--warning bg-[var(--color-warning)]',
  danger: 'pc-fill--danger bg-[var(--color-danger)]',
};

const MOOD_BORDER_CLASSES: Record<string, string> = {
  happy: 'border-[rgba(95,184,90,0.35)]',
  thirsty: 'border-[rgba(212,155,42,0.35)]',
  wilting: 'border-[rgba(186,26,26,0.25)]',
};

export function PlantCard({ plant }: PlantCardProps) {
  const reminder = getWateringReminder(plant);
  const hydration = getHydrationPercent(plant);
  const status = STATUS_CONFIG[reminder.status];
  const StatusIcon = status.icon;
  const statusIconFill = 'iconFill' in status && status.iconFill;

  const daysSinceWatered = -daysUntil(plant.lastWatered);
  const lastWateredLabel =
    daysSinceWatered === 0
      ? 'Today'
      : daysSinceWatered === 1
        ? 'Yesterday'
        : `${daysSinceWatered} days ago`;

  const mood = hydration >= 60 ? 'happy' : hydration >= 25 ? 'thirsty' : 'wilting';
  const justWatered = daysSinceWatered === 0;

  return (
    <Link
      to={`/my-plants/${plant.id}`}
      className={`plant-card group relative flex h-full flex-col rounded-[16px] border bg-[var(--color-bg)] text-[var(--color-text)] no-underline transition-[transform,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:border-[var(--color-primary-light)] hover:shadow-[var(--shadow-lg)] active:translate-y-0 ${MOOD_BORDER_CLASSES[mood]}`}
      aria-label={`${plant.name} — ${status.label}`}
    >
      {/* Theme-swap colors, hover image scale and shine keyframe are not expressible as
          pure Tailwind utilities with this project's [data-theme='dark'] setup. */}
      <style>{`
        .plant-card:hover .pc-image { transform: scale(1.04); }
        @keyframes shine-sweep {
          from { background-position: 200% center; }
          to { background-position: -60% center; }
        }
        .pc-shine {
          background: linear-gradient(108deg, transparent 28%, rgba(255,255,255,0.55) 48%, transparent 68%);
          background-size: 250% 100%;
          background-position: 200% center;
          animation: shine-sweep 1.4s cubic-bezier(0.4,0,0.2,1) 0.15s forwards;
        }
        [data-theme='dark'] .plant-card {
          background: var(--color-bg-card-dark);
          border-color: rgba(255,255,255,0.08);
          color: var(--color-text-on-dark);
        }
        [data-theme='dark'] .plant-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4);
        }
        [data-theme='dark'] .pc-image-wrap { background: var(--color-bg-dark); }
        [data-theme='dark'] .pc-placeholder { background: var(--color-bg-dark); color: var(--color-primary-light); }
        [data-theme='dark'] .pc-status--success { background: rgba(91,140,90,0.25); color: var(--color-accent-soft); border-color: rgba(91,140,90,0.35); }
        [data-theme='dark'] .pc-status--warning { background: rgba(251,191,36,0.18); color: var(--color-warning-light); border-color: rgba(251,191,36,0.28); }
        [data-theme='dark'] .pc-status--danger { background: rgba(248,113,113,0.18); color: var(--color-danger-light); border-color: rgba(248,113,113,0.28); }
        [data-theme='dark'] .pc-name { color: var(--color-text-on-dark); }
        [data-theme='dark'] .pc-species { color: var(--color-text-dark-muted); }
        [data-theme='dark'] .pc-hydration-bar { background: rgba(255,255,255,0.1); }
        [data-theme='dark'] .pc-fill--success { background: var(--color-accent-bright); }
        [data-theme='dark'] .pc-fill--warning { background: var(--color-warning-light); }
        [data-theme='dark'] .pc-fill--danger { background: var(--color-danger-light); }
        [data-theme='dark'] .pc-hydration-value { color: rgba(255,255,255,0.6); }
        [data-theme='dark'] .pc-meta { color: var(--color-text-dark-muted); }
        [data-theme='dark'] .pc-meta svg { color: var(--color-primary-light); }
        @media (max-width: 480px) {
          .pc-body { padding: 10px 12px 12px; gap: 8px; }
          .pc-name { font-size: 14px; }
          .pc-footer { gap: 8px; }
          .pc-meta { font-size: 10px; }
        }
      `}</style>
      <div className="pc-image-wrap relative aspect-[4/3] overflow-hidden rounded-t-[16px] bg-[var(--color-bg-card-green)]">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={`${plant.name} — ${plant.species}`}
            className="pc-image h-full w-full object-cover transition-transform duration-300 ease-[ease]"
            loading="lazy"
          />
        ) : (
          <div className="pc-placeholder flex h-full w-full items-center justify-center bg-[var(--color-bg-card-green)] text-[var(--color-accent)]">
            <Flower2 size={40} />
          </div>
        )}
        {justWatered && (
          <div className="pc-shine pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />
        )}
        <span
          className={`absolute left-[10px] top-[10px] inline-flex items-center gap-[5px] rounded-[20px] px-[10px] py-[4px] text-[11px] font-semibold tracking-[0.02em] backdrop-blur-[8px] ${STATUS_BADGE_CLASSES[status.class]}`}
        >
          <StatusIcon size={12} {...(statusIconFill ? { fill: 'currentColor' } : {})} />
          {status.label}
        </span>
        {plant.careLevel && (
          <span>
            <CareLevelBadge level={plant.careLevel} />
          </span>
        )}
      </div>

      <div className="pc-body flex flex-1 flex-col gap-[10px] px-[14px] pb-[14px] pt-[12px]">
        <div className="min-w-0">
          <h3 className="pc-name m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-[var(--color-text)]">
            {plant.name}
          </h3>
          <p className="pc-species mt-[2px] mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] italic text-[var(--color-text-muted)]">
            {plant.species}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-[8px]">
          <div className="pc-hydration-bar h-[6px] flex-1 overflow-hidden rounded-[3px] bg-[var(--color-muted)]">
            <div
              className={`h-full rounded-[3px] transition-[width] duration-[400ms] ease-[ease] ${HYDRATION_FILL_CLASSES[status.class]}`}
              style={{ width: `${hydration}%` }}
            />
          </div>
          <span className="pc-hydration-value min-w-[32px] text-right text-[12px] font-bold text-[var(--color-text-muted)]">
            {hydration}%
          </span>
        </div>

        <div className="pc-footer flex flex-wrap items-center gap-[12px]">
          <span className="pc-meta inline-flex items-center gap-[4px] text-[11px] text-[var(--color-text-subtle)]">
            <Droplet size={12} className="text-[var(--color-accent)]" />
            {lastWateredLabel}
          </span>
          {plant.location && (
            <span className="pc-meta inline-flex items-center gap-[4px] text-[11px] text-[var(--color-text-subtle)]">
              <MapPin size={12} className="text-[var(--color-accent)]" />
              {plant.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
