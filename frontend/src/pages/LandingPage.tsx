import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import { useEffect, useState, useRef } from 'react';
import DestinationCard from '@/components/DestinationCard';
import { searchPlaces, type Place } from '@/services/googlePlaces';
import type { Destination, BudgetRange } from '@/types';
import GlassCard from '@/components/GlassCard';

// Adapter to convert Google Place to our Destination type
const adaptPlaceToDestination = (place: Place): Destination => {
    // Map price level to budget
    let budget: BudgetRange = 'moderate';
    if (place.price_level === 0 || place.price_level === 1) budget = 'budget';
    else if (place.price_level === 2) budget = 'moderate';
    else if (place.price_level === 3) budget = 'premium';
    else if (place.price_level === 4) budget = 'luxury';

    return {
        id: place.id,
        name: place.name,
        location: place.formatted_address?.split(',')[0] || 'Unknown Location',
        country: place.formatted_address?.split(',').pop()?.trim() || 'Unknown Country',
        description: place.description || 'A mesmerizing location waiting to be explored.',
        imageUrl: place.photos?.[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
        tags: {
            mood: place.types ? place.types.slice(0, 2) : ['Adventure', 'Scenic'],
            budget: budget,
            difficulty: (place.rating || 0) > 4.5 ? 'challenging' : 'easy' // Mock logic
        },
        rating: place.rating || 0,
        isOffbeat: (place.user_ratings_total || 0) < 1000 // Less reviews = offbeat
    };
};

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(false);

    // Parallax & Scroll Hooks
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        // Initial load
        handleSearch('');
    }, []);

    const handleSearch = async (query: string) => {
        setLoading(true);
        try {
            // If empty, it returns default mocks from service
            const results = await searchPlaces(query);
            const adapted = results.map(adaptPlaceToDestination);
            setDestinations(adapted);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleGetStarted = () => {
        if (user) {
            navigate(user.hasCompletedOnboarding ? '/dashboard' : '/onboarding');
        } else {
            navigate('/auth');
        }
    };

    return (
        <div ref={targetRef} className="min-h-screen bg-bg-primary">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        y: yHero,
                        opacity: opacityHero
                    }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale-[0.3]"
                        style={{
                            backgroundImage: 'url(/assets/images/hero-vibe.png)',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/30 to-bg-primary" />
                </motion.div>

                <div className="relative z-10 container-custom text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block text-primary-400 text-xs font-bold uppercase tracking-[0.4em] mb-6">
                            The New Standard of Journey
                        </span>

                        <h1 className="text-white mb-8 leading-tight font-serif italic">
                            Wander Beyond <br />
                            <span className="not-italic gradient-text">Every Limit</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Stop following crowds. Start tracing your own path with an AI explorer
                            that understands the rhythm of your wanderlust.
                        </p>

                        {/* Search Bar - Minimalist */}
                        <div className="max-w-xl mx-auto mb-16 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
                            <GlassCard className="p-4 flex items-center border-white/5 bg-black/50 backdrop-blur-xl rounded-full relative">
                                <div className="pl-4 text-white/50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Where does your soul shed its weight?"
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/30 text-base h-full px-6 font-light"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {loading && (
                                    <div className="pr-4">
                                        <div className="w-4 h-4 border border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </GlassCard>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Button variant="primary" size="lg" onClick={handleGetStarted} className="min-w-[180px]">
                                Start Exploration
                            </Button>
                            <button
                                onClick={() => navigate('/destinations')}
                                className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold border-b border-transparent hover:border-white/20 pb-1"
                            >
                                Browse The Vault
                            </button>
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
                        <div className="absolute w-full h-full bg-primary-400/50 animate-float" style={{ transformOrigin: 'top', animation: 'float 3s ease-in-out infinite' }}></div>
                    </div>
                </motion.div>
            </section>

            {/* Featured Section - Asymmetrical Grid Layout idea, simplified for now to standard grid but cleaner */}
            <section className="py-40 relative z-20 bg-bg-primary">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-24">
                        <span className="text-primary-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">
                            {searchQuery ? 'Search Results' : 'Curated Selection'}
                        </span>
                        <h2 className="text-white max-w-3xl font-serif">
                            {searchQuery ? `Coordinates Found` : 'Prime Destinations'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest, index) => (
                            <DestinationCard key={dest.id} destination={dest} index={index} />
                        ))}
                    </div>
                    {destinations.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <p className="text-white/30 text-lg font-light italic">No coordinates found matching your frequency.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Vision Section - Editorial Style */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="lg:text-6xl mb-8 font-serif leading-[1.1]">
                                Elevated by <br /><span className="gradient-text italic">Intelligence</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-12 font-light">
                                Our proprietary engine analyzes millions of data points to predict your next obsession.
                                Not just destinations, but experiences that resonate with the frequency of your soul.
                            </p>

                            <div className="flex gap-12 border-t border-white/10 pt-8">
                                {[
                                    { val: '99%', label: 'Precision' },
                                    { val: '∞', label: 'Possibilities' }
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-serif text-white mb-1">{stat.val}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary-500/10 rounded-full blur-[100px]"></div>
                            <GlassCard className="relative aspect-square rounded-[2rem] overflow-hidden group">
                                <img
                                    src="/assets/images/neon-valleys.png"
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                    alt="AI Analysis"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
