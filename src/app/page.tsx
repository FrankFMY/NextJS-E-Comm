// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать в MyStore</h1>
      <p className="text-lg mb-8 text-contrast-medium">
        Мы предлагаем широкий ассортимент товаров высокого качества по доступным ценам.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeaturedSection 
          title="Новые поступления" 
          description="Ознакомьтесь с нашими новейшими товарами"
          linkText="Смотреть все"
          href="/products"
        />
        <FeaturedSection 
          title="Акции и скидки" 
          description="Не пропустите наши специальные предложения"
          linkText="Подробнее"
          href="/sales"
        />
        <FeaturedSection 
          title="Популярные категории" 
          description="Найдите то, что ищете, в наших популярных категориях"
          linkText="Просмотреть категории"
          href="/categories"
        />
      </div>
    </div>
  );
}

function FeaturedSection({ 
  title, 
  description, 
  linkText, 
  href 
}: { 
  title: string; 
  description: string; 
  linkText: string; 
  href: string;
}) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-contrast-medium mb-4">{description}</p>
      <Link 
        href={href}
        className="btn btn-primary inline-block"
      >
        {linkText}
      </Link>
    </div>
  );
}


