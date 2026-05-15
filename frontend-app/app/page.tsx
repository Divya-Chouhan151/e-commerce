import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-amber-900">Hand-Knitted Collection</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found. Start by adding some to the database!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
