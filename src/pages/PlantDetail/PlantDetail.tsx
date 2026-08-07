import './PlantDetail.css';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plant, WateringEntry } from 'src/types/Plant';
// import { fetchPlantById } from '../../mocks/api';
import BackButton from '@components/BackButton/BackButton';
import { WateringForm } from '@components/WateringForm/WateringForm';
import { WateringHistory } from '@components/WateringHistory/WateringHistory';
import { getWateringReminder } from '@utils/reminders';
import { getPlantById } from 'src/api/plants';
import { useAuth } from 'src/context/AuthContext';

export default function PlantDetail() {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const plantId = id ? parseInt(id, 10) : null;

  const [plantData, setPlantData] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getPlantById(token, plantId)
      .then((plant) => {
        if (!plant) {
          setError('Plant not found');
        } else {
          setPlantData(plant);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load plant data');
        setLoading(false);
      });
  }, [plantId, token]);

  if (!plantId) {
    return <div className="container py-4">Plant ID not provided</div>;
  }

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <p className="text-danger">{error}</p>
        <Link to="/my-plants" className="btn btn-sm btn-primary">
          Back to My Plants
        </Link>
      </div>
    );
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
      <main className="container py-4">
        <div className="page-toolbar">
          <BackButton fallback="/my-plants" />
        </div>
        <div className="plant-detail-header">
          {plantData.imageUrl && (
            <img src={plantData.imageUrl} alt={plantData.name} className="plant-detail-img" />
          )}

          <div className="plant-detail-info">
            <h1 className="plant-detail-name">{plantData.name}</h1>
            <p className="text-muted mb-1">{plantData.species}</p>
            <span
              className={`badge bg-${reminder.tone === 'danger' ? 'danger' : reminder.tone === 'info' ? 'primary' : 'success'}`}
            >
              {reminder.label}
            </span>
            <div className="plant-stats">
              <div className="plant-stat">
                <span className="plant-stat-value">{plantData.wateringFrequency}</span>
                <span className="plant-stat-label">days between waterings</span>
              </div>
              <div className="plant-stat">
                <span className="plant-stat-value">{totalWaterings}</span>
                <span className="plant-stat-label">waterings logged</span>
              </div>
              <div className="plant-stat">
                <span className="plant-stat-value">{plantData.lastWatered ?? '—'}</span>
                <span className="plant-stat-label">last watered</span>
              </div>
            </div>
          </div>
        </div>
        <WateringHistory entries={history} />
        <WateringForm onWater={handleWater} />
      </main>
    </>
  );
}
