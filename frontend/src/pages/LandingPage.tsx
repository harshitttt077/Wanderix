import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import TrekCard from '../components/TrekCard';
import BookingModal from '../components/BookingModal';
import { INDIAN_TREKS, Trek } from '../data/hikes';

const LandingPage = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Parallax Effects
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    const handleBookTrek = (trek: Trek) => {
        setSelectedTrek(trek);
        setIsBookingOpen(true);
    };

    const filteredTreks = INDIAN_TREKS.filter(trek => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            trek.name.toLowerCase().includes(query) ||
            trek.region.toLowerCase().includes(query)
        );
    });

    const handleGetStarted = () => {
        const heroSection = document.querySelector('section:nth-of-type(2)');
        heroSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-bg-primary overflow-x-hidden">
            {/* Booking Modal */}
            {selectedTrek && (
                <BookingModal
                    isOpen={isBookingOpen}
                    closeModal={() => setIsBookingOpen(false)}
                    trek={selectedTrek}
                />
            )}

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        y: yHero,
                        opacity: opacityHero
                    }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            // Fallback to hero-india for now since we have limited assets
                            backgroundImage: 'url(/assets/images/hero-india.png)',
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/30 to-bg-primary" />
                </motion.div>

                <div className="relative z-10 container-custom text-center max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block text-primary-500 text-xs font-bold uppercase tracking-[0.4em] mb-6 drop-shadow-md">
                            The Mountains Are Calling
                        </span>

                        <h1 className="text-white mb-8 leading-tight font-serif italic drop-shadow-2xl text-6xl md:text-8xl">
                            Conquer The <br />
                            <span className="not-italic gradient-text">Himalayas</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                            Premiere hiking expeditions to Kedarnath, Hampta Pass, and beyond.
                            Experience the spiritual altitude of India.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto mb-16 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/40 to-secondary-500/40 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
                            <GlassCard className="p-4 flex items-center border-white/20 bg-black/40 backdrop-blur-xl rounded-full relative">
                                <div className="pl-4 text-primary-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Find your trek (e.g., Kedarnath, Easy...)"
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/50 text-base h-full px-6 font-light"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </GlassCard>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Button variant="primary" size="lg" onClick={handleGetStarted} className="min-w-[180px] shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                                Find Your Trek
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Refined Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="w-[1px] h-20 bg-white/10 overflow-hidden relative">
                        <div className="absolute w-full h-full bg-primary-500/80 animate-float" style={{ transformOrigin: 'top', animation: 'float 3s ease-in-out infinite' }}></div>
                    </div>
                </motion.div>
            </section>

            {/* Trek Listing Section */}
            <section className="py-32 relative z-20 bg-bg-primary">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-24">
                        <span className="text-primary-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">
                            Selected Expeditions
                        </span>
                        <h2 className="text-white max-w-3xl font-serif text-5xl">
                            {searchQuery ? `Searching for "${searchQuery}"` : 'Upcoming Departures'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTreks.map((trek, index) => (
                            <TrekCard
                                key={trek.id}
                                trek={trek}
                                index={index}
                                onBook={handleBookTrek}
                            />
                        ))}
                    </div>
                    {filteredTreks.length === 0 && (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-white/50 text-lg font-light italic">No treks found matching your criteria.</p>
                            <Button variant="ghost" className="mt-4" onClick={() => setSearchQuery('')}>Clear Search</Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
