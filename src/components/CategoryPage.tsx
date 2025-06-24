import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Star, Heart } from 'lucide-react';

interface CategoryPageProps {
  onProductClick: (productId: number) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ onProductClick }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      brand: 'Apple',
      price: 89999,
      originalPrice: 129999,
      discount: 31,
      rating: 4.8,
      reviews: 2847,
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['128GB Storage', '6.7" Display', 'A16 Bionic Chip'],
      inStock: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra',
      brand: 'Samsung',
      price: 74999,
      originalPrice: 124999,
      discount: 40,
      rating: 4.6,
      reviews: 1923,
      image: 'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['256GB Storage', '6.8" Display', 'S Pen Included'],
      inStock: true
    },
    {
      id: 3,
      name: 'OnePlus 11 5G',
      brand: 'OnePlus',
      price: 56999,
      originalPrice: 61999,
      discount: 8,
      rating: 4.5,
      reviews: 1456,
      image: 'https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['128GB Storage', '6.7" Display', 'Snapdragon 8 Gen 2'],
      inStock: true
    },
    {
      id: 4,
      name: 'Xiaomi 13 Pro',
      brand: 'Xiaomi',
      price: 79999,
      originalPrice: 89999,
      discount: 11,
      rating: 4.4,
      reviews: 987,
      image: 'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['256GB Storage', '6.73" Display', 'Leica Camera'],
      inStock: false
    },
    {
      id: 5,
      name: 'Google Pixel 7 Pro',
      brand: 'Google',
      price: 84999,
      originalPrice: 84999,
      discount: 0,
      rating: 4.7,
      reviews: 756,
      image: 'https://images.pexels.com/photos/1445819/pexels-photo-1445819.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['128GB Storage', '6.7" Display', 'Google Tensor G2'],
      inStock: true
    },
    {
      id: 6,
      name: 'iPhone 13',
      brand: 'Apple',
      price: 59999,
      originalPrice: 79999,
      discount: 25,
      rating: 4.6,
      reviews: 3421,
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      features: ['128GB Storage', '6.1" Display', 'A15 Bionic Chip'],
      inStock: true
    }
  ];

  const brands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Google', 'Realme', 'Vivo', 'Oppo'];
  const categories = ['All Categories', 'Smartphones', 'Tablets', 'Laptops', 'Accessories'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> <span className="mx-2">/</span>
            <span>Electronics</span> <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Smartphones</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        defaultChecked={index === 1}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    {['Under ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹75,000', 'Above ₹75,000'].map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-2 flex items-center">
                        {renderStars(rating)}
                        <span className="ml-1 text-sm text-gray-600">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Smartphones</h1>
                  <p className="text-gray-600 mt-1">Showing {products.length} results</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => onProductClick(product.id)}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg hover:border-2 hover:border-blue-600 transition-all duration-300 group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === 'list' ? 'h-48' : 'h-64'}`}
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        {product.discount}% OFF
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="mb-3">
                      {product.features.map((feature, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <p className="text-sm text-green-600">Save: ₹{(product.originalPrice - product.price).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;