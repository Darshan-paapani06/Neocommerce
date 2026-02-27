import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
    const { register, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (user) {
        navigate('/');
        return null;
    }

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Minimum 6 characters';
        if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            toast.success('Account created! Welcome 🎉');
            navigate('/products');
        } catch (err) {
            let msg = 'Registration failed.';
            if (err && err.response && err.response.data && err.response.data.error) {
                msg = err.response.data.error;
            }
            toast.error(msg);
            setErrors({ general: msg });
        } finally {
            setLoading(false);
        }
    };

    const update = (field, val) => {
        setForm({...form, [field]: val });
        setErrors({...errors, [field]: '' });
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
                React.createElement('div', { className: 'auth-logo' }, '◈NEOCOM'),
                React.createElement('h1', { className: 'auth-title' }, 'Create account'),
                React.createElement('p', { className: 'auth-sub' }, 'Join the future of shopping'),
                errors.general && React.createElement('div', { className: 'auth-error' }, errors.general),
                React.createElement(
                    'form', { onSubmit: handleSubmit, className: 'auth-form' },
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Full Name'),
                        React.createElement('input', {
                            className: `form-input ${errors.name ? 'error' : ''}`,
                            type: 'text',
                            placeholder: 'Alex Johnson',
                            value: form.name,
                            onChange: (e) => update('name', e.target.value)
                        }),
                        errors.name && React.createElement('span', { className: 'field-error' }, errors.name)
                    ),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Email'),
                        React.createElement('input', {
                            className: `form-input ${errors.email ? 'error' : ''}`,
                            type: 'email',
                            placeholder: 'you@example.com',
                            value: form.email,
                            onChange: (e) => update('email', e.target.value)
                        }),
                        errors.email && React.createElement('span', { className: 'field-error' }, errors.email)
                    ),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Password'),
                        React.createElement('input', {
                            className: `form-input ${errors.password ? 'error' : ''}`,
                            type: 'password',
                            placeholder: 'Min 6 characters',
                            value: form.password,
                            onChange: (e) => update('password', e.target.value)
                        }),
                        errors.password && React.createElement('span', { className: 'field-error' }, errors.password)
                    ),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Confirm Password'),
                        React.createElement('input', {
                            className: `form-input ${errors.confirm ? 'error' : ''}`,
                            type: 'password',
                            placeholder: 'Repeat password',
                            value: form.confirm,
                            onChange: (e) => update('confirm', e.target.value)
                        }),
                        errors.confirm && React.createElement('span', { className: 'field-error' }, errors.confirm)
                    ),
                    React.createElement(
                        motion.button, { type: 'submit', className: 'auth-submit', disabled: loading, whileTap: { scale: 0.97 } },
                        loading ?
                        React.createElement('span', { className: 'spinner', style: { width: 20, height: 20, borderWidth: 2 } }) :
                        'Create Account'
                    )
                ),
                React.createElement(
                    'p', { className: 'auth-switch' },
                    'Already have an account? ',
                    React.createElement(Link, { to: '/login' }, 'Sign in')
                )
            )
        )
    );
}