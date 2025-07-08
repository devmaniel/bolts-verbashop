import React, { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { CategoryService } from '../services/categoryService';
import type { Product } from '../lib/supabase';

const SmartphoneDeals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Get products from electronics category with smartphones subcategory
        const electronicsProducts = await CategoryService.getProductsByCategory('electronics');
        // Filter for smartphones and products with discounts
        const smartphoneDeals = electronicsProducts
          .filter(product => 
            product.subcategory === 'Smartphones' && 
            product.discount && 
            product.discount > 0
          )
          .slice(0, 5); // Limit to 5 products
        
        setProducts(smartphoneDeals);
      } catch (error) {
        console.error('Error loading smartphone deals:', error);
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

  if (products.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Grab the best deal on <span className="text-blue-600">Smartphones</span>
              </h2>
              <div className="h-1 w-24 bg-blue-600 mt-2"></div>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No smartphone deals available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Grab the best deal on <span className="text-blue-600">Smartphones</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                  )}
                </div>
                {product.original_price && product.original_price > product.price && (
                  <p className="text-sm text-green-600">Save: ${(product.original_price - product.price).toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartphoneDeals;