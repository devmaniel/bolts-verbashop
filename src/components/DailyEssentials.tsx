import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { CategoryService } from '../services/categoryService';
import type { Product } from '../lib/supabase';

const DailyEssentials: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Get products from premium-fruits category
        const fruitsProducts = await CategoryService.getProductsByCategory('premium-fruits');
        // Take first 6 products
        const essentials = fruitsProducts.slice(0, 6);
        
        setProducts(essentials);
      } catch (error) {
        console.error('Error loading daily essentials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate({ to: '/product/$productId', params: { productId: productId.toString() } });
  };

  const handleViewAll = () => {
    navigate({ to: '/category/$categoryId', params: { categoryId: 'premium-fruits' } });
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Daily <span className="text-blue-600">Essentials</span>
              </h2>
              <div className="h-1 w-24 bg-blue-600 mt-2"></div>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No daily essentials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Daily <span className="text-blue-600">Essentials</span>
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-2"></div>
          </div>
          <button 
            onClick={handleViewAll}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product.id)}
              className={`${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''} group cursor-pointer`}
            >
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    index === 0 ? 'h-64 lg:h-full' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm opacity-90">${product.price}</p>
                    {product.discount && product.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyEssentials;