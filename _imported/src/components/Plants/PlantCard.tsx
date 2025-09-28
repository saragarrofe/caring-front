
import { Link } from "react-router-dom";

type Plant = {
    id: number;
    name: string;
    species: string;
    wateringFrequency: number;
    lastWatered: string;
    imageUrl?: string;
}

type PlantCardProps = {
    plant: Plant;
};

export default function PlantCard({ plant }: PlantCardProps) {
    return (
        <div className="card h-100">
            {plant.imageUrl && (
            <div key={plant.id} className="row">
                <img 
                src={plant.imageUrl} 
                className="card-img-top" 
                alt={`Imagen de ${plant.name} de la especie ${plant.species}`} 
                loading="lazy"  
                />
            </div>
            )}
            <div className="card-body">
                <p className="card-title">{plant.name}</p>
                <p className="card-subtitle mb-2 text-muted">Especie: {plant.species}</p>
                <p className="card-text">Riego cada {plant.wateringFrequency} días</p>
                <p className="card-text">Último riego: {plant.lastWatered}</p>
                <Link to={`${plant.id}`} className="btn btn-primary">
                    Ver detalles
                </Link>
            </div>            
        </div>
    )
}