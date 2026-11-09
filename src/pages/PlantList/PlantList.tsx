import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { PlantCard } from '@/components/PlantCard';
import { getWateringReminder } from '@utils/reminders';
import { getUserPlants } from 'src/api/plants';
import { Plant } from 'src/types/Plant';

type WaterFilter = 'all' | 'needs-water' | 'on-track';

export default function PlantList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<WaterFilter>('all');
  const [allPlants, setAllPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getUserPlants().then((plants) => {
      if (plants) setAllPlants(plants);
    });
  }, []);

  const filteredPlants = allPlants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase());

    if (filter === 'all') return matchesSearch;

    const reminder = getWateringReminder(plant);
    const needsWater = reminder.status === 'overdue' || reminder.status === 'due';

    if (filter === 'needs-water') return matchesSearch && needsWater;
    return matchesSearch && !needsWater;
  });

  return (
    <div className="bg-[var(--color-bg-subtle)] px-[clamp(16px,5vw,34px)] pt-[clamp(20px,4vw,34px)] pb-[80px] [[data-theme='dark']_&]:bg-[var(--color-bg-darker)]">
      <header>
        <div className="mb-2 flex flex-wrap items-center gap-[10px] min-[481px]:flex-nowrap">
          <h1 className="my-[4px_0_8px] text-[22px] font-extrabold text-[var(--color-text)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]">
            My plant collection
          </h1>
          <div className="relative order-3 flex w-full items-center min-[481px]:order-none min-[481px]:ml-auto min-[481px]:w-auto">
            <Search
              size={14}
              className="pointer-events-none absolute left-[10px] text-[var(--color-text-faint)]"
            />
            <input
              type="text"
              className="w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg)] py-[8px] pr-[12px] pl-[30px] text-[14px] text-[var(--color-text)] shadow-[var(--shadow-sm)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)] focus:bg-[var(--color-bg)] focus:shadow-[0_0_0_3px_rgba(91,140,90,0.15)] [[data-theme='dark']_&]:border-[rgba(255,255,255,0.12)] [[data-theme='dark']_&]:bg-[rgba(255,255,255,0.06)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)] [[data-theme='dark']_&]:shadow-none [[data-theme='dark']_&]:placeholder:text-[rgba(255,255,255,0.4)] [[data-theme='dark']_&]:focus:border-[var(--color-primary)] [[data-theme='dark']_&]:focus:bg-[rgba(255,255,255,0.1)] [[data-theme='dark']_&]:focus:text-[var(--color-text-on-dark)] [[data-theme='dark']_&]:focus:shadow-[0_0_0_3px_rgba(91,140,90,0.2)]"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            to="/my-plants/add"
            className="flex flex-shrink-0 items-center gap-[5px] rounded-[10px] bg-[var(--color-primary)] px-[14px] py-[8px] text-[14px] font-semibold whitespace-nowrap text-[var(--color-bg)] no-underline transition-[background,transform] duration-150 hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-bg)] hover:-translate-y-px max-[480px]:ml-auto"
            aria-label="Add plant"
          >
            <Plus size={18} />
            Add Plant
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl px-4 py-4">
        <div className="mb-4 flex gap-[8px] overflow-x-auto [-webkit-overflow-scrolling:touch]">
          {(['all', 'needs-water', 'on-track'] as const).map((f) => (
            <button
              key={f}
              className={`flex-shrink-0 cursor-pointer rounded-[20px] border px-[14px] py-[6px] text-[13px] transition-all duration-200 ${
                filter === f
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-bg)] [[data-theme='dark']_&]:border-[var(--color-primary)] [[data-theme='dark']_&]:bg-[var(--color-primary)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] [[data-theme='dark']_&]:border-[rgba(255,255,255,0.12)] [[data-theme='dark']_&]:bg-[rgba(255,255,255,0.06)] [[data-theme='dark']_&]:text-[rgba(255,255,255,0.7)] [[data-theme='dark']_&]:hover:border-[var(--color-primary)] [[data-theme='dark']_&]:hover:text-[var(--color-primary-light)]"
              }`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && 'All'}
              {f === 'needs-water' && 'Needs water'}
              {f === 'on-track' && 'On track'}
            </button>
          ))}
        </div>

        {filteredPlants.length === 0 ? (
          <p className="py-6 text-center text-muted-foreground">
            No plants found
            {search && ` matching "${search}"`}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-[12px] md:grid-cols-3 md:gap-[16px] lg:grid-cols-4">
            {filteredPlants.map((p) => (
              <PlantCard key={p.id} plant={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
