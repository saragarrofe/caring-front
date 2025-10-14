
import { mockPlants } from '../mocks/plants';
import {PlantCard} from '../components';

export default function MyPlants() {
  return (
    <div className="container py-3">
      <h1 className="display-6 fw-bold mb-3">Mis Plantas</h1>

      <div className="row row-cols-2 row-cols-md-3 g-3"> 
        {mockPlants.map(p => (
          <div key={p.id} className="col">
            <PlantCard plant={p} />
          </div>
        ))}
      </div>
    </div>


  );
};
