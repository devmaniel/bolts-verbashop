import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { CategoryService } from '../services/categoryService';
import type { Product } from '../lib/supabase';

const ElectronicsBrands: React.FC = () => {
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrandProducts = async () => {
      try {
        setLoading(true);
        // Get products from electronics category
        const electronicsProducts = await CategoryService.getProductsByCategory('electronics');
        
        // Get unique brands and select one product per brand (max 3 brands)
        const brandMap = new Map<string, Product>();
        
        electronicsProducts.forEach(product => {
          if (!brandMap.has(product.brand) && brandMap.size < 3) {
            brandMap.set(product.brand, product);
          }
        });
        
        setBrandProducts(Array.from(brandMap.values()));
      } catch (error) {
        console.error('Error loading electronics brands:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBrandProducts();
  }, []);

  const handleBrandClick = (brand: string) => {
    // Navigate to electronics category with brand filter
    navigate({ 
      to: '/category/$categoryId', 
      params: { categoryId: 'electronics' },
      search: { brand }
    });
  };

  const handleViewAll = () => {
    navigate({ to: '/category/$categoryId', params: { categoryId: 'electronics' } });
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (brandProducts.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Top <span className="text-blue-600">Electronics Brands</span>
              </h2>
              <div className="h-1 w-24 bg-blue-600 mt-2"></div>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No electronics brands available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Define brand colors for visual appeal
  const brandColors = [
    'bg-gray-900',
    'bg-blue-600', 
    'bg-purple-600'
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Top <span className="text-blue-600">Electronics Brands</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandProducts.map((product, index) => (
            <div 
              key={product.id} 
              onClick={() => handleBrandClick(product.brand)}
              className={`${brandColors[index] || 'bg-gray-600'} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{product.brand.toUpperCase()}</h3>
                  <p className="text-sm opacity-90">UP to 80% OFF</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectronicsBrands;