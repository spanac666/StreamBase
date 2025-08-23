# Restaurant Website - React Version

This is a modern React application for a restaurant website, converted from HTML/CSS. The application features a complete restaurant experience with menu browsing, shopping cart functionality, and contact forms.

## Features

- **Home Page**: Welcome section with interactive map and contact form
- **Menu Page**: Pizza menu with detailed modals and shopping cart integration
- **Contact Page**: Contact information, forms, and image gallery
- **Shopping Cart**: Full basket functionality with add/remove items and checkout
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions

## Technology Stack

- React 18
- React Router DOM for navigation
- CSS3 with custom animations
- Context API for state management
- Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Page footer
│   ├── BasketProvider.jsx  # Shopping cart context
│   ├── BasketIcon.jsx  # Cart icon with item count
│   ├── BasketModal.jsx # Shopping cart modal
│   └── PaymentModal.jsx    # Checkout form modal
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Menu.jsx        # Menu page with pizza cards
│   └── Contact.jsx     # Contact page
├── styles/             # CSS files
│   └── global.css      # Global styles and animations
└── App.jsx             # Main app component with routing
```

## Features Overview

### Shopping Cart System
- Add pizzas to cart from menu page
- View cart items with quantities
- Increase/decrease item quantities
- Remove items from cart
- Checkout with customer and payment details
- Cart persistence during session

### Navigation
- Responsive header with active page indicators
- Smooth transitions between pages
- Mobile-friendly navigation

### Interactive Elements
- Pizza modals with detailed ingredients
- Image slider on contact page
- Interactive map on home page
- Hover effects and animations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
