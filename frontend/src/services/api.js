import axios from 'axios';

const API = axios.create({ baseURL: '/api' });
API.interceptors.request.use(config => {
    const token = localStorage.getItem('neo_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get('/products/categories/all');
// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (productId, qty = 1) => API.post('/cart/add', { productId, quantity: qty });
export const updateCart = (productId, qty) => API.put(`/cart/update/${productId}`, { quantity: qty });
export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`);
export const clearCart = () => API.delete('/cart/clear');
export const checkout = () => API.post('/checkout');

export default API;