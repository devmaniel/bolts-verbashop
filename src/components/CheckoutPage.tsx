import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check, MapPin, Phone, Mail, User, Edit, X, Plus, Calendar, ChevronDown } from 'lucide-react';

interface CheckoutItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

interface Address {
  id: number;
  name: string;
  address: string;
  phone: string;
  isHome: boolean;
  isOffice: boolean;
}

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [shippingMethod, setShippingMethod] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: '2118 Thornridge',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      phone: '(209) 555-0104',
      isHome: true,
      isOffice: false
    },
    {
      id: 2,
      name: 'Headoffice',
      address: '2715 Ash Dr. San Jose, South Dakota 83475',
      phone: '(704) 555-0127',
      isHome: false,
      isOffice: true
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
    isHome: false,
    isOffice: false
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '4085 9536 8475 9530',
    expiryDate: '',
    cvv: '',
    cardName: '',
    promoCode: '',
    sameAsBilling: true
  });

  // Sample checkout items matching the design
  const checkoutItems: CheckoutItem[] = [
    {
      id: 1,
      name: 'Apple iPhone 14 Pro Max',
      variant: '128GB',
      price: 1399,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      sku: '#25139526913984'
    },
    {
      id: 2,
      name: 'AirPods Max Silver',
      variant: '',
      price: 549,
      quantity: 1,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      sku: '#53459358345'
    },
    {
      id: 3,
      name: 'Apple Watch Series 9',
      variant: 'GPS 41mm',
      price: 399,
      quantity: 1,
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      sku: '#6362324'
    }
  ];

  const subtotal = 2347;
  const estimatedTax = 50;
  const estimatedShipping = 29;
  const total = 2426;

  const handleInputChange = (section: 'newAddress' | 'payment', field: string, value: string | boolean) => {
    if (section === 'newAddress') {
      setNewAddress(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const addNewAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.phone) {
      const newId = Math.max(...addresses.map(a => a.id)) + 1;
      setAddresses(prev => [...prev, { ...newAddress, id: newId }]);
      setSelectedAddress(newId);
      setNewAddress({ name: '', address: '', phone: '', isHome: false, isOffice: false });
      setShowAddAddress(false);
    }
  };

  const removeAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(addresses.find(addr => addr.id !== id)?.id || 0);
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const steps = [
    { id: 1, name: 'Address', completed: currentStep > 1 },
    { id: 2, name: 'Shipping', completed: currentStep > 2 },
    { id: 3, name: 'Payment', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Cart</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <span className={`font-medium ${
                    currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Select Address */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Address</h2>
            
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="relative">
                  <label className={`flex items-start p-6 border-2 rounded-xl cursor-pointer transition-colors ${
                    selectedAddress === address.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300 mt-1"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{address.name}</span>
                        {address.isHome && (
                          <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded font-medium">
                            HOME
                          </span>
                        )}
                        {address.isOffice && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                            OFFICE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{address.address}</p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAddress(address.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </label>
                </div>
              ))}

              {/* Add New Address Button */}
              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Address
              </button>

              {/* Add New Address Form */}
              {showAddAddress && (
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Add New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                      <input
                        type="text"
                        value={newAddress.name}
                        onChange={(e) => handleInputChange('newAddress', 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="e.g., Home, Office"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                      <textarea
                        value={newAddress.address}
                        onChange={(e) => handleInputChange('newAddress', 'address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="Enter complete address"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => handleInputChange('newAddress', 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newAddress.isHome}
                          onChange={(e) => handleInputChange('newAddress', 'isHome', e.target.checked)}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Home</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newAddress.isOffice}
                          onChange={(e) => handleInputChange('newAddress', 'isOffice', e.target.checked)}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Office</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewAddress}
                      className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={onBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedAddress}
                className={`px-8 py-3 rounded-xl font-medium transition-colors ${
                  selectedAddress
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Method */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipment Method</h2>
            
            <div className="space-y-4">
              {/* Free Regular Shipment */}
              <label className={`flex items-center justify-between p-6 border rounded-xl cursor-pointer transition-colors ${
                shippingMethod === 'free' ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    checked={shippingMethod === 'free'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300"
                  />
                  <div className="ml-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">Free</span>
                      <span className="text-gray-600">Regular shipment</span>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600">17 Oct, 2023</span>
              </label>

              {/* $8.50 Fast Delivery */}
              <label className={`flex items-center justify-between p-6 border rounded-xl cursor-pointer transition-colors ${
                shippingMethod === 'fast' ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="fast"
                    checked={shippingMethod === 'fast'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300"
                  />
                  <div className="ml-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">$8.50</span>
                      <span className="text-gray-600">Get your delivery as soon as possible</span>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600">1 Oct, 2023</span>
              </label>

              {/* Schedule Delivery */}
              <label className={`flex items-center justify-between p-6 border rounded-xl cursor-pointer transition-colors ${
                shippingMethod === 'schedule' ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="schedule"
                    checked={shippingMethod === 'schedule'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-5 w-5 text-gray-900 focus:ring-gray-900 border-gray-300"
                  />
                  <div className="ml-4">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">Schedule</span>
                      <span className="text-gray-600">Pick a date when you want to get your delivery</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Select Date</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </label>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Summary */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-8">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.name} {item.variant}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">${item.price}</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">1131 Dusty Townline, Jacksonville, TX 40322</p>
              </div>

              {/* Shipment Method */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Shipment method</h3>
                <p className="text-gray-600">Free</p>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-semibold">${estimatedTax}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated shipping & Handling</span>
                  <span className="font-semibold">${estimatedShipping}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Payment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                {['Credit Card', 'PayPal', 'PayPal Credit'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      paymentMethod === method
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {/* Credit Card Visual */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 text-white relative overflow-hidden">
                  {/* Card chip and contactless icons */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-8 bg-yellow-400 rounded-md"></div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Card number */}
                  <div className="text-2xl font-mono tracking-wider mb-6">
                    4085 9536 8475 9530
                  </div>
                  
                  {/* Cardholder */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-300 mb-1">Cardholder</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                      <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentInfo.cardName}
                    onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Exp Date"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                {/* Same as billing address */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={paymentInfo.sameAsBilling}
                    onChange={(e) => handleInputChange('payment', 'sameAsBilling', e.target.checked)}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Same as billing address</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handlePayment}
                  className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;