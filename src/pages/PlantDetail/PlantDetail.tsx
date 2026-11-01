import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Flower2,
  Trash2,
  BarChart3,
  Droplet,
  MapPin,
  Moon,
  CloudSun,
  Sun,
  SunMedium,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { Plant } from 'src/types/Plant';
import BackButton from '@components/BackButton/BackButton';
import { WateringForm } from '@components/WateringForm/WateringForm';
import { WateringHistory } from '@components/WateringHistory/WateringHistory';
import { getWateringReminder } from '@utils/reminders';
import { getPlantById, deleteUserPlant, waterPlant } from 'src/api/plants';

const LIGHT_ICON: Record<string, LucideIcon> = {
  Low: Moon,
  Medium: CloudSun,
  High: Sun,
  Indirect: SunMedium,
};

const CARE_ICON: Record<string, LucideIcon> = {
  Easy: Smile,
  Medium: Meh,
  Hard: Frown,
};

const sectionLabelToneClass: Record<string, string> = {
  success: 'bg-[var(--color-secondary)] text-[var(--color-primary-dark)]',
  info: 'bg-[var(--color-secondary)] text-[var(--color-primary-dark)]',
  warning: 'bg-[#fef3cd] text-[#856404]',
  danger: 'bg-[#fde8e8] text-[var(--color-danger)]',
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
    return <div className="mx-auto w-full max-w-2xl px-4 py-6">Plant ID not provided</div>;
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6 text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <p className="text-destructive">{error}</p>
        <Link
          to="/my-plants"
          className="inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to My Plants
        </Link>
      </div>
    );
  }

  if (!plantData) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <div>Plant not found</div>
        <Link
          to="/my-plants"
          className="inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to My Plants
        </Link>
      </div>
    );
  }

  const history = plantData.wateringHistory ?? [];
  const reminder = getWateringReminder(plantData);

  const CareIcon = plantData.careLevel ? (CARE_ICON[plantData.careLevel] ?? BarChart3) : BarChart3;
  const LightIcon = plantData.light ? (LIGHT_ICON[plantData.light] ?? Sun) : Sun;

  return (
    <div className="grid min-h-[50dvh] grid-cols-1 bg-[var(--color-bg-card-light)] md:grid-cols-[420px_1fr]">
      <div className="relative isolate h-[220px] overflow-hidden min-[481px]:h-[280px] md:sticky md:top-0 md:h-[100dvh]">
        {plantData.imageUrl ? (
          <>
            <span
              className={`absolute right-4 top-4 z-[2] mb-3 inline-block rounded-[20px] px-4 py-1.5 text-[14px] font-semibold ${
                sectionLabelToneClass[reminder.tone] ?? sectionLabelToneClass.info
              }`}
            >
              {reminder.label}
            </span>
            <img
              src={plantData.imageUrl}
              alt={plantData.name}
              className="block h-full w-full object-cover"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-secondary)] text-[var(--color-accent)]">
            <Flower2 size={80} />
          </div>
        )}
      </div>

      <div className="overflow-y-auto px-4 pb-[80px] min-[481px]:px-5 md:px-12 md:pb-16">
        <div className="flex items-center justify-between py-5 pb-4">
          <BackButton fallback="/my-plants" />
          <button
            type="button"
            className="cursor-pointer rounded-full border-none bg-transparent p-2 leading-none text-[var(--color-text-faint)] transition-colors hover:bg-[rgba(220,53,69,0.08)] hover:text-[var(--color-danger)]"
            onClick={handleDelete}
            aria-label="Delete plant"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mb-6">
          <h1 className="m-0 mb-1 text-2xl font-extrabold leading-[1.1] text-[var(--color-primary)] min-[481px]:text-[28px] md:text-[36px]">
            {plantData.nickname ?? plantData.name}
          </h1>
          <p className="m-0 text-[15px] text-[var(--color-text-subtle)] min-[481px]:text-[17px]">
            {plantData.species}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-[10px] md:grid-cols-4">
          {plantData.careLevel && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-secondary)] px-[10px] py-[18px] text-center">
              <CareIcon size={24} className="text-[var(--color-primary-dark)]" />
              <span className="text-[13px] font-semibold text-[var(--color-primary-dark)]">
                {plantData.careLevel}
              </span>
            </div>
          )}
          {plantData.light && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-secondary)] px-[10px] py-[18px] text-center">
              <LightIcon size={24} className="text-[var(--color-primary-dark)]" />
              <span className="text-[13px] font-semibold text-[var(--color-primary-dark)]">
                {plantData.light}
              </span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-secondary)] px-[10px] py-[18px] text-center">
            <Droplet size={24} className="text-[var(--color-primary-dark)]" />
            <span className="text-[13px] font-semibold text-[var(--color-primary-dark)]">
              {plantData.wateringFrequency.label}
            </span>
          </div>
          {plantData.location && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-secondary)] px-[10px] py-[18px] text-center">
              <MapPin size={24} className="text-[var(--color-primary-dark)]" />
              <span className="text-[13px] font-semibold text-[var(--color-primary-dark)]">
                {plantData.location}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={`cursor-pointer rounded-[20px] border-[1.5px] px-[14px] py-1.5 text-[13px] font-semibold transition-all min-[481px]:px-5 min-[481px]:py-2 min-[481px]:text-[14px] ${
              activeTab === 'watering'
                ? 'border-[var(--color-primary-dark)] bg-[var(--color-primary-dark)] text-[var(--color-bg)]'
                : 'border-[var(--color-border)] bg-transparent text-[var(--color-text-subtle)]'
            }`}
            onClick={() => setActiveTab('watering')}
          >
            Watering
          </button>
        </div>
        <WateringHistory entries={history} />

        <div className="rounded-[20px] bg-[var(--color-bg)] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <WateringForm onWater={handleWater} />
          <button
            type="button"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-[var(--color-primary-dark)] p-4 text-[16px] font-bold text-[var(--color-bg)] transition-opacity hover:opacity-[0.88]"
            onClick={() => {
              handleWater();
              setActiveTab('history');
            }}
          >
            <Droplet size={18} fill="currentColor" /> Mark as watered
          </button>
        </div>
      </div>
    </div>
  );
}
