import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Button from './Button';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { scrollY } = useScroll();

    // Dynamic styles based on scroll
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = [
        { name: 'Destinations', path: '/destinations' },
        ...(user ? [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'My Trips', path: '/trips' }
        ] : [])
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none transition-all duration-500">
            <motion.nav
                className={`container-custom mx-auto px-6 h-14 flex items-center justify-between pointer-events-auto rounded-full transition-all duration-500 ${isScrolled
                    ? 'bg-bg-primary/80 backdrop-blur-xl border border-white/5 shadow-2xl max-w-5xl'
                    : 'bg-transparent max-w-full'
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group relative z-10">
                    <span className="text-xl font-serif font-bold text-white tracking-tight">
                        Wanderix<span className="text-primary-400">.</span>
                    </span>
                </Link>

                {/* Navigation Links - Centered if possible, or right aligned */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="relative text-sm font-medium transition-colors group"
                        >
                            <span className={`transition-colors duration-300 ${location.pathname === link.path ? 'text-white' : 'text-white/60 group-hover:text-white'
                                }`}>
                                {link.name}
                            </span>
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="nav-dot"
                                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary-400"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-4 relative z-10">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="hidden md:flex items-center gap-2 pr-4 border-r border-white/10"
                            >
                                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                                    {user.displayName?.split(' ')[0]}
                                </span>
                            </motion.div>
                            <button
                                onClick={handleLogout}
                                className="text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth">
                            <Button variant="primary" size="sm" className="!px-6 !py-2 !text-xs !tracking-widest !uppercase !font-bold">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </motion.nav>
        </header>
    );
};

export default Navbar;
