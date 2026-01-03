import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrekCard from '@/components/TrekCard';
import BookingModal from '@/components/BookingModal';
import GlassCard from '@/components/GlassCard';
import { INDIAN_TREKS, Trek } from '@/data/hikes';

const DestinationsPage = () => {
    const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Filters
    const [selectedRegion, setSelectedRegion] = useState<string | 'all'>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | 'all'>('all');

    const regions = ['all', 'Uttarakhand', 'Himachal Pradesh', 'Kashmir'];
    const difficulties = ['all', 'Easy', 'Moderate', 'Difficult', 'Challenging'];

    const filteredTreks = useMemo(() => {
        return INDIAN_TREKS.filter(trek => {
            const matchRegion = selectedRegion === 'all' || trek.region.includes(selectedRegion);
            const matchDifficulty = selectedDifficulty === 'all' || trek.difficulty === selectedDifficulty;
            return matchRegion && matchDifficulty;
        });
    }, [selectedRegion, selectedDifficulty]);

    const handleBookTrek = (trek: Trek) => {
        setSelectedTrek(trek);
        setIsBookingOpen(true);
    };

    return (
        <div className="min-h-screen py-24 px-4 bg-bg-primary">
            {selectedTrek && (
                <BookingModal
                    isOpen={isBookingOpen}
                    closeModal={() => setIsBookingOpen(false)}
                    trek={selectedTrek}
                />
            )}

            <div className="container-custom">
                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-serif mb-4 text-white"
                    >
                        Upcoming <span className="gradient-text">Expeditions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-xl max-w-2xl"
                    >
                        Choose your challenge. From the Valley of Flowers to the peaks of Kedarnath.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <GlassCard className="p-6 sticky top-24 border-white/5 bg-bg-secondary/50">
                            <h3 className="text-xl font-serif mb-6 text-white">Refine Trek</h3>

                            {/* Region Filter */}
                            <div className="mb-8">
                                <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-4">Region</p>
                                <div className="space-y-2">
                                    {regions.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => setSelectedRegion(region)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedRegion === region
                                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                                                : 'bg-transparent text-white/50 hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            {region === 'all' ? 'All Regions' : region}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div>
                                <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-4">Difficulty</p>
                                <div className="flex flex-wrap gap-2">
                                    {difficulties.map(diff => (
                                        <button
                                            key={diff}
                                            onClick={() => setSelectedDifficulty(diff)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedDifficulty === diff
                                                ? 'bg-white text-bg-primary'
                                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                                                }`}
                                        >
                                            {diff}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedRegion('all');
                                    setSelectedDifficulty('all');
                                }}
                                className="w-full mt-8 py-2 text-xs text-white/30 hover:text-white transition-colors border-t border-white/10"
                            >
                                Reset Filters
                            </button>
                        </GlassCard>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {filteredTreks.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/5"
                                >
                                    <div className="text-4xl mb-4 opacity-50">🏔️</div>
                                    <h3 className="text-2xl mb-2 text-white font-serif">No Expeditions Found</h3>
                                    <p className="text-white/40">Adjust your criteria to find available treks.</p>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredTreks.map((trek, index) => (
                                        <TrekCard
                                            key={trek.id}
                                            trek={trek}
                                            index={index}
                                            onBook={handleBookTrek}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationsPage;
