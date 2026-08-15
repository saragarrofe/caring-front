import { CatalogPlant } from 'src/types/Plant';

interface Props {
  plants: CatalogPlant[];
  isOwned: (plant: CatalogPlant) => boolean;
  handleSelect: (plant: CatalogPlant) => void;
}

export default function ListPlants({ plants, isOwned, handleSelect }: Props) {
  return (
    <ul className="add-plant-list">
      {plants.map((plant) => {
        const owned = isOwned(plant);
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
                  <span className="add-plant-tag add-plant-tag--care">{plant.careLevel}</span>
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
  );
}
