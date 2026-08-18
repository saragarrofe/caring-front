import {
  FertilizationFrequency,
  HumidityRequirement,
  LightLevel,
  PruningRequirement,
  TemperatureRange,
  WateringFrequency,
} from './Plant';

export type CareGuide = {
  watering: WateringFrequency;
  soil: string;
  light: LightLevel;
  temperature?: TemperatureRange;
  humidity: HumidityRequirement;
  fertilization?: FertilizationFrequency;
  pruning?: PruningRequirement;
  notes?: string;
};
