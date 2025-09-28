
import { mockPlants } from '../mocks/plants';
import PlantCard from '../components/Plants/PlantCard';

export default function MyPlants() {
  return (
    <main className="container py-4">
      <h1>Mis Plantas</h1>
        <div className="row">
          {mockPlants.map((plant) => (
            <div key={plant.id} className='col-6 col-md-4 mb-4'>
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
    </main>

  );
};

