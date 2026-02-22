import './PlantList.css';

import { mockPlants } from '../../mocks/plants';
import {PlantCard} from '../../components';
import BackButton from '@components/BackButton/BackButton';

export default function PlantList() {
  return <>
    <header className="page-header">
        <div className="page-toolbar">
          <BackButton fallback="/my-plants" />
        </div>
        <h1 className="page-title">My Plants</h1>
      </header>
    <div className="container py-3">
      <div className="row row-cols-2 row-cols-md-3 g-3"> 
        {mockPlants.map(p => (
          <div key={p.id} className="col">
            <PlantCard plant={p} />
          </div>
        ))}
      </div>
    </div>
  
  
  
  </>

};
