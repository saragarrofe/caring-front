import './PlantList.css';

import { useState } from 'react';
import { mockPlants } from '../../mocks/plants';
import { PlantCard } from '@components/Plants/PlantCard';
import BackButton from '@components/BackButton/BackButton';
import { getWateringReminder } from '@utils/reminders';

type WaterFilter = 'all' | 'needs-water' | 'on-track';

export default function PlantList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<WaterFilter>('all');

  const filteredPlants = mockPlants.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === 'all') return matchesSearch;

    const reminder = getWateringReminder(plant);
    const needsWater =
      reminder.status === 'overdue' || reminder.status === 'due';

    if (filter === 'needs-water') return matchesSearch && needsWater;
    return matchesSearch && !needsWater; 
  });

  return (
    <div className="plant-list-page">
      <header className="page-header">
        <div className="page-toolbar">
          <BackButton fallback="/my-plants" />
        </div>
        <h1 className="page-title">My plant collection</h1>
      </header>

      <div className="container py-3">
        <div className="plant-search mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="plant-filters mb-3">
          {(['all', 'needs-water', 'on-track'] as const).map((f) => (
            <button
              key={f}
              className={`plant-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && 'All'}
              {f === 'needs-water' && '💧 Needs water'}
              {f === 'on-track' && '✅ On track'}
            </button>
          ))}
        </div>

        {filteredPlants.length === 0 ? (
          <p className="text-muted text-center py-4">
            No plants found
            {search && ` matching "${search}"`}
          </p>
        ) : (
          <div className="plant-grid">
            {filteredPlants.map((p) => (
              <PlantCard key={p.id} plant={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
