

export type Plant = {
    id: number;
    name: string;
    species: string;
    wateringFrequency: number; // in days
    lastWatered: string; // ISO date string
    imageUrl?: string;
}; 