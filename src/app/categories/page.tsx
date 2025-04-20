// src/app/categories/page.tsx
export default function CategoriesPage() {
  const categories = [
    { id: 1, name: "Электроника", itemCount: 42 },
    { id: 2, name: "Одежда", itemCount: 56 },
    { id: 3, name: "Дом и сад", itemCount: 38 },
    { id: 4, name: "Спорт и отдых", itemCount: 24 },
    { id: 5, name: "Красота и здоровье", itemCount: 31 },
    { id: 6, name: "Книги", itemCount: 67 }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Категории товаров</h1>
      <p className="text-lg mb-8">
        Просмотрите наши категории товаров, чтобы найти то, что вам нужно.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-black">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.itemCount} товаров</p>
            <a 
              href={`/categories/${category.id}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Просмотреть
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}