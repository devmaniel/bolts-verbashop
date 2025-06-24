import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SmartphoneDeals from './components/SmartphoneDeals';
import TopCategories from './components/TopCategories';
import ElectronicsBrands from './components/ElectronicsBrands';
import DailyEssentials from './components/DailyEssentials';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import DynamicCategoryPage from './components/DynamicCategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SuccessCheckoutPage from './components/SuccessCheckoutPage';
import PendingOrderPage from './components/PendingOrderPage';
import OrdersPage from './components/OrdersPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleSuccessCheckout = () => {
    setCurrentPage('success-checkout');
  };

  const handleNavigateToPendingOrder = () => {
    setCurrentPage('pending-order');
  };

  const handleNavigate = (page: string, categoryId?: string) => {
    setCurrentPage(page);
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('category');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onBack={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('login')}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case 'profile-settings':
        return (
          <ProfileSettingsPage
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'category':
        if (selectedCategoryId === 'electronics') {
          // Keep the old electronics page for backward compatibility
          return <CategoryPage onProductClick={handleProductClick} />;
        } else {
          // Use dynamic category page for all other categories
          return (
            <DynamicCategoryPage 
              categoryId={selectedCategoryId}
              onProductClick={handleProductClick}
              onBack={() => setCurrentPage('home')}
            />
          );
        }
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetailPage 
            productId={selectedProductId} 
            onBack={() => setCurrentPage('category')} 
          />
        ) : null;
      case 'cart':
        return <CartPage onBack={() => setCurrentPage('home')} onCheckout={handleCheckout} />;
      case 'checkout':
        return <CheckoutPage onBack={() => setCurrentPage('cart')} onSuccess={handleSuccessCheckout} />;
      case 'success-checkout':
        return <SuccessCheckoutPage onNavigateToPendingOrder={handleNavigateToPendingOrder} />;
      case 'pending-order':
        return <PendingOrderPage onBack={() => setCurrentPage('home')} />;
      case 'orders':
        return <OrdersPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero onCategoryClick={handleCategoryClick} />
            <SmartphoneDeals />
            <TopCategories onCategoryClick={handleCategoryClick} />
            <ElectronicsBrands />
            <DailyEssentials />
          </>
        );
    }
  };

  // Don't render header and footer for auth pages and profile settings
  const isFullPageComponent = currentPage === 'login' || currentPage === 'register' || currentPage === 'profile-settings';

  return (
    <div className="min-h-screen bg-white">
      {!isFullPageComponent && <Header onNavigate={handleNavigate} />}
      {renderPage()}
      {!isFullPageComponent && <Footer />}
    </div>
  );
}

export default App;