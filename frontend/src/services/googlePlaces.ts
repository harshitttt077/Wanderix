// Types for our destination data
export interface Place {
    id: string;
    name: string;
    description?: string;
    rating?: number;
    user_ratings_total?: number;
    photos?: string[];
    price_level?: number;
    geometry?: {
        location: {
            lat: number;
            lng: number;
        }
    };
    types?: string[];
    formatted_address?: string;
}

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// Mock data for development when API key is missing or for specific demos
const MOCK_PLACES: Place[] = [
    {
        id: 'mock-1',
        name: 'Neon Tokyo District',
        description: 'Experience the vibrant nightlife and futuristic architecture of Tokyo\'s most electrifying district.',
        rating: 4.9,
        user_ratings_total: 1240,
        photos: ['/assets/images/neon-valleys.png'],
        price_level: 3,
        types: ['urban', 'nightlife', 'culture'],
        formatted_address: 'Tokyo, Japan'
    },
    {
        id: 'mock-2',
        name: 'Aurora Borealis Base',
        description: 'A remote station offering the best views of the Northern Lights in a pristine, snowy landscape.',
        rating: 5.0,
        user_ratings_total: 856,
        photos: ['/assets/images/aurora-peaks.png'],
        price_level: 4,
        types: ['nature', 'adventure', 'scenic'],
        formatted_address: 'Tromsø, Norway'
    },
    {
        id: 'mock-3',
        name: 'Cyberpunk Cityscape',
        description: 'A sprawling metropolis of neon and steel, where tradition meets tomorrow.',
        rating: 4.7,
        user_ratings_total: 2100,
        photos: ['/assets/images/neon-valleys.png'],
        price_level: 2,
        types: ['urban', 'photography'],
        formatted_address: 'Hong Kong'
    },
    {
        id: 'mock-4',
        name: 'Bioluminescent Bay',
        description: 'Swim in glowing waters under a star-filled sky in this hidden natural wonder.',
        rating: 4.8,
        user_ratings_total: 543,
        photos: ['/assets/images/ether-sands.png'],
        price_level: 3,
        types: ['nature', 'water', 'romantic'],
        formatted_address: 'Mosquito Bay, Puerto Rico'
    }
];

export const searchPlaces = async (query: string): Promise<Place[]> => {
    if (!GOOGLE_PLACES_API_KEY) {
        console.warn('Google Places API Key missing. Using mock data.');
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_PLACES.filter(p =>
            !query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.types?.some(t => t.includes(query.toLowerCase()))
        );
    }

    try {
        // Note: In a real production app, this should go through your backend (proxy) to avoid CORS and exposing keys.
        // For this demo/dev, we return mock data as a safe default if no backend proxy is configured.

        console.log(`Fetching places for query: ${query}`);

        // Fallback to mocks for safety in this demo environment
        return MOCK_PLACES.filter(p =>
            !query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.types?.some(t => t.includes(query.toLowerCase()))
        );

    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
};

export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
    // Check mocks first
    const mock = MOCK_PLACES.find(p => p.id === placeId);
    if (mock) return mock;

    if (!GOOGLE_PLACES_API_KEY) return null;

    return null;
}
