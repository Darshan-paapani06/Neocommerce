const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'neocommerce_secret_key_2024';

app.use(cors());
app.use(express.json());

// ─── In-Memory Data Store ─────────────────────────────────────────────────────
let users = [];
let carts = {}; // { userId: [{ productId, quantity }] }

// ─── Static Products ──────────────────────────────────────────────────────────
const products = [{
        id: 1,
        name: 'Quantum Hoodie',
        price: 89.99,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
        description: 'Premium oversized hoodie with quantum-inspired geometric print.',
        rating: 4.8,
        stock: 42
    },
    {
        id: 2,
        name: 'Nexus Sneakers',
        price: 149.99,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        description: 'Futuristic low-profile sneakers with reactive foam sole.',
        rating: 4.9,
        stock: 18
    },
    {
        id: 3,
        name: 'Void Backpack',
        price: 119.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
        description: 'Minimalist 30L backpack with hidden compartments and USB port.',
        rating: 4.7,
        stock: 25
    },
    {
        id: 4,
        name: 'Aurora Sunglasses',
        price: 79.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
        description: 'Polarized lens with aurora-tinted frames. UV400 protection.',
        rating: 4.6,
        stock: 60
    },
    {
        id: 5,
        name: 'Cipher Watch',
        price: 299.99,
        category: 'Wearables',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        description: 'Smart analog watch with encrypted NFC payments and health tracking.',
        rating: 4.9,
        stock: 10
    },
    {
        id: 6,
        name: 'Phantom Tee',
        price: 39.99,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
        description: 'Ultra-soft pima cotton tee with ghost-weave texture.',
        rating: 4.5,
        stock: 100
    },
    {
        id: 7,
        name: 'Prism Cap',
        price: 34.99,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80',
        description: 'Structured 6-panel cap with iridescent brim.',
        rating: 4.4,
        stock: 55
    },
    {
        id: 8,
        name: 'Echo Earbuds',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
        description: 'True wireless earbuds with adaptive noise cancellation.',
        rating: 4.8,
        stock: 30
    },
    {
        id: 9,
        name: 'Vortex Jacket',
        price: 219.99,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        description: 'Windproof shell jacket with vortex-woven lining.',
        rating: 4.7,
        stock: 20
    },
    {
        id: 10,
        name: 'Flux Belt',
        price: 49.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80',
        description: 'Full-grain leather belt with magnetic flux buckle.',
        rating: 4.3,
        stock: 75
    },
    {
        id: 11,
        name: 'Signal Wallet',
        price: 59.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80',
        description: 'RFID-blocking slim wallet with carbon fiber inlay.',
        rating: 4.6,
        stock: 88
    },
    {
        id: 12,
        name: 'Orbit Sweatpants',
        price: 69.99,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80',
        description: 'Tapered lounge pants with orbital stripe detail.',
        rating: 4.5,
        stock: 45
    }
];


// ─────────────────────────────────────────
// JWT Authentication Middleware
// ─────────────────────────────────────────
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token.'
        });
    }
};
// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ error: 'All fields are required.' });
        if (users.find(u => u.email === email))
            return res.status(409).json({ error: 'Email already registered.' });
        if (password.length < 6)
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };
        users.push(user);
        carts[user.id] = [];

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email },
            JWT_SECRET, { expiresIn: '7d' }
        );
        res.status(201).json({
            message: 'Registration successful!',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

app.post('/api/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email and password are required.' });
        const user = users.find(u => u.email === email);
        if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
        if (!carts[user.id]) carts[user.id] = [];
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email },
            JWT_SECRET, { expiresIn: '7d' }
        );
        res.json({
            message: 'Login successful!',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login.' });
    }
});

app.get('/api/auth/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

// ─── Product Routes ───────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
    const { category, search, sort } = req.query;
    let filtered = [...products];
    if (category && category !== 'All')
        filtered = filtered.filter(p => p.category === category);
    if (search)
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    res.json({ products: filtered, total: filtered.length });
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product });
});

app.get('/api/products/categories/all', (req, res) => {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    res.json({ categories });
});
// ─── Cart Routes ──────────────────────────────────────────────────────────────
app.get('/api/cart', authenticate, (req, res) => {
    const userCart = carts[req.user.id] || [];
    const cartWithDetails = userCart
        .map(item => {
            const product = products.find(p => p.id === item.productId);
            return {...item, product };
        })
        .filter(item => item.product);
    const total = cartWithDetails.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );
    const count = cartWithDetails.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ cart: cartWithDetails, total: parseFloat(total.toFixed(2)), count });
});

app.post('/api/cart/add', authenticate, (req, res) => {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'Product ID is required.' });
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    if (!carts[req.user.id]) carts[req.user.id] = [];
    const existing = carts[req.user.id].find(item => item.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        carts[req.user.id].push({ productId, quantity });
    }
    res.json({ message: `${product.name} added to cart!`, cart: carts[req.user.id] });
});

app.put('/api/cart/update/:productId', authenticate, (req, res) => {
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    if (!carts[req.user.id]) return res.status(404).json({ error: 'Cart not found.' });
    const item = carts[req.user.id].find(i => i.productId === productId);
    if (!item) return res.status(404).json({ error: 'Item not in cart.' });
    if (quantity <= 0) {
        carts[req.user.id] = carts[req.user.id].filter(i => i.productId !== productId);
        return res.json({ message: 'Item removed from cart.' });
    }
    item.quantity = quantity;
    res.json({ message: 'Cart updated.', cart: carts[req.user.id] });
});

app.delete('/api/cart/remove/:productId', authenticate, (req, res) => {
    const productId = parseInt(req.params.productId);
    if (!carts[req.user.id]) return res.status(404).json({ error: 'Cart not found.' });
    const before = carts[req.user.id].length;
    carts[req.user.id] = carts[req.user.id].filter(i => i.productId !== productId);
    if (carts[req.user.id].length === before)
        return res.status(404).json({ error: 'Item not found in cart.' });
    res.json({ message: 'Item removed from cart.' });
});

app.delete('/api/cart/clear', authenticate, (req, res) => {
    carts[req.user.id] = [];
    res.json({ message: 'Cart cleared.' });
});

app.post('/api/checkout', authenticate, (req, res) => {
    const userCart = carts[req.user.id] || [];
    if (userCart.length === 0)
        return res.status(400).json({ error: 'Cart is empty.' });
    const orderId = 'NEO-' + Date.now();
    carts[req.user.id] = [];
    res.json({
        message: 'Order placed successfully!',
        orderId,
        estimatedDelivery: '3-5 business days'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'NeoCommerce API running 🚀', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 NeoCommerce Backend → http://localhost:${PORT}`);
    console.log(`📦 ${products.length} products loaded`);
    console.log(`🔐 JWT Authentication enabled\n`);
});