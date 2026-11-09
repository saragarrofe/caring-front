export type Mood = 'feliz' | 'sed' | 'sol' | 'dormida';

export type Plant = {
  id: string;
  name: string;
  species: string;
  origin: string;
  imageUrl?: string;
  location?: PlantLocation;
  personality: string;
  mood: Mood;
  leafHue: number;
  spot: 'ventana' | 'salon' | 'terraza';
  friendship: number; // 0-100
  daysTogether: number;
  care: {
    difficulty: string;
    light: string;
    water: string;
    humidity: string;
    petFriendly: boolean;
  };
  careLevels: CareLevel;
  careTips: { light: string; water: string; humidity: string };
  lastWatered: string;
  wateringFrequency: WateringFrequency;
  wateringHistory?: WateringEntry[];
  lore: { title: string; body: string; unlocked: boolean }[];
  growth: { label: string; leaves: number }[];
};

export const moodText: Record<Mood, { line: string; emoji: string }> = {
  feliz: { line: 'Está radiante. Ha estirado una hoja nueva esta mañana.', emoji: '' },
  sed: {
    line: 'Tiene un poquito de sed. Al hidratarla, verás cómo recupera la tensión de sus hojas.',
    emoji: '',
  },
  sol: { line: 'Le apetece un rato más de luz. Acércala a la ventana.', emoji: '' },
  dormida: { line: 'Está descansando. En invierno crece despacito, y eso está bien.', emoji: '' },
};
export const collectorCards = [
  { name: 'Monstera', rarity: 'Común', found: true, hue: 150 },
  { name: 'Calathea', rarity: 'Rara', found: true, hue: 165 },
  { name: 'Cactus dorado', rarity: 'Común', found: true, hue: 135 },
  { name: 'Pothos', rarity: 'Común', found: true, hue: 120 },
  { name: 'Alocasia', rarity: 'Épica', found: false, hue: 155 },
  { name: 'Begonia maculata', rarity: 'Rara', found: false, hue: 140 },
  { name: 'Hoya', rarity: 'Rara', found: false, hue: 130 },
  { name: 'Pilea', rarity: 'Común', found: false, hue: 125 },
];

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

export type CareLevelDifficulty = 'Easy' | 'Medium' | 'Hard';
export type CareLevel = {
  difficulty: CareLevelDifficulty;
  light: number; // 1-5 (frecuencia)
  water: number; // 1-5 (frecuencia)
  humidity: number; // 0-100 %
};

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

export type WateringEntry = {
  date: string;
  note?: string;
};

export type WateringFrequency = {
  intervalDays: number;
  label: string;
  instructions?: string;
};
