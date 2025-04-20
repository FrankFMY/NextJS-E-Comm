'use client';

import { useState } from 'react';
import { useCart, Product } from '@/context/CartContext';
import Notification from '@/components/Notification';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });
  
  // Mock products data
  const products: Product[] = [
    { id: 1, name: 'Товар 1', price: 1000, description: 'Описание товара будет добавлено позже.' },
    { id: 2, name: 'Товар 2', price: 2000, description: 'Описание товара будет добавлено позже.' },
    { id: 3, name: 'Товар 3', price: 3000, description: 'Описание товара будет добавлено позже.' },
    { id: 4, name: 'Товар 4', price: 4000, description: 'Описание товара будет добавлено позже.' },
    { id: 5, name: 'Товар 5', price: 5000, description: 'Описание товара будет добавлено позже.' },
    { id: 6, name: 'Товар 6', price: 6000, description: 'Описание товара будет добавлено позже.' },
  ];
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({
      show: true,
      message: `${product.name} добавлен в корзину`
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-contrast-high">Наши товары</h1>
      <p className="text-lg mb-8 text-contrast-medium">
        Здесь вы найдете все наши товары. Скоро будет доступен полный каталог.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-card-bg p-6 rounded-lg shadow-md border border-gray-200">
            <div className="bg-blue-300 h-48 mb-4 rounded"></div>
            <h2 className="inline-block px-2 bg-orange-300 text-xl font-bold mb-2 text-black rounded-md border-4 border-red-200">{product.name}</h2>
            <p className="text-black mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-black">₽{product.price.toLocaleString()}</span>
              <button 
                onClick={() => handleAddToCart(product)}
                className="px-4 py-2 bg-accent text-white font-medium rounded hover:bg-accent-hover transition-colors"
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {notification.show && (
        <Notification 
          message={notification.message} 
          type="success" 
          onClose={() => setNotification({ show: false, message: '' })}
        />
      )}
    </div>
  );
}
