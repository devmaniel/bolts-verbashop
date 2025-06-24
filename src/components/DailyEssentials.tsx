import React from 'react';
import { ChevronRight } from 'lucide-react';

const DailyEssentials = () => {
  const essentials = [
    {
      name: 'Daily Essentials',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      featured: true
    },
    {
      name: 'Vegetables',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      name: 'Fruits',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      name: 'Strawberry',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/583843/pexels-photo-583843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      name: 'Mango',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      name: 'Cherry',
      description: 'UP to 50% OFF',
      image: 'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Daily <span className="text-blue-600">Essentials</span>
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-2"></div>
          </div>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {essentials.map((item, index) => (
            <div key={index} className={`${item.featured ? 'lg:col-span-2 lg:row-span-2' : ''} group cursor-pointer`}>
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    item.featured ? 'h-64 lg:h-full' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyEssentials;