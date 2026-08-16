import './PlantList.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlantCard } from '@components/PlantCard/PlantCard';
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
    <div className="plant-list-page">
      <header className="page-header">
        <div className="page-toolbar">
          <h1 className="page-title">My plant collection</h1>
          <div className="plant-search">
            <i className="bi bi-search plant-search__icon" />
            <input
              type="text"
              className="plant-search__input"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link to="/my-plants/add" className="plant-list-add-btn" aria-label="Add plant">
            <i className="bi bi-plus-lg" />
            Add Plant
          </Link>
        </div>
      </header>

      <div className="container py-3">
        <div className="plant-filters mb-3">
          {(['all', 'needs-water', 'on-track'] as const).map((f) => (
            <button
              key={f}
              className={`plant-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && 'All'}
              {f === 'needs-water' && 'Needs water'}
              {f === 'on-track' && 'On track'}
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
