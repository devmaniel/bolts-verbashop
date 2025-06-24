import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Clock, ArrowRight, Download, Share2, Star } from 'lucide-react';

interface SuccessCheckoutPageProps {
  onNavigateToPendingOrder: () => void;
}

const SuccessCheckoutPage: React.FC<SuccessCheckoutPageProps> = ({ onNavigateToPendingOrder }) => {
  const [countdown, setCountdown] = useState(5);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 100);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onNavigateToPendingOrder();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigateToPendingOrder]);

  const orderDetails = {
    orderNumber: '#VO2024001234',
    orderDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    total: 2426,
    items: [
      {
        name: 'Apple iPhone 14 Pro Max 128GB',
        quantity: 1,
        price: 1399
      },
      {
        name: 'AirPods Max Silver',
        quantity: 1,
        price: 549
      },
      {
        name: 'Apple Watch Series 9 GPS 41mm',
        quantity: 1,
        price: 399
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-bounce"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase! Your order has been confirmed.
          </p>
          <p className="text-gray-500">
            Redirecting to order tracking in <span className="font-bold text-green-600">{countdown}</span> seconds...
          </p>
        </div>

        {/* Order Summary Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 transition-all duration-1000 delay-300 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Order Confirmation</h2>
                <p className="text-green-100">Order {orderDetails.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm">Order Date</p>
                <p className="font-semibold">{orderDetails.orderDate}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Delivery Info */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-gray-600">{orderDetails.estimatedDelivery}</p>
                <p className="text-sm text-green-600 font-medium mt-1">Free Shipping</p>
              </div>

              {/* Order Status */}
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
                <p className="text-gray-600">Processing</p>
                <p className="text-sm text-blue-600 font-medium mt-1">Being Prepared</p>
              </div>

              {/* Payment */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment</h3>
                <p className="text-gray-600">Confirmed</p>
                <p className="text-sm text-green-600 font-medium mt-1">${orderDetails.total}</p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Items Ordered</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t mt-6 pt-6">
              <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                <span>Total Paid</span>
                <span className="text-green-600">${orderDetails.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 transition-all duration-1000 delay-500 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={onNavigateToPendingOrder}
            className="flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Clock className="h-5 w-5" />
            <span>Track Order</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Receipt</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Share Order</span>
          </button>
        </div>

        {/* What's Next */}
        <div className={`bg-blue-50 rounded-2xl p-8 transition-all duration-1000 delay-700 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Order Processing</h4>
                <p className="text-sm text-gray-600">We'll prepare your items for shipment within 1-2 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Shipping Updates</h4>
                <p className="text-sm text-gray-600">You'll receive tracking information once your order ships.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Delivery</h4>
                <p className="text-sm text-gray-600">Your order will arrive by {orderDetails.estimatedDelivery}.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-900 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-gray-600 mb-4">
            Need help with your order? Our customer support team is here to assist you.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact Support
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              FAQ
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckoutPage;