import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import GlassCard from '@/components/GlassCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { type UserPreferences } from '@/types';

const Dashboard = () => {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setPreferences(data.preferences || null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const mockDestinations = [
        {
            id: '1',
            name: 'Spiti Valley',
            location: 'Himachal Pradesh, India',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
            tags: 'Adventure • Mountains',
        },
        {
            id: '2',
            name: 'Gokarna',
            location: 'Karnataka, India',
            image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
            tags: 'Beaches • Calm',
        },
        {
            id: '3',
            name: 'Ziro Valley',
            location: 'Arunachal Pradesh, India',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
            tags: 'Hidden • Nature',
        },
    ];

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="container-custom">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl font-display mb-3">
                        {getGreeting()}, <span className="gradient-text">{user?.displayName?.split(' ')[0]}</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Ready to explore something new today?
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <GlassCard hover>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Saved Trips</p>
                                <p className="text-3xl font-bold">0</p>
                            </div>
                            <div className="text-4xl">🗺️</div>
                        </div>
                    </GlassCard>

                    <GlassCard hover>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Places Visited</p>
                                <p className="text-3xl font-bold">0</p>
                            </div>
                            <div className="text-4xl">✈️</div>
                        </div>
                    </GlassCard>

                    <GlassCard hover>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Upcoming Plans</p>
                                <p className="text-3xl font-bold">0</p>
                            </div>
                            <div className="text-4xl">📅</div>
                        </div>
                    </GlassCard>
                </div>

                {/* Your Preferences */}
                {preferences && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-display mb-6">Your Travel Profile</h2>
                        <GlassCard>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Travel Style</p>
                                    <div className="flex flex-wrap gap-2">
                                        {preferences.travelStyle.map((style) => (
                                            <span
                                                key={style}
                                                className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm capitalize"
                                            >
                                                {style}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Budget Range</p>
                                    <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-full text-sm capitalize">
                                        {preferences.budgetRange}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Preferred Destinations</p>
                                    <div className="flex flex-wrap gap-2">
                                        {preferences.preferredDestinations.map((dest) => (
                                            <span
                                                key={dest}
                                                className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm capitalize"
                                            >
                                                {dest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Travel Frequency</p>
                                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm capitalize">
                                        {preferences.travelFrequency}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {/* Recommended Destinations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-display mb-6">Recommended for You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockDestinations.map((dest, index) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <GlassCard hover className="overflow-hidden p-0">
                                    <div className="relative h-48">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-display font-bold mb-1">
                                                {dest.name}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-2">{dest.location}</p>
                                            <p className="text-xs text-gray-400">{dest.tags}</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <button className="w-full py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
