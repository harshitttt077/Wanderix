import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import GlassCard from '@/components/GlassCard';
import { type Destination, type BudgetRange } from '@/types';

const DestinationsPage = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [selectedMood, setSelectedMood] = useState<string[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<BudgetRange | 'all'>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | 'all'>('all');

    const moods = ['adventure', 'calm', 'luxury', 'backpacking', 'hidden'];
    const budgets: (BudgetRange | 'all')[] = ['all', 'budget', 'moderate', 'premium', 'luxury'];
    const difficulties = ['all', 'easy', 'moderate', 'challenging'];

    const fetchDestinations = async () => {
        try {
            setLoading(true);
            setError(null);

            // Build query params
            const params = new URLSearchParams();
            if (selectedMood.length > 0) params.append('mood', selectedMood.join(','));
            if (selectedBudget !== 'all') params.append('budget', selectedBudget);
            if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);

            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/destinations?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch destinations');
            }

            const data = await response.json();
            setDestinations(data);
        } catch (err) {
            console.error('Error fetching destinations:', err);
            setError('Unable to load destinations. Please try again later.');

            // Fallback to mock data if API fails (for demo purposes)
            // setDestinations(mockDestinations); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, [selectedMood, selectedBudget, selectedDifficulty]);

    const toggleMood = (mood: string) => {
        setSelectedMood(prev =>
            prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
        );
    };

    return (
        <div className="min-h-screen py-24 px-4 bg-bg-primary">
            <div className="container-custom">
                {/* Header Section */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-display mb-4"
                    >
                        Explore <span className="gradient-text">Destinations</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-xl max-w-2xl"
                    >
                        Discover curated offbeat locations tailored to your travel style and spirit.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-6 sticky top-24">
                            <h3 className="text-xl font-display mb-6">Filters</h3>

                            {/* Mood Filter */}
                            <div className="mb-8">
                                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">By Spirit</p>
                                <div className="flex flex-wrap gap-2">
                                    {moods.map(mood => (
                                        <button
                                            key={mood}
                                            onClick={() => toggleMood(mood)}
                                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedMood.includes(mood)
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                                }`}
                                        >
                                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Filter */}
                            <div className="mb-8">
                                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Budget Range</p>
                                <div className="space-y-2">
                                    {budgets.map(budget => (
                                        <button
                                            key={budget}
                                            onClick={() => setSelectedBudget(budget)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedBudget === budget
                                                    ? 'bg-secondary-500 text-white'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                                }`}
                                        >
                                            {budget === 'all' ? 'All Budgets' : budget.charAt(0).toUpperCase() + budget.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div>
                                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Difficulty</p>
                                <div className="flex flex-col gap-2">
                                    {difficulties.map(diff => (
                                        <button
                                            key={diff}
                                            onClick={() => setSelectedDifficulty(diff)}
                                            className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedDifficulty === diff
                                                    ? 'bg-accent-500 text-white'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                                }`}
                                        >
                                            {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedMood([]);
                                    setSelectedBudget('all');
                                    setSelectedDifficulty('all');
                                }}
                                className="w-full mt-8 py-2 text-xs text-gray-500 hover:text-primary-400 underline underline-offset-4 transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </GlassCard>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-20"
                                >
                                    <LoadingSpinner />
                                    <p className="mt-4 text-gray-400 animate-pulse">Searching the wilderness...</p>
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-20"
                                >
                                    <div className="text-4xl mb-4">🧗‍♂️</div>
                                    <h3 className="text-2xl mb-2">Oops! Something went wrong</h3>
                                    <p className="text-gray-400 mb-6">{error}</p>
                                    <button
                                        onClick={fetchDestinations}
                                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            ) : destinations.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-20"
                                >
                                    <div className="text-4xl mb-4">🏜️</div>
                                    <h3 className="text-2xl mb-2">No destinations found</h3>
                                    <p className="text-gray-400">Try adjusting your filters to find more locations.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {destinations.map((dest, index) => (
                                        <DestinationCard key={dest.id} destination={dest} index={index} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationsPage;
