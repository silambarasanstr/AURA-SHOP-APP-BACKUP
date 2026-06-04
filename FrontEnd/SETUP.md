# AURA Shop Frontend - Setup & Run Guide

## Quick Start (With Mock Data)

### Step 1: Install Dependencies

```bash
cd FrontEnd
npm install
# or
yarn install
```

### Step 2: Start json-server (Mock API)

Open a new terminal and run:

```bash
npx json-server --watch src/data/db.json --port 3000
```

This will start a mock API server on `http://localhost:3000` with the data from `src/data/db.json`

### Step 3: Start Development Server

In another terminal, run:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## How It Works

### Mock Data Features

The app includes **8 sample products** with:

- ✅ Real Unsplash product images
- ✅ Categories (Electronics, Fashion, Home & Kitchen)
- ✅ Pricing and ratings
- ✅ Customer reviews

### Service Layer with Fallback

All API services (`productService.js`, `categoryService.js`, `orderService.js`) have **automatic fallback logic**:

1. **First**: Tries to connect to backend API (`http://localhost:5000/api/*`)
2. **Second**: Falls back to json-server (`http://localhost:3000/*`)
3. **Third**: Returns default data or error message

**Example flow for getting products:**

```
Try: http://localhost:5000/api/products
↓ (if fails)
Try: http://localhost:3000/products
↓ (if fails)
Return error message
```

---

## Available Mock Data

### Products (8 items)

- Wireless Headphones
- Smart Watch
- USB-C Cable
- Gaming Mouse
- Mechanical Keyboard
- Portable Speaker
- Wireless Charger
- 4K Webcam

### Categories (3 items)

- Electronics
- Fashion
- Home & Kitchen

### Sample Orders

Pre-configured order for testing

---

## Testing Scenarios

### 1. Browse Products

- Navigate to `/products`
- See all 8 products with images
- Search and filter by category

### 2. View Product Details

- Click any product card
- See full details, rating, reviews
- Add to cart functionality

### 3. Shopping Cart

- Add products to cart
- Modify quantities
- View total price

### 4. Checkout

- Fill in delivery details
- Complete order (stores in mock data)

### 5. View Orders

- Check order history
- Delete orders

---

## Environment Variables

Create a `.env` file (or copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_ENV=development
```

Optional: Override API URL for different environments

---

## Switching to Backend API

When you have the backend running on `http://localhost:5000`:

1. Ensure backend is running
2. Services will automatically detect and use backend API
3. No code changes needed!

---

## Troubleshooting

### ❌ Images not loading

- Check json-server is running on port 3000
- Verify images are valid URLs (Unsplash links should work)
- Check browser console for errors

### ❌ Products not showing

- Start json-server: `npx json-server --watch src/data/db.json --port 3000`
- Verify `src/data/db.json` has data
- Check Network tab in DevTools

### ❌ Port 3000 already in use

```bash
# Use a different port
npx json-server --watch src/data/db.json --port 4000
```

Then update service files to use port 4000

### ❌ Port 5173 already in use

```bash
npm run dev -- --port 3001
```

---

## Development Tips

### Hot Reload

- Changes to React components auto-reload
- Changes to `db.json` auto-refresh in json-server

### Browser DevTools

- React DevTools extension for component inspection
- Redux DevTools for state debugging
- Network tab to inspect API calls

### Check Active Connections

Open browser DevTools → Network tab and navigate the app to see which API is being used

---

## Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder

Preview locally:

```bash
npm run preview
```

---

## File Structure Reference

```
FrontEnd/
├── src/
│   ├── data/
│   │   └── db.json              ← Mock data for json-server
│   ├── services/
│   │   ├── productService.js    ← Product API (with fallback)
│   │   ├── categoryService.js   ← Category API (with fallback)
│   │   └── orderService.js      ← Order API (with fallback)
│   ├── pages/                   ← Page components
│   ├── components/              ← Reusable components
│   └── containers/              ← Smart components
└── .env.example                 ← Environment variables template
```

---

## Next Steps

1. ✅ Start json-server
2. ✅ Start dev server
3. ✅ Browse products
4. ✅ Test shopping flow
5. 🔄 Connect to backend when ready

Enjoy! 🚀
