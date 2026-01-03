import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

const GlassCard = ({ children, className = '', hover = false }: GlassCardProps) => {
    return (
        <motion.div
            className={`glass-card rounded-3xl p-6 ${className}`}
            whileHover={hover ? {
                scale: 1.02,
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                borderColor: "rgba(34, 211, 238, 0.3)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
            } : {}}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
