import './AddPlant.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@components/BackButton/BackButton';
import { plantCatalog } from '../../mocks/plants';
import { addUserPlant, getUserPlants } from '../../mocks/userPlants';
import { CatalogPlant, PlantLocation } from 'src/types/plant';

const LOCATIONS: PlantLocation[] = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Office',
  'Balcony',
  'Garden',
];

export default function AddPlant() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CatalogPlant | null>(null);
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState<PlantLocation>('Living Room');

  const userPlants = getUserPlants();
  const ownedCatalogIds = new Set(userPlants.map((p) => p.catalogId));

  const results = search.trim().length > 0
    ? plantCatalog.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.species.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const handleSelect = (plant: CatalogPlant) => {
    setSelected(plant);
    setNickname(plant.name);
    setSearch('');
  };

  const handleAdd = () => {
    if (!selected) return;

    const today = new Date().toISOString().split('T')[0];
    addUserPlant({
      id: Date.now(),
      catalogId: selected.id,
      name: selected.name,
      nickname: nickname.trim() || undefined,
      species: selected.species,
      wateringFrequency: selected.wateringFrequency,
      lastWatered: today,
      imageUrl: selected.imageUrl,
      location,
      light: selected.light,
    });

    navigate('/my-plants');
  };

  return (
    <div className="add-plant-page">
      <header className="page-header">
        <div className="page-toolbar">
          <BackButton fallback="/my-plants" />
        </div>
        <h1 className="page-title">Add a new plant</h1>
      </header>

      <div className="add-plant-form">
        {!selected ? (
          <>
            <div className="add-plant-field">
              <label htmlFor="plant-search" className="add-plant-label">
                Search plant
              </label>
              <input
                id="plant-search"
                type="text"
                className="add-plant-input"
                placeholder="e.g. Monstera, Ficus, Basil..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>

            {results.length > 0 && (
              <ul className="add-plant-results">
                {results.map((plant) => {
                  const owned = ownedCatalogIds.has(plant.id);
                  return (
                    <li key={plant.id}>
                      <button
                        type="button"
                        className={`add-plant-result${owned ? ' add-plant-result--owned' : ''}`}
                        onClick={() => !owned && handleSelect(plant)}
                        disabled={owned}
                      >
                        <div className="add-plant-result__avatar">
                          {plant.imageUrl ? (
                            <img src={plant.imageUrl} alt={plant.name} />
                          ) : (
                            <i className="bi bi-flower2" />
                          )}
                        </div>
                        <div className="add-plant-result__info">
                          <span className="add-plant-result__name">{plant.name}</span>
                          <span className="add-plant-result__species">{plant.species}</span>
                        </div>
                        <div className="add-plant-result__meta">
                          <span className="add-plant-result__light">
                            <i className="bi bi-sun" /> {plant.light}
                          </span>
                          <span className="add-plant-result__freq">
                            <i className="bi bi-droplet" /> Every {plant.wateringFrequency}d
                          </span>
                        </div>
                        {owned && <span className="add-plant-result__badge">Owned</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {search.trim().length > 0 && results.length === 0 && (
              <p className="add-plant-empty">No plants found matching "{search}"</p>
            )}
          </>
        ) : (
          <>
            <div className="add-plant-selected">
              <div className="add-plant-selected__avatar">
                {selected.imageUrl ? (
                  <img src={selected.imageUrl} alt={selected.name} />
                ) : (
                  <i className="bi bi-flower2" />
                )}
              </div>
              <div className="add-plant-selected__info">
                <span className="add-plant-selected__name">{selected.name}</span>
                <span className="add-plant-selected__species">{selected.species}</span>
              </div>
              <button
                type="button"
                className="add-plant-selected__change"
                onClick={() => setSelected(null)}
              >
                Change
              </button>
            </div>

            <div className="add-plant-field">
              <label htmlFor="plant-nickname" className="add-plant-label">
                Nickname (optional)
              </label>
              <input
                id="plant-nickname"
                type="text"
                className="add-plant-input"
                placeholder={selected.name}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="add-plant-field">
              <label className="add-plant-label">Location</label>
              <div className="add-plant-pills">
                {LOCATIONS.map((location) => (
                  <button
                    key={location}
                    type="button"
                    className={`add-plant-pill${location === location ? ' add-plant-pill--active' : ''}`}
                    onClick={() => setLocation(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            <div className="add-plant-summary">
              <div className="add-plant-summary__row">
                <i className="bi bi-droplet" />
                <span>Water every <strong>{selected.wateringFrequency} days</strong></span>
              </div>
              <div className="add-plant-summary__row">
                <i className="bi bi-sun" />
                <span>Light: <strong>{selected.light}</strong></span>
              </div>
            </div>

            <button type="button" className="add-plant-submit" onClick={handleAdd}>
              <i className="bi bi-plus-circle" /> Add to my plants
            </button>
          </>
        )}
      </div>
    </div>
  );
}
