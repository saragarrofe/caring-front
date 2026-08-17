import { Plant } from '../types/Plant';

export async function getUserPlants(): Promise<Plant[] | null> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant`, {
    credentials: 'include',
  });

  const plants = await response.json();
  return plants;
}

export async function getPlantById(plantId: number): Promise<Plant | null> {
  if (!plantId) return null;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant/${plantId}`, {
    credentials: 'include',
  });

  if (!response.ok) return null;

  const plant = await response.json();
  return plant;
}

export async function addUserPlant(plant: Omit<Plant, 'id'>): Promise<Plant | null> {
  if (!plant) return null;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(plant),
  });

  if (!response.ok) return null;

  return response.json();
}

export async function deleteUserPlant(plantId: number): Promise<void> {
  if (!plantId) return;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant/${plantId}`, {
    credentials: 'include',
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete plant');
}

export async function waterPlant(
  plantId: number | null,
  date: string,
  note?: string,
): Promise<void> {
  if (!plantId) return;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant/${plantId}/watering`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ date, note }),
  });

  if (!response.ok) throw new Error('Failed to post watering plant date');
}
