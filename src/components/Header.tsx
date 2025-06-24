import React, { useState } from 'react';
import { Search, ShoppingCart, User, MapPin, ChevronDown, Menu, X, Package, Settings } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string, categoryId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const categories = [
    { name: 'Electronics', id: 'electronics' },
    { name: 'Premium Fruits', id: 'premium-fruits' },
    { name: 'Home & Kitchen', id: 'home-kitchen' },
    { name: 'Fashion', id: 'fashion' },
    { name: 'Beauty', id: 'beauty' },
    { name: 'Home Improvement', id: 'home-improvement' },
    { name: 'Sports, Toys & Luggage', id: 'sports-toys-luggage' }
  ];

  const handleCartClick = () => {
    onNavigate('cart');
  };

  const handleOrdersClick = () => {
    onNavigate('orders');
  };

  const handleCategoryClick = (categoryId: string) => {
    onNavigate('category', categoryId);
    setIsMenuOpen(false);
  };

  const handleAuthClick = (page: string) => {
    onNavigate(page);
    setIsUserMenuOpen(false);
  };

  const handleProfileSettingsClick = () => {
    onNavigate('profile-settings');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>Welcome to worldwide Megamart</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Deliver to 423561</span>
              </div>
              <button 
                onClick={handleOrdersClick}
                className="hover:text-blue-600 transition-colors"
              >
                Track your order
              </button>
              <span>All Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              VoiceShop
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                  <button 
                    onClick={() => handleAuthClick('register')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Create Account</span>
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={() => {
                      onNavigate('orders');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </button>
                  <button 
                    onClick={handleProfileSettingsClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wishlist
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={handleCartClick}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 py-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center space-x-1 py-2 lg:py-0 text-left hover:text-blue-200 transition-colors"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;