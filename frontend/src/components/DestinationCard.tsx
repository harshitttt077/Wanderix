import { motion } from 'framer-motion';
import { type Destination } from '@/types';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
    destination: Destination;
    index?: number;
}

const DestinationCard = ({ destination, index = 0 }: DestinationCardProps) => {
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
            className="group relative"
        >
            <Link to={`/destinations/${destination.id}`} className="block overflow-hidden rounded-[2rem] aspect-[3/4] relative cursor-pointer">
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
                </div>

                {/* Content Layer */}
                <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col items-start">
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {destination.tags.mood.map((mood) => (
                            <span
                                key={mood}
                                className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/90 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20"
                            >
                                {mood}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-3xl font-serif text-white leading-tight mb-2 group-hover:text-primary-200 transition-colors duration-300">
                        {destination.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-[1px] bg-white/50"></span>
                        <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">
                            {destination.country}
                        </span>
                    </div>

                    <p className="text-white/60 text-sm line-clamp-2 max-w-[90%] font-light group-hover:text-white/80 transition-colors duration-300">
                        {destination.description}
                    </p>
                </div>

                {/* Top Badge */}
                {destination.isOffbeat && (
                    <div className="absolute top-6 right-6 z-10">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <span className="text-xs">✦</span>
                        </div>
                    </div>
                )}
            </Link>
        </motion.div>
    );
};

export default DestinationCard;
