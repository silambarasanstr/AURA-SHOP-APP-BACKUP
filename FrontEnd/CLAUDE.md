# AURA Shop - Frontend Project

## Project Overview

AURA Shop is a full-stack e-commerce application. This is the React-based frontend built with Vite, Redux Toolkit, and Tailwind CSS.

## Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **ESLint** - Code linting
- **json-server** - Mock API for development

## Project Structure

```
src/
├── app/                 # Redux store & app providers
├── components/          # Reusable React components
├── containers/          # Container components
├── context/             # React Context providers
├── features/            # Redux slices and APIs
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── routes/              # Route definitions
├── services/            # API service layers
├── data/                # Mock data (db.json for json-server)
├── assets/              # Static assets
└── main.jsx             # App entry point
```

## Key Features

- Shopping cart management with Redux
- Product catalog with filtering
- User authentication
- Checkout flow
- Order management
- Newsletter subscription
- Multi-language support via Context
- Theme switching capability
- Online/offline status detection

## Development

### Setup

1. Install dependencies: `npm install` or `yarn install`
2. Copy `.env.example` to `.env` and configure API endpoints
3. Start dev server: `npm run dev`
4. For mock API: `json-server --watch src/data/db.json`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style

- ESLint config with React Hooks support
- Prettier formatting (100 char line width)
- React Refresh enabled for HMR

## Important Notes

- Authentication state managed via Redux authSlice
- Cart state persisted and managed with Redux
- API calls use axios with centralized services
- Protected routes implemented for authenticated pages
- Mock database at `src/data/db.json` for development
