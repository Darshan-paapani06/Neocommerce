    import React from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from 'react-hot-toast';

    import { AuthProvider, useAuth } from './context/AuthContext';
    import { CartProvider } from './context/CartContext';

    import Navbar from './components/Navbar';
    import Home from './pages/Home';
    import Products from './pages/Products';
    import Cart from './pages/Cart';
    import Login from './pages/Login';
    import Register from './pages/Register';

    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        const { user, loading } = useAuth();

        if (loading) {
            return (
                React.createElement('div', {
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }
                    },
                    React.createElement('div', { className: 'spinner' })
                )
            );
        }

        return user ?
            children :
            React.createElement(Navigate, { to: '/login', replace: true });
    };

    // App Content
    const AppContent = () => {
        return (
            React.createElement(BrowserRouter, null,
                React.createElement(Navbar, null),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: '/', element: React.createElement(Home) }),
                    React.createElement(Route, { path: '/products', element: React.createElement(Products) }),
                    React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
                    React.createElement(Route, { path: '/register', element: React.createElement(Register) }),
                    React.createElement(Route, {
                        path: '/cart',
                        element: React.createElement(ProtectedRoute, null, React.createElement(Cart))
                    })
                ),
                React.createElement(Toaster, {
                    position: 'bottom-right',
                    toastOptions: {
                        style: {
                            background: '#1a1a2e',
                            color: '#f0f0fa',
                            border: '1px solid rgba(255,255,255,0.07)',
                            fontFamily: 'DM Sans, sans-serif'
                        },
                        duration: 2500
                    }
                })
            )
        );
    };

    // Root App Wrapper
    export default function App() {
        return (
            React.createElement(AuthProvider, null,
                React.createElement(CartProvider, null,
                    React.createElement(AppContent)
                )
            )
        );
    }