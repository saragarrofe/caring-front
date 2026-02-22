import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plant } from 'src/types/plant';
import { mockPlants } from '../../mocks/plants';
import BackButton from '@components/BackButton/BackButton';


export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const plantId = id ? parseInt(id, 10) : null;

  // All hooks at the top — before any conditional return
  const [plantData, setPlantData] = useState<Plant | undefined>(() => {
    if (!plantId) return undefined;
    const stored = localStorage.getItem(`plant-${plantId}`);
    if (stored) return JSON.parse(stored) as Plant;
    return mockPlants.find((p) => p.id === plantId);
  });

  useEffect(() => {
    if (plantData && plantId) {
      localStorage.setItem(`plant-${plantId}`, JSON.stringify(plantData));
    }
  }, [plantData, plantId]);

  // Early returns are safe now — all hooks have already been called
  if (!plantId) {
    return <div className="container py-4">ID de planta no proporcionado</div>;
  }

  if (!plantData) {
    return (
      <>
        <div className="container py-4">Planta no encontrada</div>
        <Link to="/my-plants" className="btn btn-sm btn-primary">
          Volver a Mis Plantas
        </Link>
      </>
    );
  }

  const handleWater = () => {
    const today = new Date().toISOString().split('T')[0];
    setPlantData({ ...plantData, lastWatered: today });
  };

  return (
    <>
      <BackButton fallback="/my-plants" className="m-3" />
      <main className="container py-4">
        <Link to="/my-plants" className="btn btn-sm btn-primary mb-3">
          Volver a Mis Plantas
        </Link>
        {plantData.imageUrl && (
          <img src={plantData.imageUrl} alt={plantData.name} className="img-fluid mb-3" />
        )}
        <h1>{plantData.name}</h1>
        <p>
          <strong>Especie:</strong> {plantData.species ?? ''}
        </p>
        <p>
          <strong>Último riego:</strong> {plantData.lastWatered ?? '—'}
        </p>
        <p>
          <strong>Frecuencia de riego:</strong> cada {plantData.wateringFrequency} días
        </p>
        <button className="btn btn-success mt-3" onClick={handleWater}>
          Regar ahora
        </button>
        <p>(Más adelante: riegos, recordatorios y tips…)</p>
      </main>
    </>
  );
}
