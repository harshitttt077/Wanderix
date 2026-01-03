import { motion } from 'framer-motion';
import { Trek } from '@/data/hikes';
import Button from './Button';

interface TrekCardProps {
    trek: Trek;
    index?: number;
    onBook: (trek: Trek) => void;
}

const TrekCard = ({ trek, index = 0, onBook }: TrekCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.1 * index,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-bg-secondary rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary-500/30 transition-colors duration-500"
        >
            {/* Image Section */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={trek.imageUrl}
                    alt={trek.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                    // Fallback to a placeholder if image fails (since we had generation issues)
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/hero-india.png';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-90"></div>

                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                        {trek.difficulty}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 relative -mt-20">
                <div className="mb-6">
                    <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
                        {trek.region}
                    </span>
                    <h3 className="text-3xl font-serif text-white leading-none mb-4">
                        {trek.name}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed line-clamp-2">
                        {trek.description}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 py-6 mb-6">
                    <div>
                        <div className="text-white font-bold text-lg">{trek.altitudeFt.toLocaleString()}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">Ft. Altitude</div>
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg">{trek.durationDays}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">Days</div>
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg">{trek.bestMonth.split('-')[0]}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">Best Time</div>
                    </div>
                </div>

                {/* Footer and Action */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider block">Starting from</span>
                        <span className="text-2xl font-serif text-white">₹{trek.price.toLocaleString()}</span>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => onBook(trek)}>
                        Book Trek
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default TrekCard;
