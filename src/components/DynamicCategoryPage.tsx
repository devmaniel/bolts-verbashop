import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Star, Heart, ArrowLeft } from 'lucide-react';
import { CategoryService } from '../services/categoryService';
import type { Category, Product } from '../lib/supabase';

interface DynamicCategoryPageProps {
  categoryId: string;
  onProductClick: (productId: number) => void;
  onBack: () => void;
}

const DynamicCategoryPage: React.FC<DynamicCategoryPageProps> = ({ 
  categoryId, 
  onProductClick, 
  onBack 
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Load category and products data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoryData, productsData] = await Promise.all([
          CategoryService.getCategoryById(categoryId),
          CategoryService.getProductsByCategory(categoryId)
        ]);
        
        setCategory(categoryData);
        setAllProducts(productsData);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedSubcategories.includes(product.subcategory || '')
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Price range filter
    if (selectedPriceRange && category) {
      const priceRange = category.price_ranges.find(range => range.label === selectedPriceRange);
      if (priceRange) {
        filtered = filtered.filter(product =>
          product.price >= priceRange.min && product.price <= priceRange.max
        );
      }
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, selectedSubcategories, selectedBrands, selectedPriceRange, minRating, sortBy, category]);

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange('');
    setMinRating(0);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <button onClick={onBack} className="hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2 inline" />
              Home
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {category.subcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => toggleSubcategory(subcategory)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{subcategory}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {category.price_ranges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range.label}
                        onChange={() => setSelectedPriceRange(
                          selectedPriceRange === range.label ? '' : range.label
                        )}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {category.brands.map((brand) => (
                    <label key={brand} className="flex items-center">
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
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
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
              <button 
                onClick={clearAllFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
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
                  <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
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
                      <option value="discount">Best Discount</option>
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
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
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
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          {product.discount}% OFF
                        </div>
                      )}
                      {!product.in_stock && (
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
                        {product.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            {product.original_price && product.original_price > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                            )}
                          </div>
                          {product.discount && product.discount > 0 && (
                            <p className="text-sm text-green-600">Save: ${((product.original_price || product.price) - product.price).toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCategoryPage;