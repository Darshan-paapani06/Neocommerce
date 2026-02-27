import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, removeFromCart, updateCart, clearCart, checkout } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async() => {
        if (!user) {
            setCart([]);
            setTotal(0);
            setCount(0);
            return;
        }
        try {
            setLoading(true);
            const { data } = await getCart();
            setCart(data.cart);
            setTotal(data.total);
            setCount(data.count);
        } catch {
            // handle error silently
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const add = async(productId, name) => {
        try {
            await addToCart(productId);
            await fetchCart();
            toast.success(`${name} added to cart!`, { icon: '🛍️' });
        } catch (err) {
            const errorMessage =
                (err && err.response && err.response.data && err.response.data.error) ||
                'Failed to add item.';
            toast.error(errorMessage);
        }
    };

    const remove = async(productId, name) => {
        try {
            await removeFromCart(productId);
            await fetchCart();
            toast.success(`${name} removed.`, { icon: '🗑️' });
        } catch {
            toast.error('Failed to remove item.');
        }
    };

    const update = async(productId, quantity) => {
        try {
            await updateCart(productId, quantity);
            await fetchCart();
        } catch {
            toast.error('Failed to update cart.');
        }
    };

    const clear = async() => {
        try {
            await clearCart();
            setCart([]);
            setTotal(0);
            setCount(0);
            toast.success('Cart cleared.');
        } catch {
            toast.error('Failed to clear cart.');
        }
    };

    const placeOrder = async() => {
        try {
            const { data } = await checkout();
            setCart([]);
            setTotal(0);
            setCount(0);
            return data;
        } catch (err) {
            const errorMessage =
                (err && err.response && err.response.data && err.response.data.error) ||
                'Checkout failed.';
            throw new Error(errorMessage);
        }
    };

    return React.createElement(
        CartContext.Provider, {
            value: {
                cart,
                total,
                count,
                loading,
                add,
                remove,
                update,
                clear,
                placeOrder,
                fetchCart,
            }
        },
        children
    );
};

export const useCart = () => useContext(CartContext);