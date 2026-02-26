import './PlantDetail.css';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plant, WateringEntry } from 'src/types/plant';
import { mockPlants } from '../../mocks/plants';
import BackButton from '@components/BackButton/BackButton';
import { WateringForm } from '@components/WateringForm/WateringForm';
import { WateringHistory } from '@components/WateringHistory/WateringHistory';
import { getWateringReminder } from '@utils/reminders';


export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const plantId = id ? parseInt(id, 10) : null;

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

  if (!plantId) {
    return <div className="container py-4">Plant ID not provided</div>;
  }

  if (!plantData) {
    return (
      <>
        <div className="container py-4">Plant not found</div>
        <Link to="/my-plants" className="btn btn-sm btn-primary">
          Back to My Plants
        </Link>
      </>
    );
  }

  const history = plantData.wateringHistory ?? [];
  const totalWaterings = history.length;
  const reminder = getWateringReminder(plantData);

  const handleWater = (note?: string) => {
    const today = new Date().toISOString().split('T')[0];

    const newEntry: WateringEntry = {
      date: today,
      ...(note && { note }),
    };

    setPlantData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        lastWatered: today,
        wateringHistory: [...(prev.wateringHistory ?? []), newEntry],
      };
    });
  };

  return (
    <>
      <BackButton fallback="/my-plants" className="m-3" />
      <main className="container py-4">
        <div className="plant-detail-header">
          {plantData.imageUrl && (
            <img
              src={plantData.imageUrl}
              alt={plantData.name}
              className="plant-detail-img"
            />
          )}
          <div className="plant-detail-info">
            <h1 className="plant-detail-name">{plantData.name}</h1>
            <p className="text-muted mb-1">{plantData.species}</p>
            <span className={`badge bg-${reminder.tone === 'danger' ? 'danger' : reminder.tone === 'info' ? 'primary' : 'success'}`}>
              {reminder.label}
            </span>
          </div>
        </div>

        <div className="plant-stats">
          <div className="plant-stat">
            <span className="plant-stat-value">
              {plantData.wateringFrequency}
            </span>
            <span className="plant-stat-label">days between waterings</span>
          </div>
          <div className="plant-stat">
            <span className="plant-stat-value">{totalWaterings}</span>
            <span className="plant-stat-label">waterings logged</span>
          </div>
          <div className="plant-stat">
            <span className="plant-stat-value">
              {plantData.lastWatered ?? '—'}
            </span>
            <span className="plant-stat-label">last watered</span>
          </div>
        </div>

        <WateringForm onWater={handleWater} />
        <WateringHistory entries={history} />
      </main>
    </>
  );
}
