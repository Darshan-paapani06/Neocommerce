import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { count } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return React.createElement(
        motion.nav, {
            className: `navbar ${scrolled ? 'scrolled' : ''}`,
            initial: { y: -80, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
        React.createElement(
            'div', { className: 'nav-inner' },
            // Logo
            React.createElement(
                Link, { to: '/', className: 'nav-logo' },
                React.createElement('span', { className: 'logo-icon' }, '◈'),
                React.createElement(
                    'span', { className: 'logo-text' },
                    'NEO',
                    React.createElement('span', null, 'COM')
                )
            ),
            // Desktop Links
            React.createElement(
                'div', { className: 'nav-links' },
                React.createElement(
                    Link, {
                        to: '/',
                        className: `nav-link ${location.pathname === '/' ? 'active' : ''}`
                    },
                    'Home'
                ),
                React.createElement(
                    Link, {
                        to: '/products',
                        className: `nav-link ${location.pathname === '/products' ? 'active' : ''}`
                    },
                    'Shop'
                )
            ),
            // Actions
            React.createElement(
                'div', { className: 'nav-actions' },
                user ?
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'span', { className: 'nav-user' },
                        'Hi, ',
                        user.name.split(' ')[0]
                    ),
                    React.createElement(
                        Link, { to: '/cart', className: 'nav-cart' },
                        React.createElement(
                            'svg', {
                                width: '22',
                                height: '22',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '1.8'
                            },
                            React.createElement('path', { d: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' }),
                            React.createElement('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                            React.createElement('path', { d: 'M16 10a4 4 0 01-8 0' })
                        ),
                        React.createElement(
                            AnimatePresence,
                            null,
                            count > 0 &&
                            React.createElement(
                                motion.span, {
                                    className: 'cart-badge',
                                    initial: { scale: 0 },
                                    animate: { scale: 1 },
                                    exit: { scale: 0 },
                                    transition: { type: 'spring', stiffness: 500 }
                                },
                                count
                            )
                        )
                    ),
                    React.createElement(
                        'button', { className: 'btn btn-ghost nav-logout', onClick: handleLogout },
                        'Logout'
                    )
                ) :
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Link, { to: '/login', className: 'btn btn-ghost' }, 'Login'),
                    React.createElement(Link, { to: '/register', className: 'btn btn-primary' }, 'Register')
                ),
                // Mobile toggle
                React.createElement(
                    'button', { className: 'mobile-toggle', onClick: () => setMenuOpen(!menuOpen) },
                    React.createElement('span', { className: menuOpen ? 'open' : '' }),
                    React.createElement('span', { className: menuOpen ? 'open' : '' })
                )
            )
        ),
        // Mobile Menu
        React.createElement(
            AnimatePresence,
            null,
            menuOpen &&
            React.createElement(
                motion.div, {
                    className: 'mobile-menu',
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: 'auto' },
                    exit: { opacity: 0, height: 0 },
                    transition: { duration: 0.3 }
                },
                React.createElement(Link, { to: '/', className: 'mobile-link' }, 'Home'),
                React.createElement(Link, { to: '/products', className: 'mobile-link' }, 'Shop'),
                user ?
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Link, { to: '/cart', className: 'mobile-link' }, `Cart(${count})`),
                    React.createElement(
                        'button', { className: 'mobile-link', onClick: handleLogout },
                        'Logout'
                    )
                ) :
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Link, { to: '/login', className: 'mobile-link' }, 'Login'),
                    React.createElement(Link, { to: '/register', className: 'mobile-link' }, 'Register')
                )
            )
        )
    );
}