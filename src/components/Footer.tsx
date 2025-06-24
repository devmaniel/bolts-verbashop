import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">VoiceShop</h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Contact Us</h4>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Whatsapp</span>
              </div>
              <p className="text-sm">+1 202-918-2132</p>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </div>
              <p className="text-sm">+1 202-918-2132</p>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Download App</h4>
              <div className="flex space-x-3">
                <img src="https://via.placeholder.com/120x40/000000/FFFFFF?text=App+Store" alt="App Store" className="h-10" />
                <img src="https://via.placeholder.com/120x40/000000/FFFFFF?text=Google+Play" alt="Google Play" className="h-10" />
              </div>
            </div>
          </div>

          {/* Most Popular Categories */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Most Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-200 transition-colors">Staples</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Beverages</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Personal Care</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Home Care</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Baby Care</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Vegetables & Fruits</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Snacks & Foods</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Dairy & Bakery</a></li>
            </ul>
          </div>

          {/* Customer Services */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Customer Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-200 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">E-waste Policy</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Cancellation & Return Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm mb-4">Subscribe to get updates on new products and offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-r-lg transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-500 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2022 All rights reserved. Reliance Retail Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;