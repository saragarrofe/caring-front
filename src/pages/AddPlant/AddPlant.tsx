import './AddPlant.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@components/BackButton/BackButton';
import { plantCatalog } from '../../mocks/plants';
import { CatalogPlant, Plant, PlantLocation } from 'src/types/Plant';
import { LOCATIONS } from 'src/config/locations';
import PlantSuggestions from '@components/PlantSuggestions/PlantSuggestions';
import { addUserPlant, getUserPlants } from 'src/api/plants';

export default function AddPlant() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<CatalogPlant | null>(null);
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState<PlantLocation>('Living Room');
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getUserPlants().then((plants) => {
      if (plants) setPlants(plants);
    });
  }, [plants]);

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
    setSelectedPlant(plant);
    setNickname(plant.name);
    setSearch('');
  };

  const handleAdd = async () => {
    if (!selectedPlant) return;

    const today = new Date().toISOString().split('T')[0];

    try {
      await addUserPlant({
        catalogId: selectedPlant.id,
        name: selectedPlant.name,
        nickname: nickname.trim() || undefined,
        species: selectedPlant.species,
        wateringFrequency: selectedPlant.wateringFrequency,
        lastWatered: today,
        imageUrl: selectedPlant.imageUrl,
        location,
        light: selectedPlant.light,
        careLevel: selectedPlant.careLevel,
      });
      navigate('/my-plants');
    } catch (error) {
      console.error('Failed to add plant', error);
    }
  };

  return (
    <div className="add-plant-page">
      <div className="add-plant-container">
        <div className="page-toolbar">
          <BackButton fallback="/my-plants" />
        </div>

        {!selectedPlant ? (
          <>
            <h1 className="add-plant-title">Add a new plant</h1>
            <p className="add-plant-subtitle">Search by common name, scientific name or variety</p>

            <div className="add-plant-search-wrap">
              <i className="bi bi-search add-plant-search-icon" />
              <input
                id="plant-search"
                type="text"
                className="add-plant-search-input"
                placeholder="Search plants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>

            {search.trim().length === 0 && (
              <>
                <div className="add-plant-section-header">
                  <span className="add-plant-section-icon">
                    <i className="bi bi-flower2" />
                  </span>
                  <span>Find the plant you're looking for</span>
                </div>
                <PlantSuggestions onSelect={handleSelect} excludeIds={ownedCatalogIds} />
              </>
            )}

            {results.length > 0 && (
              <ul className="add-plant-list">
                {results.map((plant) => {
                  const owned = ownedCatalogIds.has(plant.id);
                  return (
                    <li key={plant.id} className="add-plant-row-item">
                      <button
                        type="button"
                        className={`add-plant-row${owned ? ' add-plant-row--owned' : ''}`}
                        onClick={() => !owned && handleSelect(plant)}
                        disabled={owned}
                      >
                        <div className="add-plant-row__avatar">
                          {plant.imageUrl ? (
                            <img src={plant.imageUrl} alt={plant.name} />
                          ) : (
                            <i className="bi bi-flower2" />
                          )}
                        </div>
                        <div className="add-plant-row__info">
                          <span className="add-plant-row__name">{plant.name}</span>
                          <span className="add-plant-row__species">{plant.species}</span>
                          <div className="add-plant-row__tags">
                            <span className="add-plant-tag add-plant-tag--care">
                              {plant.careLevel}
                            </span>
                            <span className="add-plant-tag add-plant-tag--icon">
                              <i className="bi bi-sun" />
                            </span>
                            <span className="add-plant-tag add-plant-tag--icon">
                              <i className="bi bi-droplet" />
                            </span>
                          </div>
                        </div>
                        {owned ? (
                          <span className="add-plant-row__owned-badge">Owned</span>
                        ) : (
                          <i className="bi bi-chevron-right add-plant-row__arrow" />
                        )}
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
            <div className="add-plant-selected-header">
              <div className="add-plant-selected-img">
                {selectedPlant.imageUrl ? (
                  <img src={selectedPlant.imageUrl} alt={selectedPlant.name} />
                ) : (
                  <i className="bi bi-flower2" />
                )}
              </div>
              <div className="add-plant-selected-info">
                <h2 className="add-plant-selected-name">{selectedPlant.name}</h2>
                <p className="add-plant-selected-species">{selectedPlant.species}</p>
                <div className="add-plant-selected-tags">
                  <span className="add-plant-tag add-plant-tag--care">
                    {selectedPlant.careLevel}
                  </span>
                  <span className="add-plant-tag add-plant-tag--icon">
                    <i className="bi bi-sun" />
                  </span>
                  <span className="add-plant-tag add-plant-tag--icon">
                    <i className="bi bi-droplet" /> {selectedPlant.wateringFrequency}d
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="add-plant-change-btn"
                onClick={() => setSelectedPlant(null)}
              >
                Change
              </button>
            </div>

            <div className="add-plant-form-section">
              <div className="add-plant-field">
                <label htmlFor="plant-nickname" className="add-plant-label">
                  Nickname (optional)
                </label>
                <input
                  id="plant-nickname"
                  type="text"
                  className="add-plant-input"
                  placeholder={selectedPlant.name}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
