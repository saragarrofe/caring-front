
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

export type CareLevel = 'Easy' | 'Medium' | 'Hard';

export type CatalogPlant = {
  id: number;
  name: string;
  species: string;
  wateringFrequency: number;
  light: LightLevel;
  careLevel: CareLevel;
  toxicToPets: boolean;
  imageUrl?: string;
};

/** A plant the user actually owns */
export type Plant = {
  id: number;
  catalogId: number;
  nickname?: string;
  name: string;
  imageUrl?: string;
  species: string;
  lastWatered: string;
  wateringFrequency: number;
  wateringHistory?: WateringEntry[];
  location?: PlantLocation;
  light?: LightLevel;
};