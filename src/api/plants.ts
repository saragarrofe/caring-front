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

// export function saveUserPlants(plants: Plant[]): void {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
// }

// export function addUserPlant(plant: Plant): Plant[] {
//   const plants = getUserPlants();
//   plants.push(plant);
//   saveUserPlants(plants);
//   return plants;
// }

// export function removeUserPlant(plantId: number): Plant[] {
//   const plants = getUserPlants().filter((p) => p.id !== plantId);
//   saveUserPlants(plants);
//   return plants;
// }
