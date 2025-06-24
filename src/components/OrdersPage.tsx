import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Eye,
  Download,
  RefreshCw,
  Star,
  MessageCircle,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'on-delivery' | 'completed' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    variant?: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  estimatedDelivery?: string;
  deliveredDate?: string;
  cancelledDate?: string;
  cancelReason?: string;
  trackingNumber?: string;
  shippingAddress: string;
}

interface OrdersPageProps {
  onBack: () => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'on-delivery' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '#VO2024001234',
      date: '2024-03-15',
      status: 'pending',
      total: 2426,
      items: [
        {
          id: 1,
          name: 'Apple iPhone 14 Pro Max',
          variant: '128GB Deep Purple',
          quantity: 1,
          price: 1399,
          image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        },
        {
          id: 2,
          name: 'AirPods Max Silver',
          quantity: 1,
          price: 549,
          image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        }
      ],
      estimatedDelivery: '2024-03-22',
      trackingNumber: 'VOS1234567890',
      shippingAddress: '1131 Dusty Townline, Jacksonville, TX 40322'
    },
    {
      id: '2',
      orderNumber: '#VO2024001235',
      date: '2024-03-10',
      status: 'on-delivery',
      total: 1299,
      items: [
        {
          id: 3,
          name: 'Samsung Galaxy S23 Ultra',
          variant: '256GB Phantom Black',
          quantity: 1,
          price: 1299,
          image: 'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        }
      ],
      estimatedDelivery: '2024-03-18',
      trackingNumber: 'VOS1234567891',
      shippingAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
    },
    {
      id: '3',
      orderNumber: '#VO2024001236',
      date: '2024-03-05',
      status: 'completed',
      total: 899,
      items: [
        {
          id: 4,
          name: 'Apple Watch Series 9',
          variant: 'GPS 41mm Starlight',
          quantity: 1,
          price: 399,
          image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        },
        {
          id: 5,
          name: 'iPhone 13',
          variant: '128GB Blue',
          quantity: 1,
          price: 500,
          image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        }
      ],
      deliveredDate: '2024-03-12',
      trackingNumber: 'VOS1234567892',
      shippingAddress: '1131 Dusty Townline, Jacksonville, TX 40322'
    },
    {
      id: '4',
      orderNumber: '#VO2024001237',
      date: '2024-03-01',
      status: 'cancelled',
      total: 1599,
      items: [
        {
          id: 6,
          name: 'MacBook Air M2',
          variant: '256GB Space Gray',
          quantity: 1,
          price: 1599,
          image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        }
      ],
      cancelledDate: '2024-03-02',
      cancelReason: 'Customer requested cancellation',
      shippingAddress: '2715 Ash Dr. San Jose, South Dakota 83475'
    },
    {
      id: '5',
      orderNumber: '#VO2024001238',
      date: '2024-02-28',
      status: 'completed',
      total: 649,
      items: [
        {
          id: 7,
          name: 'iPad Air',
          variant: '64GB Wi-Fi',
          quantity: 1,
          price: 649,
          image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
        }
      ],
      deliveredDate: '2024-03-05',
      trackingNumber: 'VOS1234567893',
      shippingAddress: '1131 Dusty Townline, Jacksonville, TX 40322'
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'on-delivery':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Processing';
      case 'on-delivery':
        return 'On Delivery';
      case 'completed':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getTabCount = (status: Order['status'] | 'all') => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  const OrderDetailModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XCircle className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Info */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">${order.total}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking:</span>
                      <span className="font-mono text-sm">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">{order.shippingAddress}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">{item.variant}</p>
                      )}
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status-specific information */}
          {order.status === 'completed' && order.deliveredDate && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Order Delivered</h3>
              </div>
              <p className="text-green-700">
                Your order was successfully delivered on {new Date(order.deliveredDate).toLocaleDateString()}
              </p>
              <div className="flex space-x-4 mt-4">
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Rate Order</span>
                </button>
                <button className="flex items-center space-x-2 border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          )}

          {order.status === 'cancelled' && (
            <div className="mt-8 p-6 bg-red-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">Order Cancelled</h3>
              </div>
              <p className="text-red-700 mb-2">
                This order was cancelled on {order.cancelledDate && new Date(order.cancelledDate).toLocaleDateString()}
              </p>
              {order.cancelReason && (
                <p className="text-red-600 text-sm">Reason: {order.cancelReason}</p>
              )}
            </div>
          )}

          {order.status === 'on-delivery' && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Out for Delivery</h3>
              </div>
              <p className="text-blue-700">
                Your order is on its way! Expected delivery: {order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          )}

          {order.status === 'pending' && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-900">Order Processing</h3>
              </div>
              <p className="text-yellow-700">
                We're preparing your order for shipment. Expected delivery: {order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Back to Home</span>
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by number or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <RefreshCw className="h-5 w-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Orders' },
                { key: 'pending', label: 'Processing' },
                { key: 'on-delivery', label: 'On Delivery' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab.key
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.key
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getTabCount(tab.key as any)}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Orders List */}
          <div className="p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms' : 'You haven\'t placed any orders yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} mb-2`}>
                          {getStatusText(order.status)}
                        </div>
                        <p className="font-bold text-lg">${order.total}</p>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg border-2 border-white object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.items[0].name}
                          {order.items.length > 1 && ` and ${order.items.length - 1} more`}
                        </p>
                      </div>
                    </div>

                    {/* Status-specific info */}
                    {order.status === 'on-delivery' && order.estimatedDelivery && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">
                            Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {order.status === 'completed' && order.deliveredDate && (
                      <div className="bg-green-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">
                            Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {order.status === 'cancelled' && order.cancelledDate && (
                      <div className="bg-red-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-700">
                            Cancelled on {new Date(order.cancelledDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        {order.status === 'completed' && (
                          <>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                              <Star className="h-4 w-4" />
                              <span>Rate</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                              <Download className="h-4 w-4" />
                              <span>Invoice</span>
                            </button>
                          </>
                        )}
                        {(order.status === 'pending' || order.status === 'on-delivery') && (
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>Support</span>
                          </button>
                        )}
                      </div>
                      
                      {order.trackingNumber && order.status !== 'cancelled' && (
                        <span className="text-sm text-gray-500 font-mono">
                          {order.trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with Your Orders?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Call Support</h4>
                <p className="text-gray-600 text-sm">Get immediate help with your orders</p>
                <p className="text-blue-600 font-medium">+1 202-918-2132</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Email Support</h4>
                <p className="text-gray-600 text-sm">Send us your questions anytime</p>
                <p className="text-blue-600 font-medium">support@voiceshop.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;