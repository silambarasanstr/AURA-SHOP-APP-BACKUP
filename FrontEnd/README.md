# 🛍️ Aura Shop App

A modern and responsive E-commerce web application built with the MERN Stack. It provides a seamless shopping experience with secure authentication, product browsing, cart management, and responsive design.

---

## 🚀 Live Demo

Frontend: https://your-frontend-url.vercel.app

Backend API: https://your-backend-url.onrender.com

---

## 📸 Screenshots

> Add screenshots inside a `screenshots` folder.

| Home | Product Details |
|------|-----------------|
| ![](screenshots/home.png) | ![](screenshots/product-details.png) |

| Cart | Login |
|------|-------|
| ![](screenshots/cart.png) | ![](screenshots/login.png) |

---

# ✨ Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Product Listing
- Product Details
- Search Products
- Shopping Cart
- Add to Cart
- Remove from Cart
- Update Quantity
- Responsive UI
- Toast Notifications
- Loading Spinner
- Environment Variables

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📂 Folder Structure

```
AURA-SHOP-APP
│
├── FrontEnd
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── BackEnd
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/AURA-SHOP-APP.git
```

---

## Install Frontend

```bash
cd FrontEnd

yarn
```

---

## Install Backend

```bash
cd BackEnd

yarn
```

---

# 🌍 Environment Variables

## Frontend

### .env.development

```env
VITE_API_URL=http://localhost:5000/api
```

### .env.production

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Backend

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
```

---

# ▶️ Run Project

Backend

```bash
yarn dev
```

Frontend

```bash
yarn dev
```

---

# 📦 Production Build

```bash
yarn build
```

Preview

```bash
yarn preview
```

---

# 📡 REST APIs

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Products

```
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

## Cart

```
GET /api/cart
POST /api/cart
DELETE /api/cart/:id
```

---

# 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 👨‍💻 Author

**Silambarasan**

Frontend Developer

---

⭐ If you like this project, don't forget to give it a star!