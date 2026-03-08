import { Plant } from 'src/types/plant';
import { getUserPlants } from './userPlants';

// no backend
export function fetchPlantById(id: number): Promise<Plant | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getUserPlants().find((p) => p.id === id));
    }, 600);
  });
}

export function fetchAllPlants(): Promise<Plant[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getUserPlants());
    }, 400);
  });
}
