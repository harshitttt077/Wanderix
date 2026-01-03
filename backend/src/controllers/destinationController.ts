import { Request, Response } from 'express';
import { db } from '../config/firebase-admin.js';
import { Destination } from '../types/index.js';

export const getDestinations = async (req: Request, res: Response) => {
    try {
        const { mood, budget, difficulty } = req.query;
        let query: any = db.collection('destinations');

        // Note: Firestore doesn't support complex "array-contains" multiple filters easily 
        // without composite indexes. For simplicity in this dev phase, 
        // we'll filter some on the server side if needed, or stick to simple filters.

        const snapshot = await query.get();
        let destinations = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        })) as Destination[];

        // Server-side filtering (Simpler for now than managing multiple Firestore indexes)
        if (mood) {
            const moodList = (mood as string).split(',');
            destinations = destinations.filter(dest =>
                dest.tags.mood.some(m => moodList.includes(m))
            );
        }

        if (budget) {
            destinations = destinations.filter(dest => dest.tags.budget === budget);
        }

        if (difficulty) {
            destinations = destinations.filter(dest => dest.tags.difficulty === difficulty);
        }

        res.json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};

export const getDestinationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('destinations').doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ error: 'Failed to fetch destination' });
    }
};
