import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
  selected: boolean;
}

interface CartPageProps {
  onBack: () => void;
  onCheckout?: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onBack, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      selected: true
    },
    {
      id: 2,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      selected: true
    },
    {
      id: 3,
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      selected: false
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleItemSelection = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAllItems = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedPromo('SAVE20');
      setPromoCode('');
    }
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo === 'SAVE20' ? subtotal * 0.2 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center text-sm text-gray-600">
              <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Cart</span>
            </nav>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={onBack}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
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
            <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select All */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={selectAllItems}
                  className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                />
                <span className="ml-3 font-medium text-gray-900">
                  Select All ({cartItems.length} items)
                </span>
              </label>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleItemSelection(item.id)}
                    className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                  />

                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Size: <span className="text-gray-900">{item.size}</span></p>
                          <p>Color: <span className="text-gray-900">{item.color}</span></p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-gray-900">${item.price}</span>
                      
                      <div className="flex items-center border border-gray-300 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors rounded-l-xl"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors rounded-r-xl"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal ({selectedItems.length} items)</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex items-center justify-between text-red-600">
                    <span>Discount (-20%)</span>
                    <span className="font-semibold">-${discount.toFixed(0)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${total.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                  <button
                    onClick={applyPromoCode}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-green-600 text-sm mt-2 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Promo code "{appliedPromo}" applied!
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 ${
                  selectedItems.length > 0
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Go to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              {selectedItems.length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please select items to checkout
                </p>
              )}

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;