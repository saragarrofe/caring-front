import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flower2, Sun, Droplet, PlusCircle } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { plantCatalog } from '../../mocks/plants';
import { CatalogPlant, Plant, PlantLocation } from 'src/types/Plant';
import { LOCATIONS } from 'src/config/locations';
import { addUserPlant, getUserPlants } from 'src/api/plants';
import ListPlants from '@/components/ListPlants';

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
  }, []);

  const ownedCatalogIds = new Set(plants.map((plant) => plant.catalogId));

  const isOwned = (plant: CatalogPlant) => {
    return ownedCatalogIds.has(plant.id);
  };

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
    <div className="min-h-[100dvh] bg-[var(--color-bg-card-light)] pb-[100px]">
      <div className="px-[clamp(16px,5vw,50px)]">
        <div>
          <BackButton fallback="/my-plants" />
        </div>

        <h1 className="my-[8px_0_8px] text-[32px] leading-[1.1] font-extrabold text-[var(--color-primary)] max-[480px]:text-[26px]">
          Add a new plant
        </h1>
        <p className="mt-0 mb-[24px] text-[15px] text-[var(--color-text-subtle)]">
          Search by common name, scientific name or variety
        </p>

        <div className="m-0 min-w-0 list-none p-0">
          <div className="mb-[28px] flex max-w-[540px] items-center gap-[10px] rounded-[50px] bg-[var(--color-secondary)] px-[20px] py-[14px] max-[480px]:px-[16px] max-[480px]:py-[12px]">
            <Search size={16} className="flex-shrink-0 text-[var(--color-primary-dark)]" />
            <input
              id="plant-search"
              type="text"
              className="flex-1 border-none bg-transparent text-[15px] text-[var(--color-primary)] outline-none placeholder:text-[var(--color-text-subtle)]"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mt-6 grid grid-cols-2 items-start gap-8 max-[900px]:grid-cols-1">
            <div className="m-0 min-w-0 list-none p-0">
              {search.trim().length === 0 && (
                <>
                  <div className="mb-[16px] flex items-center gap-[12px] text-[17px] font-bold text-[var(--color-primary)]">
                    <span className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-dark)] text-[16px] text-[var(--color-bg)]">
                      <Flower2 size={16} />
                    </span>
                    <span>Find the plant you're looking for</span>
                  </div>
                  <ListPlants plants={plantCatalog} isOwned={isOwned} handleSelect={handleSelect} />
                </>
              )}

              {results.length > 0 && (
                <ListPlants plants={results} isOwned={isOwned} handleSelect={handleSelect} />
              )}

              {search.trim().length > 0 && results.length === 0 && (
                <p className="py-[32px] text-center text-[14px] text-[var(--color-text-subtle)]">
                  No plants found matching "{search}"
                </p>
              )}
            </div>

            {selectedPlant && (
              <aside className="sticky top-6 rounded-[16px] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0_/_8%)] max-[900px]:static">
                <div className="mb-[28px] flex items-center gap-[16px] border-b border-[var(--color-border)] pt-[20px] pb-[24px]">
                  <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-secondary)] text-[28px] text-[var(--color-primary-dark)]">
                    {selectedPlant.imageUrl ? (
                      <img
                        src={selectedPlant.imageUrl}
                        alt={selectedPlant.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Flower2 size={28} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="mt-0 mb-[2px] text-[22px] font-extrabold text-[var(--color-primary)]">
                      {selectedPlant.name}
                    </h2>
                    <p className="mt-0 mb-[8px] text-[14px] text-[var(--color-text-subtle)]">
                      {selectedPlant.species}
                    </p>
                    <div className="flex flex-wrap gap-[6px]">
                      <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-secondary)] px-[10px] py-[3px] text-[12px] font-semibold text-[var(--color-primary-dark)]">
                        {selectedPlant.careLevel}
                      </span>
                      <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-bg-image)] px-[8px] py-[4px] text-[12px] font-semibold text-[var(--color-text-secondary)]">
                        <Sun size={14} />
                      </span>
                      <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-bg-image)] px-[8px] py-[4px] text-[12px] font-semibold text-[var(--color-text-secondary)]">
                        {selectedPlant.wateringFrequency.label}
                        <Droplet size={14} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <label
                      htmlFor="plant-nickname"
                      className="text-[13px] font-bold tracking-[0.04em] text-[var(--color-text-secondary)] uppercase"
                    >
                      Nickname (optional)
                    </label>
                    <input
                      id="plant-nickname"
                      type="text"
                      className="rounded-[14px] border-[1.5px] border-[var(--color-border)] bg-[var(--color-bg)] px-[18px] py-[14px] text-[15px] text-[var(--color-primary)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary-dark)] focus:shadow-[0_0_0_3px_rgba(45,79,42,0.12)]"
                      placeholder={selectedPlant.name}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-bold tracking-[0.04em] text-[var(--color-text-secondary)] uppercase">
                      Location
                    </label>
                    <div className="flex flex-wrap gap-[8px]">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          className={`cursor-pointer rounded-[20px] border-[1.5px] px-[16px] py-[8px] text-[13px] transition-all duration-150 ${
                            loc === location
                              ? 'border-[var(--color-primary-dark)] bg-[var(--color-primary-dark)] text-[var(--color-bg)]'
                              : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary-dark)] hover:text-[var(--color-primary-dark)]'
                          }`}
                          onClick={() => setLocation(loc)}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-[8px] flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border-none bg-[var(--color-primary-dark)] px-[24px] py-[16px] text-[16px] font-bold text-[var(--color-bg)] transition-opacity duration-150 hover:opacity-[0.88]"
                    onClick={handleAdd}
                  >
                    <PlusCircle size={18} /> Add to my plants
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
