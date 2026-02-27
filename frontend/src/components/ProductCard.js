import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
    const { user } = useAuth();
    const { add } = useCart();
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const stars = Array.from({ length: 5 }, (_, i) =>
        i < Math.round(product.rating) ? '★' : '☆'
    ).join('');

    const handleAdd = async(e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        setAdding(true);
        await add(product.id, product.name);
        setTimeout(() => setAdding(false), 800);
    };

    return React.createElement(
        motion.div, {
            className: 'product-card',
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
            whileHover: { y: -6 }
        },
        React.createElement(
            'div', { className: 'product-img-wrap' }, !imgLoaded && React.createElement('div', { className: 'img-skeleton' }),
            React.createElement('img', {
                src: product.image,
                alt: product.name,
                className: `product-img ${imgLoaded ? 'loaded' : ''}`,
                onLoad: () => setImgLoaded(true)
            }),
            React.createElement(
                'div', { className: 'product-overlay' },
                React.createElement('span', { className: 'product-category' }, product.category)
            ),
            React.createElement(
                'div', { className: 'product-rating-badge' },
                React.createElement('span', { className: 'stars' }, stars),
                React.createElement('span', null, product.rating)
            )
        ),
        React.createElement(
            'div', { className: 'product-body' },
            React.createElement('h3', { className: 'product-name' }, product.name),
            React.createElement('p', { className: 'product-desc' }, product.description),
            React.createElement(
                'div', { className: 'product-footer' },
                React.createElement(
                    'div', { className: 'product-price' },
                    React.createElement('span', { className: 'price-label' }, '$'),
                    React.createElement('span', { className: 'price-value' }, product.price.toFixed(2))
                ),
                React.createElement(
                    motion.button, {
                        className: `add-btn ${adding ? 'adding' : ''}`,
                        onClick: handleAdd,
                        disabled: adding,
                        whileTap: { scale: 0.92 }
                    },
                    adding ?
                    React.createElement(
                        motion.span, { initial: { scale: 0 }, animate: { scale: 1 } },
                        '✓'
                    ) :
                    React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            'svg', {
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2.2'
                            },
                            React.createElement('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
                            React.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
                        ),
                        'Add'
                    )
                )
            ),
            product.stock <= 15 &&
            React.createElement(
                'p', { className: 'stock-warning' },
                `⚡Only ${product.stock} left`
            )
        )
    );
}