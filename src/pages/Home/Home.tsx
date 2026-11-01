import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight, CalendarDays } from 'lucide-react';
import { Plant, WateringEntry } from 'src/types/Plant';
import { getWateringReminder } from '@utils/reminders';
import { addDays, daysUntil } from '@utils/dates';
import { PlantUrgentCard } from '@components/PlantUrgentCard/PlantUrgentCard';
import { UpcomingList } from '@components/UpcomingList/UpcomingList';
import { getUserPlants, waterPlant } from 'src/api/plants';

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getUserPlants().then((plants) => {
      if (plants) setPlants(plants);
    });
  }, []);

  const { urgent, upcoming } = useMemo(() => {
    const urgentList: Plant[] = [];
    const upcomingList: Plant[] = [];

    for (const plant of plants) {
      const reminder = getWateringReminder(plant);
      if (reminder.status === 'overdue' || reminder.status === 'due') {
        urgentList.push(plant);
      } else {
        const nextDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency.intervalDays);
        const days = daysUntil(nextDate);
        if (days > 0 && days <= 5) {
          upcomingList.push(plant);
        }
      }
    }

    upcomingList.sort((a, b) => {
      const daysA = daysUntil(addDays(new Date(a.lastWatered), a.wateringFrequency.intervalDays));
      const daysB = daysUntil(addDays(new Date(b.lastWatered), b.wateringFrequency.intervalDays));
      return daysA - daysB;
    });

    return { urgent: urgentList, upcoming: upcomingList };
  }, [plants]);

  const handleWater = useCallback(async (plantId: number) => {
    if (!plantId) return;
    const today = new Date().toISOString().split('T')[0];
    const newEntry: WateringEntry = { date: today };

    try {
      await waterPlant(plantId, today);
      setPlants((prev) => {
        const next = prev.map((p) => {
          if (p.id !== plantId) return p;
          return {
            ...p,
            lastWatered: today,
            wateringHistory: [...(p.wateringHistory ?? []), newEntry],
          };
        });
        return next;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="px-[clamp(16px,5vw,34px)] pt-[clamp(20px,4vw,34px)] pb-20">
      <header className="mb-6">
        <h1 className="m-0 text-[clamp(22px,4vw,28px)] font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
          Good morning
        </h1>
        <p className="mt-1 mb-0 text-sm text-[var(--color-text-muted)]">{dateLabel}</p>
      </header>

      <section className="mb-7">
        <div className="mb-[14px] flex items-center justify-between">
          <h2 className="m-0 flex items-center gap-2 text-[17px] font-bold text-[var(--color-text)]">
            <AlertTriangle size={18} className="text-[var(--color-primary)]" />
            Needs attention
          </h2>
          <Link
            to="/my-plants"
            className="flex items-center gap-1 text-[13px] font-semibold text-[var(--color-primary)] no-underline hover:text-[var(--color-primary-dark)]"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>

        {urgent.length > 0 ? (
          <div className="flex snap-x snap-mandatory gap-[14px] overflow-x-auto pb-2">
            {urgent.map((plant) => (
              <div key={plant.id} className="snap-start">
                <PlantUrgentCard plant={plant} onWater={handleWater} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-[14px] border border-[var(--color-border-light)] bg-[var(--color-primary-bg)] p-5">
            <span className="text-[28px] leading-none">&#127793;</span>
            <div className="flex flex-col gap-0.5">
              <p className="m-0 text-[15px] font-bold text-[var(--color-text)]">
                All plants are happy!
              </p>
              <p className="m-0 text-[13px] text-[var(--color-text-muted)]">
                No watering needed right now.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mb-7">
        <div className="mb-[14px] flex items-center justify-between">
          <h2 className="m-0 flex items-center gap-2 text-[17px] font-bold text-[var(--color-text)]">
            <CalendarDays size={18} className="text-[var(--color-primary)]" />
            Upcoming this week
          </h2>
        </div>
        <UpcomingList plants={upcoming} />
      </section>
    </div>
  );
}
