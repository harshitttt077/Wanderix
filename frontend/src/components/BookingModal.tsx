import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Trek } from '../data/hikes';
import Button from './Button';
import { motion } from 'framer-motion';

interface BookingModalProps {
    isOpen: boolean;
    closeModal: () => void;
    trek: Trek;
}

const BookingModal = ({ isOpen, closeModal, trek }: BookingModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        travelers: 1,
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate booking API call
        setTimeout(() => {
            setIsSuccess(true);
        }, 1000);
    };

    const resetAndClose = () => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', date: '', travelers: 1 });
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-bg-secondary border border-white/10 p-8 text-left align-middle shadow-xl transition-all">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </motion.div>
                                        <Dialog.Title as="h3" className="text-2xl font-serif text-white mb-2">
                                            Booking Confirmed!
                                        </Dialog.Title>
                                        <p className="text-white/60 mb-8">
                                            You are all set for <strong>{trek.name}</strong>. Check your email for details.
                                        </p>
                                        <Button variant="primary" onClick={resetAndClose} className="w-full">
                                            Close
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Dialog.Title as="h3" className="text-2xl font-serif text-white mb-1">
                                            Book Your Trek
                                        </Dialog.Title>
                                        <div className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-6">
                                            {trek.name} • ₹{trek.price}/person
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Preferred Date</label>
                                                    <input
                                                        type="date"
                                                        required
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Travelers</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="20"
                                                        required
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                        value={formData.travelers}
                                                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <Button variant="primary" type="submit" className="w-full">
                                                    Confirm Booking (₹{trek.price * formData.travelers})
                                                </Button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default BookingModal;
