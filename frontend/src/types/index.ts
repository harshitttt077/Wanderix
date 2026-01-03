export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    hasCompletedOnboarding: boolean;
}

export interface UserPreferences {
    travelStyle: TravelStyle[];
    budgetRange: BudgetRange;
    preferredDestinations: DestinationType[];
    travelFrequency: TravelFrequency;
}

export type TravelStyle = 'adventure' | 'calm' | 'luxury' | 'backpacking';

export type BudgetRange = 'budget' | 'moderate' | 'premium' | 'luxury';

export type DestinationType = 'mountains' | 'beaches' | 'cities' | 'hidden';

export type TravelFrequency = 'rarely' | 'occasionally' | 'frequently' | 'constantly';

export interface Destination {
    id: string;
    name: string;
    location: string;
    country: string;
    description: string;
    imageUrl: string;
    tags: {
        mood: string[];
        budget: BudgetRange;
        difficulty: 'easy' | 'moderate' | 'challenging';
    };
    rating: number;
    isOffbeat: boolean;
}

export interface Trip {
    id: string;
    userId: string;
    title: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    itinerary: DayPlan[];
    checklist: ChecklistItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface DayPlan {
    day: number;
    date: Date;
    activities: Activity[];
    estimatedCost: number;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    duration: number; // in minutes
    cost: number;
    location: string;
}

export interface ChecklistItem {
    id: string;
    title: string;
    completed: boolean;
    category: 'documents' | 'packing' | 'bookings' | 'other';
}
