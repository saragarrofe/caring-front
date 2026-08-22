import './PlantDetail.css';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plant } from 'src/types/Plant';
import BackButton from '@components/BackButton/BackButton';
import { WateringForm } from '@components/WateringForm/WateringForm';
import { WateringHistory } from '@components/WateringHistory/WateringHistory';
import { getWateringReminder } from '@utils/reminders';
import { getPlantById, deleteUserPlant, waterPlant } from 'src/api/plants';

const LIGHT_ICON: Record<string, string> = {
  Low: 'bi-moon',
  Medium: 'bi-cloud-sun',
  High: 'bi-sun-fill',
  Indirect: 'bi-brightness-alt-high',
};

const CARE_ICON: Record<string, string> = {
  Easy: 'bi-emoji-smile',
  Medium: 'bi-emoji-neutral',
  Hard: 'bi-emoji-frown',
};

type Tab = 'watering' | 'history';

export default function PlantDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const plantId = id ? parseInt(id, 10) : null;

  const [plantData, setPlantData] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('watering');

  useEffect(() => {
    if (!plantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getPlantById(plantId)
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
  }, [plantId]);

  useEffect(() => {
    if (!plantData) return;
    const previousTitle = document.title;
    document.title = `${plantData.name} — Caring`;
    return () => {
      document.title = previousTitle;
    };
  }, [plantData, plantData?.name]);

  const handleWater = async (note?: string) => {
    if (!plantId) return;
    const today = new Date().toISOString().split('T')[0];
    try {
      await waterPlant(plantId, today, note);

      setPlantData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          lastWatered: today,
          wateringHistory: [...(prev.wateringHistory ?? []), { date: today, note }],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!plantId) return;
    try {
      await deleteUserPlant(plantId);
      navigate('/my-plants');
    } catch {
      setError('Failed to delete plant');
    }
  };

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
      <div className="container py-4">
        <div>Plant not found</div>
        <Link to="/my-plants" className="btn btn-sm btn-primary">
          Back to My Plants
        </Link>
      </div>
    );
  }

  const history = plantData.wateringHistory ?? [];
  const reminder = getWateringReminder(plantData);

  return (
    <div className="plant-detail-page">
      <div className="plant-detail-image-col">
        {plantData.imageUrl ? (
          <>
            <span
              className={`plant-detail-section-label plant-detail-section-label--${reminder.tone}`}
            >
              {reminder.label}
            </span>
            <img src={plantData.imageUrl} alt={plantData.name} className="plant-detail-image" />
          </>
        ) : (
          <div className="plant-detail-image-placeholder">
            <i className="bi bi-flower2" />
          </div>
        )}
      </div>

      <div className="plant-detail-main">
        <div className="plant-detail-toolbar">
          <BackButton fallback="/my-plants" />
          <button
            type="button"
            className="plant-detail-delete-btn"
            onClick={handleDelete}
            aria-label="Delete plant"
          >
            <i className="bi bi-trash3" />
          </button>
        </div>

        <div className="plant-detail-hero">
          <h1 className="plant-detail-name">{plantData.nickname ?? plantData.name}</h1>
          <p className="plant-detail-species">{plantData.species}</p>
        </div>

        <div className="plant-detail-tiles">
          {plantData.careLevel && (
            <div className="plant-detail-tile">
              <i className={`bi ${CARE_ICON[plantData.careLevel] ?? 'bi-bar-chart'}`} />
              <span>{plantData.careLevel}</span>
            </div>
          )}
          {plantData.light && (
            <div className="plant-detail-tile">
              <i className={`bi ${LIGHT_ICON[plantData.light] ?? 'bi-sun'}`} />
              <span>{plantData.light}</span>
            </div>
          )}
          <div className="plant-detail-tile">
            <i className="bi bi-droplet" />
            <span>{plantData.wateringFrequency.label}</span>
          </div>
          {plantData.location && (
            <div className="plant-detail-tile">
              <i className="bi bi-geo-alt" />
              <span>{plantData.location}</span>
            </div>
          )}
        </div>

        <div className="plant-detail-tabs">
          <button
            type="button"
            className={`plant-detail-tab${activeTab === 'watering' ? ' plant-detail-tab--active' : ''}`}
            onClick={() => setActiveTab('watering')}
          >
            Watering
          </button>
        </div>
        <WateringHistory entries={history} />

        <div className="plant-detail-card">
          <WateringForm onWater={handleWater} />
          <button
            type="button"
            className="plant-detail-water-btn"
            onClick={() => {
              handleWater();
              setActiveTab('history');
            }}
          >
            <i className="bi bi-droplet-fill" /> Mark as watered
          </button>
        </div>
      </div>
    </div>
  );
}
