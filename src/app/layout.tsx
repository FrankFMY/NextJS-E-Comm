// src/app/layout.tsx
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata = {
  title: 'MyStore - Интернет-магазин',
  description: 'Широкий ассортимент товаров высокого качества по доступным ценам',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <Header />
          <main className="mt-16 px-4">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}