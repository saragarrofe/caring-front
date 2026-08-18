export type WateringEntry = {
  date: string;
  note?: string;
};

export type WateringFrequency = {
  intervalDays: number;
  label: string;
  instructions?: string;
};

export type LightLevel = 'Low' | 'Medium' | 'High' | 'Indirect';

export type TemperatureRange = {
  min: number;
  max: number;
  unit: 'celsius';
};

export type HumidityRequirement = 'low' | 'medium' | 'high';

export type FertilizationFrequency = 'none' | 'monthly' | 'every_2_months' | 'seasonal';

export type PruningRequirement = {
  required: boolean;
  frequency?: 'monthly' | 'seasonal' | 'yearly' | 'as_needed';
  instructions?: string;
};

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
  wateringFrequency: WateringFrequency;
  light: LightLevel;
  careLevel: CareLevel;
  toxicToPets: boolean;
  imageUrl?: string;
};

export type Plant = {
  id: number;
  catalogId?: number;
  nickname?: string;
  name: string;
  imageUrl?: string;
  species: string;
  lastWatered: string;
  wateringFrequency: WateringFrequency;
  wateringHistory?: WateringEntry[];
  location?: PlantLocation;
  light?: LightLevel;
  careLevel?: CareLevel;
};
