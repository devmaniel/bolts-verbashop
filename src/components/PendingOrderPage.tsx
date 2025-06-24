import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft,
  Download,
  Share2,
  Star,
  MessageCircle,
  RefreshCw,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';

interface PendingOrderPageProps {
  onBack: () => void;
}

const PendingOrderPage: React.FC<PendingOrderPageProps> = ({ onBack }) => {
  const [currentStatus, setCurrentStatus] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100);
    
    // Simulate status updates
    const statusTimer = setInterval(() => {
      setCurrentStatus(prev => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(statusTimer);
  }, []);

  const orderInfo = {
    orderNumber: '#VO2024001234',
    orderDate: 'March 15, 2024',
    estimatedDelivery: 'March 22, 2024',
    total: 2426,
    status: 'Processing',
    trackingNumber: 'VOS1234567890',
    shippingAddress: {
      name: 'John Doe',
      address: '1131 Dusty Townline',
      city: 'Jacksonville, TX 40322',
      phone: '+1 (555) 123-4567'
    },
    paymentMethod: 'Credit Card ending in 9530'
  };

  const orderItems = [
    {
      id: 1,
      name: 'Apple iPhone 14 Pro Max',
      variant: '128GB Deep Purple',
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
      variant: 'GPS 41mm Starlight Aluminium',
      price: 399,
      quantity: 1,
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      sku: '#6362324'
    }
  ];

  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been placed and confirmed',
      time: 'March 15, 2024 - 2:30 PM',
      completed: true,
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Processing',
      description: 'We are preparing your items for shipment',
      time: 'March 15, 2024 - 3:45 PM',
      completed: currentStatus >= 2,
      icon: Package
    },
    {
      id: 3,
      title: 'Shipped',
      description: 'Your order has been shipped and is on the way',
      time: currentStatus >= 3 ? 'March 16, 2024 - 10:15 AM' : 'Pending',
      completed: currentStatus >= 3,
      icon: Truck
    },
    {
      id: 4,
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      time: currentStatus >= 4 ? 'March 22, 2024 - 8:00 AM' : 'Pending',
      completed: currentStatus >= 4,
      icon: MapPin
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Your order has been delivered',
      time: 'Pending',
      completed: false,
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status Card */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-1000 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Order {orderInfo.orderNumber}</h2>
                    <p className="text-blue-100">Placed on {orderInfo.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                      <span className="font-semibold">{orderInfo.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                    <p className="text-gray-600">{orderInfo.estimatedDelivery}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tracking Number</h3>
                    <p className="text-gray-600 font-mono text-sm">{orderInfo.trackingNumber}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Total Paid</h3>
                    <p className="text-gray-600 font-semibold">${orderInfo.total}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-1000 delay-300 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-xl font-bold text-gray-900 mb-8">Order Progress</h3>
              
              <div className="space-y-8">
                {trackingSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : currentStatus === step.id
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-semibold ${
                            step.completed ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </h4>
                          <span className={`text-sm ${
                            step.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {step.time}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                        
                        {index < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-8 ml-6 mt-4 transition-all duration-500 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-1000 delay-500 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Items in this Order</h3>
              
              <div className="space-y-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">{item.variant}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-1000 delay-700 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{orderInfo.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600">{orderInfo.shippingAddress.address}</p>
                    <p className="text-sm text-gray-600">{orderInfo.shippingAddress.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-600">{orderInfo.shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-1000 delay-900 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-600">{orderInfo.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-1000 delay-1000 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download Invoice</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact Support</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Rate Order</span>
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className={`bg-blue-50 rounded-2xl p-6 transition-all duration-1000 delay-1200 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+1 202-918-2132</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@voiceshop.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrderPage;