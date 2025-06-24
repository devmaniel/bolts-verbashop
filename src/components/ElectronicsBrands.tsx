import React from 'react';
import { ChevronRight } from 'lucide-react';

const ElectronicsBrands = () => {
  const brands = [
    {
      name: 'IPHONE',
      description: 'UP to 80% OFF',
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      bgColor: 'bg-gray-900'
    },
    {
      name: 'REALME',
      description: 'UP to 80% OFF',
      image: 'https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      bgColor: 'bg-yellow-400'
    },
    {
      name: 'XIAOMI',
      description: 'UP to 80% OFF',
      image: 'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Top <span className="text-blue-600">Electronics Brands</span>
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-2"></div>
          </div>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <div key={index} className={`${brand.bgColor} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer`}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{brand.name}</h3>
                  <p className="text-sm opacity-90">{brand.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectronicsBrands;