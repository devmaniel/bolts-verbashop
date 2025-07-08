import React from 'react';
import { ChevronRight, Smartphone, Droplets, Zap, Sofa, Watch, Flower, Gem } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const TopCategories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Mobile', 
      icon: Smartphone, 
      image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'electronics'
    },
    { 
      name: 'Cosmetics', 
      icon: Droplets, 
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'beauty'
    },
    { 
      name: 'Electronics', 
      icon: Zap, 
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'electronics'
    },
    { 
      name: 'Furniture', 
      icon: Sofa, 
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'home-kitchen'
    },
    { 
      name: 'Watches', 
      icon: Watch, 
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'electronics'
    },
    { 
      name: 'Decor', 
      icon: Flower, 
      image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'home-improvement'
    },
    { 
      name: 'Accessories', 
      icon: Gem, 
      image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      categoryId: 'fashion'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/category/$categoryId', params: { categoryId } });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Shop From <span className="text-blue-600">Top Categories</span>
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-2"></div>
          </div>
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index} 
                className="text-center group cursor-pointer"
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                <div className="relative mx-auto w-20 h-20 mb-3 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;