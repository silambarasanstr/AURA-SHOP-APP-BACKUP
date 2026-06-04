# AURA Shop - Frontend

A modern e-commerce frontend built with React 19, Vite, Redux Toolkit, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL if needed

### Development

Start the development server:

```bash
npm run dev
```

For mock API development (optional):

```bash
npm install -g json-server
json-server --watch src/data/db.json
```

The app will be available at `http://localhost:5173` (or your configured port)

## Available Commands

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run ESLint to check code quality  |

## Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.js           # Redux store setup
│   ├── rootReducer.js     # Combined reducers
│   └── AppProviders.jsx   # App context/redux providers
├── components/            # Reusable UI components
│   ├── common/           # Shared components (Button, Banner, etc.)
│   └── layout/           # Layout components (Header, Footer, etc.)
├── containers/           # Container/smart components
├── pages/                # Page components
├── routes/               # Route configuration
├── services/             # API service modules
├── features/             # Redux slices (auth, cart, etc.)
├── hooks/                # Custom React hooks
├── context/              # React Context providers
├── data/                 # Mock data files
└── assets/               # Static assets
```

## Features

✨ **Shopping Cart** - Add/remove items, manage quantities  
✨ **Product Catalog** - Browse and filter products  
✨ **User Authentication** - Login/logout functionality  
✨ **Checkout** - Complete purchase flow  
✨ **Order History** - View past orders  
✨ **Newsletter** - Email subscription  
✨ **Multi-language** - i18n support  
✨ **Dark/Light Theme** - Theme switching  
✨ **Offline Support** - Online status detection

## Technology Stack

- **React 19.2** - UI library
- **Vite 7.3** - Lightning-fast build tool
- **Redux Toolkit 2.11** - State management
- **React Router 7.13** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS
- **Axios 1.13** - HTTP client
- **ESLint 9.39** - Code linting
- **PostCSS** - CSS processing

## Configuration Files

- **vite.config.js** - Vite configuration
- **tailwind.config.js** - Tailwind CSS theme
- **postcss.config.js** - PostCSS plugins
- **eslint.config.js** - ESLint rules
- **.prettierrc** - Code formatting rules
- **.gitignore** - Git ignored files

## Environment Variables

Create a `.env` file (see `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_ENV=development
```

## Code Quality

- **ESLint** - Enforces coding standards and React best practices
- **Prettier** - Automatic code formatting (100 char line width)
- **React Hooks Linting** - Detects missing dependencies
- **React Refresh** - Fast HMR without full page reload

## Performance

- **Code Splitting** - Automatic via Vite and React Router
- **Lazy Loading** - Route-based code splitting
- **Tree Shaking** - Unused code elimination
- **Fast Refresh** - Instant UI updates during development

## Styling

Uses Tailwind CSS with custom configuration:

- Responsive design utilities
- Dark mode support (via ThemeContext)
- Custom color schemes
- Pre-configured spacing and typography

## Authentication Flow

1. User logs in via auth service
2. Credentials validated by backend
3. Auth token stored in Redux state
4. Protected routes check auth state
5. Unauthenticated users redirected to login

## API Integration

API calls are centralized in `src/services/`:

- `api.js` - Axios instance with base config
- `authAPI.js` - Authentication endpoints
- `productService.js` - Product endpoints
- `categoryService.js` - Category endpoints
- `orderService.js` - Order endpoints

All services use the configured API base URL from environment variables.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Port already in use:**

```bash
npm run dev -- --port 3000
```

**Clear cache and reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**HMR not working:**
Add to `.env`:

```
VITE_HMR_HOST=localhost
VITE_HMR_PORT=5173
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit with clear messages
5. Push and create a pull request

## Support

For issues or questions, check:

- Backend documentation in `../BackEnd`
- Redux DevTools (install browser extension)
- Network tab in browser DevTools for API debugging
