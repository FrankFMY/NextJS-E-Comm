'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the product type
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// Define the cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoaded: boolean; // Add a flag to indicate if the cart has been loaded from localStorage
}

// Create the cart context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isLoaded: false,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart state with empty array first to avoid hydration mismatch
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load cart data from localStorage after component mounts (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      setIsLoaded(true);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items, isLoaded]);
  
  // Add a product to the cart
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If the product is already in the cart, increase its quantity
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  
  // Update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate the total number of items in the cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate the total price of all items in the cart
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  // Provide the cart context to children components
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isLoaded,
    }}>
      {children}
    </CartContext.Provider>
  );
}

