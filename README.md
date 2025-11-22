# PhoneSeller - React Application

A modern React-based e-commerce application for a phone store, converted from a static HTML/PHP website.

## Features

- **Home Page**: Featured products with search functionality
- **Product Catalog**: Browse and add products to cart
- **Shopping Cart**: Manage cart items with real-time updates
- **About Us**: Information about the store
- **Services**: Store services information
- **Login/Signup**: User authentication UI (frontend-only demo)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/       # Reusable components (Navbar)
├── pages/           # Page components (Home, About, Cart, etc.)
├── context/         # React Context (CartContext)
├── data/            # Mock data (products)
└── App.js           # Main app component with routing
```

## Technologies Used

- React 18
- React Router DOM
- CSS3
- Font Awesome Icons

## Notes

- This is a frontend-only application (no backend/database)
- Cart data is stored in localStorage
- All product data is mock data defined in `src/data/products.js`
- **Important**: Images should be placed in the `public/images/` directory. If you have an `images` folder at the root, move it to `public/images/` for React to serve the images correctly.

