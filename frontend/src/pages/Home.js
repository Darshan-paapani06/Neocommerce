import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized performance for a seamless shopping experience.' },
    { icon: '🔐', title: 'Secure Auth', desc: 'JWT-powered authentication keeps your account protected.' },
    { icon: '🛍️', title: 'Smart Cart', desc: 'Persistent cart with real-time sync across sessions.' },
    { icon: '✨', title: 'Curated Selection', desc: 'Handpicked products across top categories.' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
    const { user } = useAuth();

    return React.createElement(
        'div', { className: 'home' },
        // Hero Section
        React.createElement(
            'section', { className: 'hero' },
            React.createElement('div', { className: 'hero-glow' }),
            React.createElement('div', { className: 'hero-glow2' }),
            React.createElement(
                'div', { className: 'container hero-inner' },
                React.createElement(
                    motion.div, { className: 'hero-content', variants: containerVariants, initial: 'hidden', animate: 'visible' },
                    React.createElement(
                        motion.div, { className: 'hero-badge', variants: itemVariants },
                        React.createElement('span', { className: 'badge-dot' }),
                        ' New Season Drop'
                    ),
                    React.createElement(
                        motion.h1, { className: 'hero-title', variants: itemVariants },
                        'Shop the ',
                        React.createElement('br'),
                        React.createElement('span', { className: 'gradient-text' }, 'Future.')
                    ),
                    React.createElement(
                        motion.p, { className: 'hero-subtitle', variants: itemVariants },
                        'Premium products curated for those who move at the speed of tomorrow.'
                    ),
                    React.createElement(
                        motion.div, { className: 'hero-cta', variants: itemVariants },
                        React.createElement(
                            Link, { to: '/products', className: 'btn btn-primary hero-btn' },
                            'Explore Collection',
                            React.createElement(
                                'svg', { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                                React.createElement('path', { d: 'M5 12h14M12 5l7 7-7 7' })
                            )
                        ), !user && React.createElement(Link, { to: '/register', className: 'btn btn-outline hero-btn' }, 'Create Account')
                    ),
                    React.createElement(
                        motion.div, { className: 'hero-stats', variants: itemVariants },
                        React.createElement('div', { className: 'stat' },
                            React.createElement('span', { className: 'stat-num' }, '12+'),
                            React.createElement('span', { className: 'stat-label' }, 'Products')
                        ),
                        React.createElement('div', { className: 'stat-divider' }),
                        React.createElement('div', { className: 'stat' },
                            React.createElement('span', { className: 'stat-num' }, '5'),
                            React.createElement('span', { className: 'stat-label' }, 'Categories')
                        ),
                        React.createElement('div', { className: 'stat-divider' }),
                        React.createElement('div', { className: 'stat' },
                            React.createElement('span', { className: 'stat-num' }, '4.7★'),
                            React.createElement('span', { className: 'stat-label' }, 'Avg Rating')
                        )
                    )
                ),
                React.createElement(
                    motion.div, { className: 'hero-visual', initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    React.createElement('div', { className: 'visual-card vc1' },
                        React.createElement('img', { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80', alt: 'Sneakers' })
                    ),
                    React.createElement('div', { className: 'visual-card vc2' },
                        React.createElement('img', { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80', alt: 'Watch' })
                    ),
                    React.createElement('div', { className: 'visual-card vc3' },
                        React.createElement('img', { src: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&q=80', alt: 'Hoodie' })
                    ),
                    React.createElement(motion.div, { className: 'float-badge fb1', animate: { y: [0, -12, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }, '🛒Just Added'),
                    React.createElement(motion.div, { className: 'float-badge fb2', animate: { y: [0, 10, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 } }, '⭐Top Rated')
                )
            )
        ),
        // Features Section
        React.createElement(
            'section', { className: 'features-section' },
            React.createElement(
                'div', { className: 'container' },
                React.createElement(
                    motion.div, { className: 'features-grid', variants: containerVariants, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } },
                    features.map((f, i) =>
                        React.createElement(
                            motion.div, { key: i, className: 'feature-card', variants: itemVariants },
                            React.createElement('div', { className: 'feature-icon' }, f.icon),
                            React.createElement('h3', { className: 'feature-title' }, f.title),
                            React.createElement('p', { className: 'feature-desc' }, f.desc)
                        )
                    )
                )
            )
        ),
        // CTA Section
        React.createElement(
            'section', { className: 'cta-section' },
            React.createElement(
                'div', { className: 'container' },
                React.createElement(
                    motion.div, { className: 'cta-card', initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true } },
                    React.createElement('h2', { className: 'cta-title' }, 'Ready to explore?'),
                    React.createElement('p', { className: 'cta-desc' }, 'Thousands of items, one destination.'),
                    React.createElement(Link, { to: '/products', className: 'btn btn-primary' }, 'Browse All Products')
                )
            )
        ),
        // Footer
        React.createElement(
            'footer', { className: 'footer' },
            React.createElement(
                'div', { className: 'container' },
                React.createElement('span', { className: 'footer-logo' }, '◈NEOCOM'),
                React.createElement('p', null, '©2024 NeoCommerce. All rights reserved.')
            )
        )
    );
}