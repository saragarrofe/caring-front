
export type WateringEntry = {
  date: string;
  note?: string;
};

export type Plant = {
  id: number;
  name: string;
  imageUrl?: string;
  species: string;
  lastWatered: string;
  wateringFrequency: number;
  wateringHistory?: WateringEntry[];
};