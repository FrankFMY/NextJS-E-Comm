import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import CartIcon from './CartIcon';
import { CartProvider } from '@/context/CartContext';

// Mock next/link
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('CartIcon', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render without cart count initially', () => {
    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    // Should render the cart icon
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    
    // Should not render the count badge initially
    const countBadge = screen.queryByText(/\d+/);
    expect(countBadge).not.toBeInTheDocument();
  });

  test('should show cart count after loading from localStorage', async () => {
    // Set up localStorage with a pre-existing cart
    const initialCart = [
      { 
        product: { id: 1, name: 'Test Product', price: 1000 }, 
        quantity: 2 
      }
    ];
    localStorage.setItem('cart', JSON.stringify(initialCart));
    
    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    // Initially, the count badge should not be visible
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    
    // After the cart is loaded, the count badge should be visible
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  test('should not show cart count if cart is empty', async () => {
    render(
      <CartProvider>
        <CartIcon />
      </CartProvider>
    );

    // Wait for the cart to be loaded
    await waitFor(() => {
      // Even after loading, there should be no count badge for an empty cart
      const countBadge = screen.queryByText(/\d+/);
      expect(countBadge).not.toBeInTheDocument();
    });
  });
});