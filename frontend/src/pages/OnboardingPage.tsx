import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import { type TravelStyle, type BudgetRange, type DestinationType, type TravelFrequency } from '@/types';

const OnboardingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [preferences, setPreferences] = useState({
        travelStyle: [] as TravelStyle[],
        budgetRange: null as BudgetRange | null,
        preferredDestinations: [] as DestinationType[],
        travelFrequency: null as TravelFrequency | null,
    });

    const travelStyles: { value: TravelStyle; label: string; emoji: string }[] = [
        { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
        { value: 'calm', label: 'Calm & Relaxing', emoji: '🧘' },
        { value: 'luxury', label: 'Luxury', emoji: '✨' },
        { value: 'backpacking', label: 'Backpacking', emoji: '🎒' },
    ];

    const budgetRanges: { value: BudgetRange; label: string }[] = [
        { value: 'budget', label: 'Budget (< ₹20k)' },
        { value: 'moderate', label: 'Moderate (₹20k - ₹50k)' },
        { value: 'premium', label: 'Premium (₹50k - ₹1L)' },
        { value: 'luxury', label: 'Luxury (> ₹1L)' },
    ];

    const destinationTypes: { value: DestinationType; label: string; emoji: string }[] = [
        { value: 'mountains', label: 'Mountains', emoji: '⛰️' },
        { value: 'beaches', label: 'Beaches', emoji: '🏖️' },
        { value: 'cities', label: 'Cities', emoji: '🏙️' },
        { value: 'hidden', label: 'Hidden Places', emoji: '🗺️' },
    ];

    const travelFrequencies: { value: TravelFrequency; label: string }[] = [
        { value: 'rarely', label: 'Rarely (Once a year)' },
        { value: 'occasionally', label: 'Occasionally (2-3 times/year)' },
        { value: 'frequently', label: 'Frequently (4-6 times/year)' },
        { value: 'constantly', label: 'Constantly (Monthly)' },
    ];

    const toggleTravelStyle = (style: TravelStyle) => {
        setPreferences((prev) => ({
            ...prev,
            travelStyle: prev.travelStyle.includes(style)
                ? prev.travelStyle.filter((s) => s !== style)
                : [...prev.travelStyle, style],
        }));
    };

    const toggleDestination = (dest: DestinationType) => {
        setPreferences((prev) => ({
            ...prev,
            preferredDestinations: prev.preferredDestinations.includes(dest)
                ? prev.preferredDestinations.filter((d) => d !== dest)
                : [...prev.preferredDestinations, dest],
        }));
    };

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const userRef = doc(db, 'users', user.uid);

            await updateDoc(userRef, {
                preferences,
                hasCompletedOnboarding: true,
                updatedAt: new Date().toISOString(),
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return preferences.travelStyle.length > 0;
            case 2:
                return preferences.budgetRange !== null;
            case 3:
                return preferences.preferredDestinations.length > 0;
            case 4:
                return preferences.travelFrequency !== null;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-3xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`w-1/4 h-2 rounded-full mx-1 transition-colors ${s <= step ? 'bg-primary-500' : 'bg-gray-700'
                                    }`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400 text-sm">
                        Step {step} of 4
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GlassCard>
                            {/* Step 1: Travel Style */}
                            {step === 1 && (
                                <div>
                                    <h2 className="text-3xl font-display mb-3">
                                        What's your travel style?
                                    </h2>
                                    <p className="text-gray-400 mb-6">
                                        Select all that apply
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {travelStyles.map((style) => (
                                            <button
                                                key={style.value}
                                                onClick={() => toggleTravelStyle(style.value)}
                                                className={`p-6 rounded-xl border-2 transition-all ${preferences.travelStyle.includes(style.value)
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-gray-700 hover:border-gray-600'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-2">{style.emoji}</div>
                                                <div className="font-medium">{style.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Budget Range */}
                            {step === 2 && (
                                <div>
                                    <h2 className="text-3xl font-display mb-3">
                                        What's your budget range?
                                    </h2>
                                    <p className="text-gray-400 mb-6">
                                        Per trip budget
                                    </p>
                                    <div className="space-y-3">
                                        {budgetRanges.map((budget) => (
                                            <button
                                                key={budget.value}
                                                onClick={() =>
                                                    setPreferences({ ...preferences, budgetRange: budget.value })
                                                }
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${preferences.budgetRange === budget.value
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-gray-700 hover:border-gray-600'
                                                    }`}
                                            >
                                                {budget.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Preferred Destinations */}
                            {step === 3 && (
                                <div>
                                    <h2 className="text-3xl font-display mb-3">
                                        Where do you love to go?
                                    </h2>
                                    <p className="text-gray-400 mb-6">
                                        Select your preferred destinations
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {destinationTypes.map((dest) => (
                                            <button
                                                key={dest.value}
                                                onClick={() => toggleDestination(dest.value)}
                                                className={`p-6 rounded-xl border-2 transition-all ${preferences.preferredDestinations.includes(dest.value)
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-gray-700 hover:border-gray-600'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-2">{dest.emoji}</div>
                                                <div className="font-medium">{dest.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Travel Frequency */}
                            {step === 4 && (
                                <div>
                                    <h2 className="text-3xl font-display mb-3">
                                        How often do you travel?
                                    </h2>
                                    <p className="text-gray-400 mb-6">
                                        This helps us personalize your experience
                                    </p>
                                    <div className="space-y-3">
                                        {travelFrequencies.map((freq) => (
                                            <button
                                                key={freq.value}
                                                onClick={() =>
                                                    setPreferences({ ...preferences, travelFrequency: freq.value })
                                                }
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${preferences.travelFrequency === freq.value
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-gray-700 hover:border-gray-600'
                                                    }`}
                                            >
                                                {freq.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                >
                                    Back
                                </Button>
                                {step < 4 ? (
                                    <Button
                                        variant="primary"
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={handleComplete}
                                        disabled={!canProceed() || loading}
                                    >
                                        {loading ? 'Saving...' : 'Complete'}
                                    </Button>
                                )}
                            </div>
                        </GlassCard>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OnboardingPage;
