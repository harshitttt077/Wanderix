import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    icon?: ReactNode;
}

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    className = '',
    icon,
}: ButtonProps) => {
    const baseClasses = 'relative rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden magnetic-btn';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-primary-400 to-secondary-500 text-bg-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
        secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md',
        outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
        ghost: 'text-white/70 hover:text-white hover:bg-white/5',
    };

    const sizeClasses = {
        sm: 'px-5 py-2 text-sm',
        md: 'px-7 py-3 text-base',
        lg: 'px-10 py-5 text-lg uppercase tracking-wider',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            whileHover={{ scale: disabled ? 1 : 1.05, y: -2 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {icon && <span className="relative z-10">{icon}</span>}
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
        </motion.button>
    );
};

export default Button;
