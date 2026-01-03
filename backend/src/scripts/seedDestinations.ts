import { db } from '../config/firebase-admin.js';
import { Destination } from '../types/index.js';

const destinations: Partial<Destination>[] = [
    {
        name: 'Spiti Valley',
        location: 'Himachal Pradesh',
        country: 'India',
        description: 'A cold desert mountain valley located high in the Himalayas. Known for its stark landscapes and ancient monasteries.',
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
        tags: {
            mood: ['adventure', 'calm'],
            budget: 'moderate',
            difficulty: 'challenging'
        },
        rating: 4.8,
        isOffbeat: true
    },
    {
        name: 'Gokarna',
        location: 'Karnataka',
        country: 'India',
        description: 'A small temple town on the western coast of India, famous for its pristine beaches and laid-back atmosphere.',
        imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80',
        tags: {
            mood: ['calm', 'backpacking'],
            budget: 'budget',
            difficulty: 'easy'
        },
        rating: 4.6,
        isOffbeat: true
    },
    {
        name: 'Ziro Valley',
        location: 'Arunachal Pradesh',
        country: 'India',
        description: 'A beautiful plateau surrounded by mountains, home to the Apatani tribe and famous for the Ziro Music Festival.',
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80',
        tags: {
            mood: ['hidden', 'adventure'],
            budget: 'moderate',
            difficulty: 'moderate'
        },
        rating: 4.7,
        isOffbeat: true
    },
    {
        name: 'Khajjiar',
        location: 'Himachal Pradesh',
        country: 'India',
        description: 'Often called the "Mini Switzerland of India", it features a small lake in the center of a large glade.',
        imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80',
        tags: {
            mood: ['calm', 'luxury'],
            budget: 'premium',
            difficulty: 'easy'
        },
        rating: 4.5,
        isOffbeat: false
    },
    {
        name: 'Munnar',
        location: 'Kerala',
        country: 'India',
        description: 'A town in the Western Ghats mountain range, famous for its rolling tea plantations and mist-covered hills.',
        imageUrl: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=1200&q=80',
        tags: {
            mood: ['calm', 'luxury'],
            budget: 'moderate',
            difficulty: 'easy'
        },
        rating: 4.9,
        isOffbeat: false
    }
];

const seed = async () => {
    try {
        console.log('🚀 Seeding destinations...');
        const collection = db.collection('destinations');

        // Clear existing (optional - for dev)
        // const snapshot = await collection.get();
        // const batch = db.batch();
        // snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        // await batch.commit();

        for (const dest of destinations) {
            await collection.add({
                ...dest,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log(`✅ Added: ${dest.name}`);
        }

        console.log('✨ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seed();
