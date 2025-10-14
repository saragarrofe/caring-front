
import "./PlantCard.css";
import { Link } from "react-router-dom";
import { Plant } from "src/types/plant";

type PlantCardProps = {
    plant: Plant;
};

export function PlantCard({ plant }: PlantCardProps) {
    return (
        <div className="card-plant">
            {plant.imageUrl && (
            <div key={plant.id} className="img-wrap">
                <img 
                 src={plant.imageUrl} 
                className="card-img-top" 
                alt={`Imagen de ${plant.name}${plant.species ? ` de la especie ${plant.species}` : ""}`} 
                loading="lazy"  
                />
            </div>
            )}
            <div className="px-3 pb-3">
                <div className="title">{plant.name}</div>
                <div className="d-grid mt-2">
                    {/* TO DO: reminder and status */}
                </div>
            </div>            
        </div>
    )
}