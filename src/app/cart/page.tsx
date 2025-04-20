'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-xl mb-6">Ваша корзина пуста</p>
          <Link 
            href="/products" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Перейти к товарам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex font-semibold text-gray-600 uppercase text-sm border-b-4 pb-4">
            <div className="w-2/5">Товар</div>
            <div className="w-1/5 text-center">Цена</div>
            <div className="w-1/5 text-center">Количество</div>
            <div className="w-1/5 text-right">Сумма</div>
          </div>
          
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center py-4 border-b-4">
              <div className="w-2/5">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-200 rounded"></div>
                  <div className="ml-4">
                    <h2 className="font-semibold text-lg text-black">{item.product.name}</h2>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="w-1/5 text-center text-black">
                ₽{item.product.price.toLocaleString()}
              </div>
              
              <div className="w-1/5 text-center">
                <div className="flex items-center justify-center">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded-l flex items-center justify-center hover:bg-gray-100 text-black"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 border-t border-b flex items-center justify-center text-black">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded-r flex items-center justify-center hover:bg-gray-100 text-black"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="w-1/5 text-right font-semibold text-black">
                ₽{(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-semibold text-black">Итого:</div>
            <div className="text-2xl font-bold text-black">₽{totalPrice.toLocaleString()}</div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={clearCart}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Очистить корзину
            </button>
            
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/products" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
}