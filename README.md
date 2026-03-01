<img width="612" height="408" alt="image" src="https://github.com/user-attachments/assets/ff943819-1283-4622-8417-c74fa1b1fce5" /># 🛒 NeoCommerce — Modern E-Commerce Platform

<div align="center">

![NeoCommerce Banner](https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=)

**Shop smarter. Buy faster. Live better.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-Darshan--paapani06-181717?style=for-the-badge&logo=github)](https://github.com/Darshan-paapani06/Neocommerce)

[🚀 Live Demo](#) • [📖 Features](#-features) • [🛠 Installation](#-installation) • [🔄 Workflow](#-application-workflow)

</div>

---

## 🌟 What is NeoCommerce?

**NeoCommerce** is a full-stack modern e-commerce web application built with **React** on the frontend and **Node.js + Express** on the backend. It delivers a smooth, fast shopping experience — from browsing products to secure checkout — all powered by a clean REST API and React Context for global state management.

> 📝 Register → 🔐 Login → 🛍️ Browse Products → 🛒 Add to Cart → 💳 Checkout → ✅ Order Done!

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **User Registration** | Create a new account with name, email and password |
| 🔐 **User Login / Logout** | Secure authentication with JWT tokens |
| 🛍️ **Product Listing** | Browse all available products in a responsive grid |
| 🃏 **Product Cards** | Clean card UI with image, name, price, and add-to-cart |
| 🛒 **Cart Management** | Add, remove, and update quantities in real time |
| 💳 **Checkout Flow** | Review cart and proceed to secure payment |
| 🔒 **Auth Context** | Global auth state using React Context API |
| 🛒 **Cart Context** | Global cart state persisted across all pages |
| 🌐 **REST API Service** | Centralized `api.js` for all backend communication |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |
| ⚡ **PWA Support** | Workbox Service Worker for offline caching |

---

## 🎨 Screenshots

<div align="center">

### 🏠 Home Page
![Home](https://media.istockphoto.com/id/2140172947/photo/women-using-laptop-shopping-online-with-cart-icons-with-a-virtual-interface-shipping-global.jpg?s=612x612&w=0&k=20&c=_uRyv3FW3oowPPmo6zd4ImJAWOe9hSc5e5PSuX18Inw=)

### 🛍️ Product Listing
![Products](https://media.istockphoto.com/id/1474764768/photo/smart-warehouse-inventory-management-system-concept.jpg?s=612x612&w=0&k=20&c=S3FqWmAMhvGQkeQH7J5RRDkxBeY-gIHjnEmCp181ubo=)

### 🛒 Cart Page
![Cart](https://media.istockphoto.com/id/2044735585/vector/online-grocery-shopping-set-shopping-basket-bag-and-trolley-cart-full-of-grocery-products.jpg?s=612x612&w=0&k=20&c=u8HTjTwyIycbijVcqbCY5jIHxWDF6QHuTdnTFo49NIc=)

### 🔐 Login / Register
![Auth](https://media.istockphoto.com/id/2193962032/photo/businessman-and-screen-login-username-and-password-identity-or-sign-up-register-of-cyber.jpg?s=612x612&w=0&k=20&c=sbnCO-UwiXHmsyMarjToZ7JmM4nqUnGZ6giK9Jj94a0=)

</div>

---

## 🗂 Project Structure

```
NeoCommerce/
│
├── 📁 public/
│   └── index.html                    # Root HTML entry point
│
├── 📁 src/
│   │
│   ├── 📁 components/                # Reusable UI components
│   │   ├── Navbar.js                 # Top nav (logo, links, cart icon, auth buttons)
│   │   ├── Navbar.css                # Navbar styles
│   │   ├── ProductCard.js            # Product card (image, name, price, add-to-cart)
│   │   └── ProductCard.css           # Product card styles
│   │
│   ├── 📁 context/                   # Global React state management
│   │   ├── AuthContext.js            # Auth state (user, login, logout, register)
│   │   └── CartContext.js            # Cart state (items, add, remove, qty, total)
│   │
│   ├── 📁 pages/                     # Full page route components
│   │   ├── Home.js                   # Landing page — hero + featured products
│   │   ├── Home.css                  # Home page styles
│   │   ├── Products.js               # Full product grid from API
│   │   ├── Products.css              # Products page styles
│   │   ├── Cart.js                   # Cart page — items, qty control, checkout
│   │   ├── Cart.css                  # Cart page styles
│   │   ├── Login.js                  # Login form (email + password)
│   │   ├── Register.js               # Register form (name, email, password)
│   │   └── Auth.css                  # Shared auth styles
│   │
│   ├── 📁 services/
│   │   └── api.js                    # All API calls (auth, products, cart, orders)
│   │
│   ├── App.js                        # Routes + Context Providers wrapper
│   ├── index.js                      # React DOM render entry point
│   └── index.css                     # Global CSS reset & base styles
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🔄 Application Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER OPENS APP                               │
│                NeoCommerce loads at localhost:3000                  │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         HOME PAGE  /                                │
│                                                                     │
│         🖼️  Hero Banner  +  Featured Products Preview              │
│                                                                     │
│            [ Login ]    [ Register ]    [ Shop Now ]                │
└────────────┬────────────────────────────────┬───────────────────────┘
             │                                │
        New User                        Existing User
             │                                │
             ▼                                ▼
┌────────────────────────┐     ┌──────────────────────────────────────┐
│    REGISTER  /register │     │          LOGIN  /login               │
│                        │     │                                      │
│  Name _______________  │     │  Email ___________________________   │
│  Email ______________  │     │  Password ________________________   │
│  Password ___________  │     │                                      │
│                        │     │  POST /api/auth/login                │
│  POST /api/auth/       │     │  ← JWT Token received                │
│       register         │     │  ← Saved to localStorage             │
│                        │     │  ← AuthContext.user updated          │
└────────────┬───────────┘     └────────────────┬─────────────────────┘
             │ ✅ Account created                │ ✅ Authenticated
             └──────────────────┬────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PRODUCTS PAGE  /products                       │
│                                                                     │
│    GET /api/products  →  Renders product grid                       │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ 🖼️ Img  │  │ 🖼️ Img  │  │ 🖼️ Img  │  │ 🖼️ Img  │           │
│  │ Name    │  │ Name    │  │ Name    │  │ Name    │           │
│  │ ₹ Price │  │ ₹ Price │  │ ₹ Price │  │ ₹ Price │           │
│  │[Add🛒] │  │[Add🛒] │  │[Add🛒] │  │[Add🛒] │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                     │
│   Click "Add to Cart"  →  CartContext.addItem(product)              │
│   Navbar cart icon updates count in real time 🛒                    │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CART PAGE  /cart                             │
│                                                                     │
│   CartContext  →  Read all current cart items                       │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  🖼️  Product Name A      [ − ]  2  [ + ]   🗑️   ₹ 1,198 │     │
│  ├───────────────────────────────────────────────────────────┤     │
│  │  🖼️  Product Name B      [ − ]  1  [ + ]   🗑️   ₹   599 │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│   Subtotal: ₹ 1,797              [ Proceed to Checkout → ]         │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CHECKOUT & PAYMENT                                │
│                                                                     │
│   POST /api/orders/checkout  →  Send cart to backend                │
│   Payment Gateway processes payment                                  │
│   ✅ Order confirmed                                                 │
│   Cart cleared  →  CartContext.clearCart()                          │
│   Redirect to Home with success message                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 REST API Endpoints

```
src/services/api.js
       │
       ├── 🔐 AUTH
       │     ├── POST  /api/auth/register    → Register new user
       │     └── POST  /api/auth/login       → Login + receive JWT
       │
       ├── 🛍️  PRODUCTS
       │     ├── GET   /api/products         → Get all products
       │     └── GET   /api/products/:id     → Get single product
       │
       ├── 🛒 CART
       │     ├── GET   /api/cart             → Get user's cart
       │     ├── POST  /api/cart/add         → Add item to cart
       │     ├── PUT   /api/cart/update      → Update item quantity
       │     └── DEL   /api/cart/remove/:id  → Remove item from cart
       │
       └── 📦 ORDERS
             └── POST  /api/orders/checkout  → Place order & payment
```

---

## ⚛️ React Context Architecture

```
App.js
  │
  ├── <AuthContext.Provider>            # Wraps entire app
  │       │
  │       ├── user                      # Current logged-in user object
  │       ├── token                     # JWT from localStorage
  │       ├── login(email, password)    # POST /api/auth/login
  │       ├── register(name,email,pass) # POST /api/auth/register
  │       └── logout()                 # Clears user + token
  │
  └── <CartContext.Provider>            # Wraps entire app
          │
          ├── cartItems[]               # Array of { product, qty }
          ├── addItem(product)          # Add product or increment qty
          ├── removeItem(id)            # Remove product by ID
          ├── updateQty(id, qty)        # Set specific quantity
          ├── clearCart()              # Empty cart (post-checkout)
          └── cartTotal                # Auto-computed ₹ total
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 | UI & Component rendering |
| **State** | React Context API | Global auth & cart state |
| **Routing** | React Router DOM | SPA page navigation |
| **Backend** | Node.js + Express | REST API server |
| **API Layer** | Fetch / Axios (api.js) | Frontend ↔ Backend calls |
| **Auth** | JWT Tokens | Secure session management |
| **Styling** | Custom CSS | Per-page component styles |
| **PWA** | Workbox Service Worker | Offline caching & performance |

---

## 🚀 Installation

### Prerequisites
- Node.js >= 14
- npm >= 6

### 1. Clone the repository
```bash
git clone https://github.com/Darshan-paapani06/Neocommerce.git
cd Neocommerce
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create `.env` in the root:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_PAYMENT_KEY=your_payment_gateway_key
```

### 4. Start the development server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 5. Start backend server (if separate)
```bash
cd server
npm install
node index.js
# Runs on http://localhost:5000
```

---

## 📄 Pages Reference

| Page | Route | Access | Description |
|---|---|---|---|
| 🏠 Home | `/` | Public | Hero section + featured products |
| 🛍️ Products | `/products` | Public | Full product listing grid |
| 🛒 Cart | `/cart` | 🔒 Protected | Cart items, qty control, total |
| 💳 Checkout | `/checkout` | 🔒 Protected | Payment & order placement |
| 🔐 Login | `/login` | Public | User login form |
| 📝 Register | `/register` | Public | New user registration |

---

## 📦 Available Scripts

```bash
npm start          # Run development server → localhost:3000
npm run build      # Build optimized production bundle → /build
npm test           # Run test suite
npm run eject      # Eject CRA config (irreversible ⚠️)
```

---

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

---

## 🔭 Future Enhancements

- [ ] 🔍 Product Search & Category Filters
- [ ] ❤️ Wishlist / Save for Later
- [ ] ⭐ Product Reviews & Star Ratings
- [ ] 👤 User Profile & Edit Account
- [ ] 📦 Order History & Tracking
- [ ] 🛠️ Admin Dashboard (manage products, orders)
- [ ] 🌙 Dark / Light Mode Toggle
- [ ] 📧 Email Order Confirmation

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m "Add AmazingFeature"
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request 🚀

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Darshan Paapani**

[![GitHub](https://img.shields.io/badge/GitHub-Darshan--paapani06-181717?style=for-the-badge&logo=github)](https://github.com/Darshan-paapani06)

---

<div align="center">

Made with ❤️ and ☕ by Darshan Paapani

⭐ **Star this repo if you found it useful!** ⭐

</div>
