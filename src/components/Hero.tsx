import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onCategoryClick?: (categoryId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryClick }) => {
  const handleShopNowClick = () => {
    if (onCategoryClick) {
      onCategoryClick('electronics');
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-12 lg:py-20">
          {/* Content */}
          <div className="flex-1 text-white">
            <p className="text-lg mb-2">Best Deal Online on smart watches</p>
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
              SMART WEARABLE.
            </h2>
            <p className="text-xl lg:text-2xl mb-8">UP to 80% OFF</p>
            
            <button 
              onClick={handleShopNowClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors mb-8"
            >
              Shop Now
            </button>
            
            {/* Carousel indicators */}
            <div className="flex space-x-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Watch Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500&h=500"
                alt="Smart Watch"
                className="w-72 h-72 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;