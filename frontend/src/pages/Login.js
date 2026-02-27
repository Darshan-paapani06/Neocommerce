import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (user) {
        navigate('/');
        return null;
    }

    const validate = () => {
        const e = {};
        if (!form.email) {
            e.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            e.email = 'Invalid email format';
        }
        if (!form.password) {
            e.password = 'Password is required';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back! 👋');
            navigate('/products');
        } catch (err) {
            let msg = 'Login failed.';
            if (err && err.response && err.response.data && err.response.data.error) {
                msg = err.response.data.error;
            }
            toast.error(msg);
            setErrors({ general: msg });
        } finally {
            setLoading(false);
        }
    };

    return React.createElement(
        'div', { className: 'auth-page page-enter' },
        React.createElement('div', { className: 'auth-glow' }),
        React.createElement(
            'div', { className: 'auth-card-wrap' },
            React.createElement(
                motion.div, {
                    className: 'auth-card',
                    initial: { opacity: 0, y: 30, scale: 0.97 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                },
                React.createElement('div', { className: 'auth-logo' }, '◈ NEOCOM'),
                React.createElement('h1', { className: 'auth-title' }, 'Welcome back'),
                React.createElement('p', { className: 'auth-sub' }, 'Sign in to your account'),
                errors.general && React.createElement('div', { className: 'auth-error' }, errors.general),
                React.createElement(
                    'form', { onSubmit: handleSubmit, className: 'auth-form' },
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Email'),
                        React.createElement('input', {
                            className: `form-input ${errors.email ? 'error' : ''}`,
                            type: 'email',
                            placeholder: 'you@example.com',
                            value: form.email,
                            onChange: (e) => {
                                setForm({...form, email: e.target.value });
                                setErrors({...errors, email: '' });
                            }
                        }),
                        errors.email && React.createElement('span', { className: 'field-error' }, errors.email)
                    ),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Password'),
                        React.createElement('input', {
                            className: `form-input ${errors.password ? 'error' : ''}`,
                            type: 'password',
                            placeholder: '••••••••',
                            value: form.password,
                            onChange: (e) => {
                                setForm({...form, password: e.target.value });
                                setErrors({...errors, password: '' });
                            }
                        }),
                        errors.password && React.createElement('span', { className: 'field-error' }, errors.password)
                    ),
                    React.createElement(
                        motion.button, { type: 'submit', className: 'auth-submit', disabled: loading, whileTap: { scale: 0.97 } },
                        loading ?
                        React.createElement('span', { className: 'spinner', style: { width: 20, height: 20, borderWidth: 2 } }) :
                        'Sign In'
                    )
                ),
                React.createElement(
                    'p', { className: 'auth-switch' },
                    "Don't have an account? ",
                    React.createElement(Link, { to: '/register' }, 'Register')
                )
            )
        )
    );
}