import './AddPlant.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@components/BackButton/BackButton';
import { plantCatalog } from '../../mocks/plants';
import { CatalogPlant, Plant, PlantLocation } from 'src/types/Plant';
import { LOCATIONS } from 'src/config/locations';
import PlantSuggestions from '@components/PlantSuggestions/PlantSuggestions';
import { useAuth } from 'src/context/AuthContext';
import { getUserPlants } from 'src/api/plants';

export default function AddPlant() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CatalogPlant | null>(null);
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState<PlantLocation>('Living Room');
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getUserPlants(token).then((plants) => {
      if (plants) setPlants(plants);
    });
  }, [token]);

  const ownedCatalogIds = new Set(plants.map((plant) => plant.catalogId));

  const results =
    search.trim().length > 0
      ? plantCatalog.filter(
          (p) =>
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

    // const today = new Date().toISOString().split('T')[0];

    // TODO: Post plant
    // addUserPlant({
    //   id: Date.now(), // temporary id until there's a real backend
    //   catalogId: selected.id,
    //   name: selected.name,
    //   nickname: nickname.trim() || undefined,
    //   species: selected.species,
    //   wateringFrequency: selected.wateringFrequency,
    //   lastWatered: today,
    //   imageUrl: selected.imageUrl,
    //   location,
    //   light: selected.light,
    //   careLevel: selected.careLevel,
    // });

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

      <div className="add-plant-layout">
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
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      className={`add-plant-pill${loc === location ? ' add-plant-pill--active' : ''}`}
                      onClick={() => setLocation(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" className="add-plant-submit" onClick={handleAdd}>
                <i className="bi bi-plus-circle" /> Add to my plants
              </button>
            </>
          )}
        </div>

        {!selected && (
          <aside className="add-plant-preview">
            <PlantSuggestions onSelect={handleSelect} excludeIds={ownedCatalogIds} />
          </aside>
        )}
        {selected && (
          <aside className="add-plant-preview">
            <div className="plant-preview-card">
              <div className="plant-preview-card__image">
                {selected.imageUrl ? (
                  <img src={selected.imageUrl} alt={selected.name} />
                ) : (
                  <div className="plant-preview-card__image-placeholder">
                    <i className="bi bi-flower2" />
                  </div>
                )}
              </div>
              <div className="plant-preview-card__body">
                <h2 className="plant-preview-card__name">{selected.name}</h2>
                <p className="plant-preview-card__species">{selected.species}</p>

                <div className="plant-preview-card__badges">
                  <span
                    className={`plant-preview-badge plant-preview-badge--${selected.careLevel.toLowerCase()}`}
                  >
                    {selected.careLevel}
                  </span>
                  {selected.toxicToPets && (
                    <span className="plant-preview-badge plant-preview-badge--toxic">
                      <i className="bi bi-exclamation-triangle" /> Toxic to pets
                    </span>
                  )}
                </div>

                <ul className="plant-preview-card__stats">
                  <li>
                    <i className="bi bi-droplet-fill" />
                    <span>
                      Water every <strong>{selected.wateringFrequency} days</strong>
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-sun-fill" />
                    <span>
                      Light: <strong>{selected.light}</strong>
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-bar-chart-fill" />
                    <span>
                      Care level: <strong>{selected.careLevel}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
