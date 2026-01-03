export type BudgetRange = 'budget' | 'moderate' | 'premium' | 'luxury';

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

export interface UserPreferences {
    travelStyle: string[];
    budgetRange: BudgetRange;
    preferredDestinations: string[];
    travelFrequency: string;
}

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    hasCompletedOnboarding: boolean;
    preferences?: UserPreferences;
    createdAt?: string;
    updatedAt?: string;
}
