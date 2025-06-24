import React from 'react';
import { ChevronRight } from 'lucide-react';

const SmartphoneDeals = () => {
  const deals = [
    {
      name: 'Galaxy S22 Ultra',
      image: 'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      currentPrice: '₹23999',
      originalPrice: '₹74999',
      discount: '68%',
      savings: '₹35999'
    },
    {
      name: 'Galaxy M13 (4GB | 64 GB)',
      image: 'https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      currentPrice: '₹10999',
      originalPrice: '₹14999',
      discount: '29%',
      savings: '₹4000'
    },
    {
      name: 'Galaxy M33 (4GB | 64 GB)',
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      currentPrice: '₹16999',
      originalPrice: '₹20999',
      discount: '60%',
      savings: '₹8000'
    },
    {
      name: 'Galaxy M53 (4GB | 64 GB)',
      image: 'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      currentPrice: '₹31999',
      originalPrice: '₹40999',
      discount: '53%',
      savings: '₹9000'
    },
    {
      name: 'Galaxy S22 Ultra',
      image: 'https://images.pexels.com/photos/1445819/pexels-photo-1445819.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      currentPrice: '₹67999',
      originalPrice: '₹89999',
      discount: '60%',
      savings: '₹18000'
    }
  ];

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
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {deals.map((deal, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  {deal.discount}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{deal.name}</h3>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">{deal.currentPrice}</span>
                  <span className="text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                </div>
                <p className="text-sm text-green-600">Save: {deal.savings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartphoneDeals;