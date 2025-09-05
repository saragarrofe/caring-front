
import { Plant } from '../types/plant';

export const mockPlants: Plant[] = [ 
    {
        id: 1,
        name: 'Ficus',
        species: 'Ficus elastica',
        wateringFrequency: 7,
        lastWatered: '2024-06-01',
        imageUrl: 'https://example.com/ficus.jpg',
    },
    {
        id: 2,
        name: 'Monstera',
        species: 'Monstera deliciosa',
        wateringFrequency: 5,
        lastWatered: '2024-06-03',
        imageUrl: 'https://example.com/monstera.jpg',
    },
    {
        id: 3,
        name: 'Succulent',
        species: 'Echeveria elegans',
        wateringFrequency: 14,
        lastWatered: '2024-05-28',
        imageUrl: 'https://example.com/succulent.jpg',
    },
];