import { Plant } from '../types/plant';

const STORAGE_KEY = 'user-plants';

export function getUserPlants(): Plant[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveUserPlants(plants: Plant[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}

export function addUserPlant(plant: Plant): Plant[] {
  const plants = getUserPlants();
  plants.push(plant);
  saveUserPlants(plants);
  return plants;
}

export function removeUserPlant(plantId: number): Plant[] {
  const plants = getUserPlants().filter((p) => p.id !== plantId);
  saveUserPlants(plants);
  return plants;
}
