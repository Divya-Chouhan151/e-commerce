import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { ShoppingBag, Star, Zap, Heart } from 'lucide-react';
import ClientOnly from '@/components/ClientOnly';

export default async function Home() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
  }

  const categories = [
    { name: 'Sweaters', icon: <ShoppingBag className="text-pink-500" /> },
    { name: 'Scarves', icon: <Star className="text-amber-500" /> },
    { name: 'Blankets', icon: <Zap className="text-blue-500" /> },
    { name: 'Baby Knits', icon: <Heart className="text-red-500" /> },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-12 px-4 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Lowest Prices <br /> Best Quality Knits
            </h1>
            <p className="text-amber-100 text-lg mb-6">
              100% Handcrafted items from local artisans. <br />
              Free Delivery • Cash on Delivery • Easy Returns
            </p>
            <button className="bg-white text-amber-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/3">
             <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-amber-900">
                    <Star fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold">4.8/5 Rating</p>
                    <p className="text-xs text-amber-200">10k+ Happy Customers</p>
                  </div>
                </div>
                <p className="text-sm italic">"The wool is so soft and the knitting is perfection. Truly artisanal!"</p>
             </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="w-8 h-[2px] bg-amber-500 mr-3"></span>
          Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center group">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="font-semibold text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="w-8 h-[2px] bg-amber-500 mr-3"></span>
          Products For You
        </h2>
        <ClientOnly>
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products found yet.</p>
              <p className="text-gray-400 text-sm">Our artisans are busy knitting new magic!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </ClientOnly>
      </div>
    </main>
  );
}
