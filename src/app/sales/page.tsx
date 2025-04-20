// src/app/sales/page.tsx
export default function SalesPage() {
  const sales = [
    { 
      id: 1, 
      title: "Летняя распродажа", 
      discount: "30%", 
      endDate: "31 августа", 
      description: "Скидки на летнюю коллекцию" 
    },
    { 
      id: 2, 
      title: "Черная пятница", 
      discount: "50%", 
      endDate: "30 ноября", 
      description: "Самые большие скидки года" 
    },
    { 
      id: 3, 
      title: "Киберпонедельник", 
      discount: "40%", 
      endDate: "5 декабря", 
      description: "Скидки на электронику" 
    },
    { 
      id: 4, 
      title: "Новогодняя распродажа", 
      discount: "25%", 
      endDate: "10 января", 
      description: "Праздничные скидки на все товары" 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Акции и скидки</h1>
      <p className="text-lg mb-8">
        Не пропустите наши специальные предложения и сезонные распродажи.
      </p>
      
      <div className="space-y-8">
        {sales.map((sale) => (
          <div key={sale.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black">{sale.title}</h2>
                <p className="text-gray-600 mb-4">{sale.description}</p>
                <p className="text-sm text-gray-500">Действует до: {sale.endDate}</p>
              </div>
              <div className="bg-red-100 text-red-800 text-2xl font-bold px-4 py-2 rounded">
                -{sale.discount}
              </div>
            </div>
            <div className="mt-6">
              <a 
                href={`/sales/${sale.id}`}
                className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Подробнее
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}