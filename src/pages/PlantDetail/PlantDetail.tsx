import './PlantDetail.css';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plant, WateringEntry } from 'src/types/Plant';
// import { fetchPlantById } from '../../mocks/api';
import BackButton from '@components/BackButton/BackButton';
import { WateringForm } from '@components/WateringForm/WateringForm';
import { WateringHistory } from '@components/WateringHistory/WateringHistory';
import { getWateringReminder } from '@utils/reminders';

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const plantId = id ? parseInt(id, 10) : null;

  const [plantData, setPlantData] = useState<Plant | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  // Effect 1: Fetch plant data (simulated API call)
  // useEffect(() => {
  //   if (!plantId) {
  //     setLoading(false);
  //     return;
  //   }

  //   // Check localStorage for saved data first
  //   const stored = localStorage.getItem(`plant-${plantId}`);
  //   if (stored) {
  //     setPlantData(JSON.parse(stored) as Plant);
  //     setLoading(false);
  //     return;
  //   }

  //   // Flag to prevent setting state on unmounted component
  //   let cancelled = false;

  //   setLoading(true);
  //   setError(null);

  //   fetchPlantById(plantId)
  //     .then((plant) => {
  //       if (cancelled) return;
  //       setPlantData(plant);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       if (cancelled) return;
  //       setError('Failed to load plant data');
  //       setLoading(false);
  //     });

  //   // Cleanup: if the component unmounts before the fetch finishes,
  //   // don't try to update state on an unmounted component
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [plantId]);

  // Effect 2: Sync plant data to localStorage
  useEffect(() => {
    if (plantData && plantId) {
      localStorage.setItem(`plant-${plantId}`, JSON.stringify(plantData));
    }
  }, [plantData, plantId]);

  // Effect 3: Update document title while on this page
  useEffect(() => {
    if (!plantData) return;

    const previousTitle = document.title;
    document.title = `${plantData.name} — Caring`;

    return () => {
      document.title = previousTitle;
    };
  }, [plantData?.name]);

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
