import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { act } from 'react-dom/test-utils';

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

// Mock component to test the cart functionality
function TestComponent() {
  const { items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, isLoaded } = useCart();
  
  const testProduct = { id: 1, name: 'Test Product', price: 1000 };
  
  return (
    <div>
      <div data-testid="is-loaded">{isLoaded ? 'true' : 'false'}</div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <button data-testid="add-item" onClick={() => addToCart(testProduct)}>
        Add to Cart
      </button>
      {items.map(item => (
        <div key={item.product.id} data-testid={`item-${item.product.id}`}>
          <span data-testid={`item-name-${item.product.id}`}>{item.product.name}</span>
          <span data-testid={`item-quantity-${item.product.id}`}>{item.quantity}</span>
          <button 
            data-testid={`increase-${item.product.id}`}
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            +
          </button>
          <button 
            data-testid={`decrease-${item.product.id}`}
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            -
          </button>
          <button 
            data-testid={`remove-${item.product.id}`}
            onClick={() => removeFromCart(item.product.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  
  test('should initialize with isLoaded as false and then become true', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Initially isLoaded should be false
    expect(screen.getByTestId('is-loaded').textContent).toBe('false');
    
    // After the effect runs, isLoaded should become true
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
  });
  
  test('should add an item to the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Wait for the cart to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
    
    // Initially the cart should be empty
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    
    // Add an item to the cart
    fireEvent.click(screen.getByTestId('add-item'));
    
    // The cart should now have 1 item with a total price of 1000
    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('1000');
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-name-1').textContent).toBe('Test Product');
    expect(screen.getByTestId('item-quantity-1').textContent).toBe('1');
    
    // Check if localStorage was updated
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].product.name).toBe('Test Product');
  });
  
  test('should increase item quantity', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Wait for the cart to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
    
    // Add an item to the cart
    fireEvent.click(screen.getByTestId('add-item'));
    
    // Increase the quantity
    fireEvent.click(screen.getByTestId('increase-1'));
    
    // The cart should now have 2 items with a total price of 2000
    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('2000');
    expect(screen.getByTestId('item-quantity-1').textContent).toBe('2');
    
    // Check if localStorage was updated
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].quantity).toBe(2);
  });
  
  test('should decrease item quantity', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Wait for the cart to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
    
    // Add an item to the cart and increase quantity to 2
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('increase-1'));
    
    // Decrease the quantity
    fireEvent.click(screen.getByTestId('decrease-1'));
    
    // The cart should now have 1 item with a total price of 1000
    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('1000');
    expect(screen.getByTestId('item-quantity-1').textContent).toBe('1');
    
    // Check if localStorage was updated
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].quantity).toBe(1);
  });
  
  test('should remove item when quantity becomes 0', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Wait for the cart to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
    
    // Add an item to the cart
    fireEvent.click(screen.getByTestId('add-item'));
    
    // Decrease the quantity to 0
    fireEvent.click(screen.getByTestId('decrease-1'));
    
    // The cart should now be empty
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
    
    // Check if localStorage was updated
    expect(JSON.parse(localStorage.getItem('cart') || '[]')).toHaveLength(0);
  });
  
  test('should remove an item from the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Wait for the cart to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
    });
    
    // Add an item to the cart
    fireEvent.click(screen.getByTestId('add-item'));
    
    // Remove the item
    fireEvent.click(screen.getByTestId('remove-1'));
    
    // The cart should now be empty
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
    
    // Check if localStorage was updated
    expect(JSON.parse(localStorage.getItem('cart') || '[]')).toHaveLength(0);
  });
  
  test('should load cart from localStorage on initialization', async () => {
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
        <TestComponent />
      </CartProvider>
    );
    
    // Initially the cart should be empty (before loading from localStorage)
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    
    // After the effect runs, the cart should be loaded from localStorage
    await waitFor(() => {
      expect(screen.getByTestId('is-loaded').textContent).toBe('true');
      expect(screen.getByTestId('total-items').textContent).toBe('2');
      expect(screen.getByTestId('total-price').textContent).toBe('2000');
      expect(screen.getByTestId('item-1')).toBeInTheDocument();
      expect(screen.getByTestId('item-name-1').textContent).toBe('Test Product');
      expect(screen.getByTestId('item-quantity-1').textContent).toBe('2');
    });
  });
});