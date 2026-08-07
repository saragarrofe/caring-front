import { Plant } from '../types/Plant';

export async function getUserPlants(token: string | null): Promise<Plant[] | null> {
  if (!token) return null;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const plants = await response.json();
  return plants;
}

export async function getPlantById(token: string | null, plantId: number): Promise<Plant | null> {
  if (!token || !plantId) return null;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant/${plantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;

  const plant = await response.json();
  return plant;
}

export async function addUserPlant(
  token: string | null,
  plant: Omit<Plant, 'id'>,
): Promise<Plant | null> {
  if (!plant || !token) return null;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(plant),
  });

  if (!response.ok) return null;

  return response.json();
}

export async function deleteUserPlant(token: string, plantId: number): Promise<void> {
  if (!token || !plantId) return;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/plant/${plantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete plant');
}
