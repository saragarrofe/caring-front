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
