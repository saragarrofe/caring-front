
import { Link } from 'react-router-dom';
import { mockPlants } from '../mocks/plants';

export default function MyPlants() {
  return (
    <main className="container py-4">
        <h1>Mis Plantas</h1>
        <div className="row">
            {mockPlants.map(plant => (
                <div key={plant.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        {plant.imageUrl && <img src={plant.imageUrl} className="card-img-top" alt={plant.name} />}
                        <div className="card-body">
                            <h5 className="card-title">{plant.name}</h5>
                            <p className="card-text">Especie: {plant.species}</p>
                            <p className="card-text">Frecuencia de riego: cada {plant.wateringFrequency} días</p>
                            <p className="card-text">Último riego: {new Date(plant.lastWatered).toLocaleDateString()}</p>
                            <Link to={`/my-plants/${plant.id}`} className="btn btn-primary">Ver Detalles</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <ul className="list-group">
        {mockPlants.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{p.name}</strong>
              {p.species ? ` — ${p.species}` : ''}
            </span>
            {/* Link navega sin recargar la página */}
            <Link to={`/my-plants/${p.id}`} className="btn btn-sm btn-primary">
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>

    </main>

  );
};

