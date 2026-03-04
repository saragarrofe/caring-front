import { Plant } from 'src/types/plant';
import { mockPlants } from './plants';

// no backend 
export function fetchPlantById(id: number): Promise<Plant | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlants.find((p) => p.id === id));
    }, 600);
  });
}

export function fetchAllPlants(): Promise<Plant[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlants);
    }, 400);
  });
}
