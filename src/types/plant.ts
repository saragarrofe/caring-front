
export type WateringEntry = {
  date: string;
  note?: string;
};

export type LightLevel = 'Low' | 'Medium' | 'High' | 'Indirect';

export type PlantLocation =
  | 'Living Room'
  | 'Bedroom'
  | 'Kitchen'
  | 'Bathroom'
  | 'Office'
  | 'Balcony'
  | 'Garden';

export type Plant = {
  id: number;
  name: string;
  imageUrl?: string;
  species: string;
  lastWatered: string;
  wateringFrequency: number;
  wateringHistory?: WateringEntry[];
  location?: PlantLocation;
  light?: LightLevel;
};