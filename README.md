# Next.js E-commerce Store with Shopping Cart Management

A modern e-commerce web application built with Next.js 13+, featuring a responsive design, shopping cart functionality, and a seamless user experience. The application provides real-time cart management with persistent storage and a clean, accessible user interface styled with Tailwind CSS.

This project implements a full-featured e-commerce frontend with product browsing, category navigation, and cart management. It leverages Next.js's app router for optimized page routing and React Context for global state management. The application includes a robust testing suite using Jest and React Testing Library to ensure reliability and maintainability.

## Repository Structure
```
my-next-app/
├── src/                          # Source code directory
│   ├── app/                     # Next.js app router pages
│   │   ├── cart/               # Shopping cart page
│   │   ├── categories/         # Product categories page
│   │   ├── products/          # Product listing page
│   │   └── sales/             # Sales and promotions page
│   ├── components/             # Reusable React components
│   │   ├── CartIcon.tsx       # Shopping cart icon component
│   │   ├── Header.tsx         # Application header component
│   │   └── Notification.tsx   # Toast notification component
│   ├── context/               # React Context providers
│   │   └── CartContext.tsx    # Shopping cart state management
│   └── types/                 # TypeScript type definitions
├── public/                     # Static assets directory
└── config files               # Configuration files for Next.js, TypeScript, etc.
```

## Usage Instructions
### Prerequisites
- Node.js 16.x or later
- npm 7.x or later
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd my-next-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start
1. Start the development server:
```bash
npm run dev
```
2. Open http://localhost:3000 in your browser
3. Browse products and add them to your cart
4. View and manage your cart at /cart

### More Detailed Examples

**Adding Products to Cart**
```typescript
import { useCart } from '@/context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
```

**Managing Cart Items**
```typescript
import { useCart } from '@/context/CartContext';

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  
  return items.map(item => (
    <div key={item.product.id}>
      <span>{item.product.name}</span>
      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
      <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
    </div>
  ));
}
```

### Troubleshooting

**Common Issues**

1. Cart items not persisting after page refresh
```bash
# Check if localStorage is enabled in your browser
# Verify that the cart data is being saved:
localStorage.getItem('cart')
```

2. Styling issues
```bash
# Ensure Tailwind CSS is properly configured
npm run build
# Check for any CSS compilation errors in the console
```

3. Testing failures
```bash
# Run tests in watch mode to debug
npm test -- --watch
# Check Jest setup in jest.config.js
```

## Data Flow

The application implements a unidirectional data flow pattern using React Context for state management. Cart data persists across sessions using browser localStorage.

```ascii
+-------------+     +--------------+     +-------------+
|   Product   |     |    Cart     |     |  Storage    |
|    Page     +---->|   Context   +---->| (localStorage)|
+-------------+     +--------------+     +-------------+
       ^                   |                   ^
       |                   v                   |
       |            +--------------+           |
       +------------+    Cart      +-----------+
                    |    Page     |
                    +--------------+
```

Key Component Interactions:
- CartContext provides global cart state management
- Product pages dispatch actions to modify cart state
- Cart state changes trigger localStorage updates
- Cart page subscribes to cart state changes
- Components use useCart hook to access cart functionality
- Notifications provide feedback for cart operations
- Header component displays current cart status