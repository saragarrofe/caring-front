
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { mockPlants } from '../mocks/plants';
import type { Plant } from '../types/plant';

import BackButton from '@components/BackButton/BackButton';

export default function MyPlantDetail () {
  const { id } = useParams<{ id: string }>();
  if (!id) { return <div className="container py-4">ID de planta no proporcionado</div>; }
  const plantId = parseInt(id, 10);

  // estado inicial: intenta cargar del local storage
  const storedPlant = localStorage.getItem(`plant-${plantId}`);
  const plantFound = storedPlant ? JSON.parse(storedPlant) as Plant : mockPlants.find((p) => p.id === plantId);
  
  const [plantData, setPlantData] = useState<Plant | undefined>(plantFound || undefined);

  // useEffect: cada vez que cambie plantData, lo guardamos en localStorage
  useEffect(() => {
    if(plantData) {
      localStorage.setItem(`plant-${plantId}`, JSON.stringify(plantData));
    }
  }, [plantData]);


  if (!plantFound) {
    return <>
    <div className="container py-4">Planta no encontrada</div>;
    <Link to="/my-plants" className="btn btn-sm btn-primary">
      Volver a Mis Plantas
    </Link>
    </>
  }

  const handleWater = () => {
    if (!plantData) return; 
    
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    setPlantData({
      ...plantData,
      lastWatered: today,
    });
  }

  return <> 
    <BackButton fallback="/my-plants" className="m-3" />
    <main className='container py-4'>
      <Link to="/my-plants" className="btn btn-sm btn-primary mb-3">
        Volver a Mis Plantas
      </Link>
      {plantFound?.imageUrl && <img src={plantFound.imageUrl} alt={plantFound.name} className="img-fluid mb-3" />}
      <h1>{plantFound.name}</h1>
      <p><strong>Especie {plantFound.species ?? ''}</strong></p>
      <p><strong>Último riego:</strong> {plantFound.lastWatered ?? '—'}</p>
      <p><strong>Frecuencia de riego:</strong> cada {plantFound.wateringFrequency} días</p>
      <button className="btn btn-success mt-3"
        onClick={handleWater}>Regar ahora</button>

      <p>(Más adelante: riegos, recordatorios y tips…)</p>
    </main>

  </>
};
