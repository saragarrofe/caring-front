import { Sun, Droplet, Flower2, ChevronRight } from 'lucide-react';
import { CatalogPlant } from 'src/types/Plant';

interface Props {
  plants: CatalogPlant[];
  isOwned: (plant: CatalogPlant) => boolean;
  handleSelect: (plant: CatalogPlant) => void;
}

export default function ListPlants({ plants, isOwned, handleSelect }: Props) {
  return (
    <ul className="m-0 min-w-0 list-none p-0">
      {plants.map((plant) => {
        const owned = isOwned(plant);
        return (
          <li
            key={plant.id}
            className="[&+&]:border-t [&+&]:border-[var(--color-border)]"
          >
            <button
              type="button"
              className={`group flex w-full cursor-pointer items-center gap-[16px] border-none bg-transparent py-[16px] text-left ${
                owned ? 'cursor-not-allowed opacity-45' : ''
              }`}
              onClick={() => !owned && handleSelect(plant)}
              disabled={owned}
            >
              <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-secondary)] text-[28px] text-[var(--color-primary-dark)] max-[480px]:h-[56px] max-[480px]:w-[56px] max-[480px]:text-[22px]">
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Flower2 size={28} />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-[16px] font-bold text-[var(--color-primary)] transition-colors duration-150 group-enabled:group-hover:text-[var(--color-primary-dark)]">
                  {plant.name}
                </span>
                <span className="text-[13px] text-[var(--color-text-subtle)]">{plant.species}</span>
                <div className="mt-[6px] flex flex-wrap gap-[6px]">
                  <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-secondary)] px-[10px] py-[3px] text-[12px] font-semibold text-[var(--color-primary-dark)]">
                    {plant.careLevel}
                  </span>
                  <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-bg-image)] px-[8px] py-[4px] text-[12px] font-semibold text-[var(--color-text-secondary)]">
                    <Sun size={14} />
                  </span>
                  <span className="inline-flex items-center gap-[4px] rounded-[20px] bg-[var(--color-bg-image)] px-[8px] py-[4px] text-[12px] font-semibold text-[var(--color-text-secondary)]">
                    <Droplet size={14} />
                  </span>
                </div>
              </div>
              {owned ? (
                <span className="flex-shrink-0 rounded-[20px] bg-[var(--color-secondary)] px-[10px] py-[3px] text-[12px] font-semibold text-[var(--color-primary-dark)]">
                  Owned
                </span>
              ) : (
                <ChevronRight size={16} className="flex-shrink-0 text-[var(--color-text-subtle)]" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
