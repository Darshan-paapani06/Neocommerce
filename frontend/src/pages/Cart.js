import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Cart.css';

export default function Cart() {
    const { cart, total, count, loading, remove, update, clear, placeOrder } = useCart();
    const [ordering, setOrdering] = useState(false);
    const [ordered, setOrdered] = useState(null);

    const handleCheckout = async() => {
        setOrdering(true);
        try {
            const result = await placeOrder();
            setOrdered(result);
            toast.success('Order placed! 🎉');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setOrdering(false);
        }
    };

    if (ordered) {
        return React.createElement(
            'div', { className: 'cart-page page-enter' },
            React.createElement(
                'div', { className: 'container order-success' },
                React.createElement(
                    motion.div, {
                        className: 'success-card',
                        initial: { scale: 0.8, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: { type: 'spring', stiffness: 200 }
                    },
                    React.createElement(
                        motion.div, {
                            className: 'success-icon',
                            animate: { rotate: [0, 10, -10, 5, -5, 0] },
                            transition: { duration: 0.6, delay: 0.3 }
                        },
                        '🎉'
                    ),
                    React.createElement('h2', null, 'Order Placed!'),
                    React.createElement(
                        'p', { className: 'success-sub' },
                        'Order ',
                        React.createElement('strong', null, ordered.orderId),
                        ' confirmed.'
                    ),
                    React.createElement(
                        'p', { className: 'success-eta' },
                        `📦${ordered.estimatedDelivery}`
                    ),
                    React.createElement(Link, { to: '/products', className: 'btn btn-primary' }, 'Continue Shopping')
                )
            )
        );
    }

    return React.createElement(
        'div', { className: 'cart-page page-enter' },
        React.createElement(
            'div', { className: 'container' },
            React.createElement(
                'div', { className: 'cart-header' },
                React.createElement('h1', { className: 'cart-title' }, 'Your Cart'),
                count > 0 &&
                React.createElement(
                    'button', { className: 'btn btn-ghost clear-btn', onClick: clear },
                    'Clear All'
                )
            ),
            loading ?
            React.createElement(
                'div', { style: { display: 'flex', justifyContent: 'center', padding: '80px 0' } },
                React.createElement('div', { className: 'spinner' })
            ) :
            cart.length === 0 ?
            React.createElement(
                motion.div, { className: 'empty-cart', initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                React.createElement('div', { className: 'empty-cart-icon' }, '🛒'),
                React.createElement('h3', null, 'Your cart is empty'),
                React.createElement('p', null, "Looks like you haven't added anything yet."),
                React.createElement(Link, { to: '/products', className: 'btn btn-primary' }, 'Browse Products')
            ) :
            React.createElement(
                'div', { className: 'cart-layout' },
                React.createElement(
                    'div', { className: 'cart-items' },
                    React.createElement(
                        AnimatePresence,
                        null,
                        cart.map(item =>
                            React.createElement(
                                motion.div, {
                                    key: item.productId,
                                    className: 'cart-item',
                                    layout: true,
                                    initial: { opacity: 0, x: -20 },
                                    animate: { opacity: 1, x: 0 },
                                    exit: { opacity: 0, x: 20, height: 0 },
                                    transition: { duration: 0.3 }
                                },
                                React.createElement(
                                    'div', { className: 'item-img-wrap' },
                                    React.createElement('img', {
                                        src: item.product.image,
                                        alt: item.product.name,
                                        className: 'item-img'
                                    })
                                ),
                                React.createElement(
                                    'div', { className: 'item-info' },
                                    React.createElement('span', { className: 'item-category' }, item.product.category),
                                    React.createElement('h3', { className: 'item-name' }, item.product.name),
                                    React.createElement('p', { className: 'item-desc' }, item.product.description)
                                ),
                                React.createElement(
                                    'div', { className: 'item-controls' },
                                    React.createElement(
                                        'div', { className: 'qty-ctrl' },
                                        React.createElement(
                                            'button', {
                                                className: 'qty-btn',
                                                onClick: () => update(item.productId, item.quantity - 1),
                                                disabled: item.quantity <= 1
                                            },
                                            '−'
                                        ),
                                        React.createElement('span', { className: 'qty-val' }, item.quantity),
                                        React.createElement(
                                            'button', {
                                                className: 'qty-btn',
                                                onClick: () => update(item.productId, item.quantity + 1)
                                            },
                                            '+'
                                        )
                                    ),
                                    React.createElement(
                                        'span', { className: 'item-price' },
                                        `$${(item.product.price * item.quantity).toFixed(2)}`
                                    ),
                                    React.createElement(
                                        'button', { className: 'remove-btn', onClick: () => remove(item.productId, item.product.name) },
                                        React.createElement(
                                            'svg', {
                                                width: '16',
                                                height: '16',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '2'
                                            },
                                            React.createElement('polyline', { points: '3 6 5 6 21 6' }),
                                            React.createElement('path', {
                                                d: 'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2'
                                            })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    motion.div, { className: 'order-summary', initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } },
                    React.createElement('h2', { className: 'summary-title' }, 'Order Summary'),
                    React.createElement(
                        'div', { className: 'summary-rows' },
                        React.createElement(
                            'div', { className: 'summary-row' },
                            React.createElement('span', null, `Items(${count})`),
                            React.createElement('span', null, `$${total}`)
                        ),
                        React.createElement(
                            'div', { className: 'summary-row' },
                            React.createElement('span', null, 'Shipping'),
                            React.createElement('span', { className: 'free-tag' }, 'FREE')
                        ),
                        React.createElement(
                            'div', { className: 'summary-row' },
                            React.createElement('span', null, 'Tax(8%)'),
                            React.createElement('span', null, `$${(total * 0.08).toFixed(2)}`)
                        )
                    ),
                    React.createElement(
                        'div', { className: 'summary-total' },
                        React.createElement('span', null, 'Total'),
                        React.createElement('span', { className: 'total-val' }, `$${(total * 1.08).toFixed(2)}`)
                    ),
                    React.createElement(
                        motion.button, {
                            className: 'checkout-btn',
                            onClick: handleCheckout,
                            disabled: ordering,
                            whileTap: { scale: 0.97 },
                            whileHover: { boxShadow: '0 0 40px rgba(108,99,255,0.5)' }
                        },
                        ordering ?
                        React.createElement('span', {
                            className: 'spinner',
                            style: { width: 20, height: 20, borderWidth: 2 }
                        }) :
                        '✦ Place Order'
                    ),
                    React.createElement(Link, { to: '/products', className: 'btn btn-ghost continue-shopping' }, '←Continue Shopping')
                )
            )
        )
    );
}