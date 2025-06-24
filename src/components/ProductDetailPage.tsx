import React, { useState } from 'react';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, Truck, Shield, RotateCcw, ThumbsUp, MoreHorizontal } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  colors: { name: string; value: string; image: string }[];
  sizes: string[];
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  category: string;
}

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onBack }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('product-details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, this would come from API/props
  const product: Product = {
    id: productId,
    name: 'ONE LIFE GRAPHIC T-SHIRT',
    brand: 'VoiceShop',
    price: 260,
    originalPrice: 300,
    discount: 40,
    rating: 4.6,
    reviews: 451,
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600'
    ],
    colors: [
      { name: 'Olive Green', value: '#6B7C32', image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600' },
      { name: 'Forest Green', value: '#2D5016', image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600' },
      { name: 'Navy Blue', value: '#1E3A8A', image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500&h=600' }
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    features: ['100% Cotton', 'Machine Washable', 'Graphic Print', 'Regular Fit'],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Sleeve': 'Short Sleeve',
      'Neckline': 'Round Neck',
      'Care': 'Machine Wash'
    },
    inStock: true,
    category: 'T-Shirts'
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Polo with Contrast Trims',
      price: 212,
      originalPrice: 242,
      discount: 20,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
    },
    {
      id: 3,
      name: 'Gradient Graphic T-shirt',
      price: 145,
      originalPrice: 145,
      discount: 0,
      rating: 3.9,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
    },
    {
      id: 4,
      name: 'Polo with Tipping Details',
      price: 180,
      originalPrice: 180,
      discount: 0,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
    },
    {
      id: 5,
      name: 'Black Striped T-shirt',
      price: 120,
      originalPrice: 160,
      discount: 25,
      rating: 4.2,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Samantha D.',
      rating: 4.5,
      date: 'August 14, 2023',
      comment: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt.',
      verified: true,
      helpful: 12,
      avatar: 'SD'
    },
    {
      id: 2,
      name: 'Alex M.',
      rating: 4,
      date: 'August 15, 2023',
      comment: 'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.',
      verified: true,
      helpful: 8,
      avatar: 'AM'
    },
    {
      id: 3,
      name: 'Ethan R.',
      rating: 3.5,
      date: 'August 16, 2023',
      comment: 'This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt.',
      verified: false,
      helpful: 5,
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'Olivia P.',
      rating: 4,
      date: 'August 17, 2023',
      comment: 'As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out.',
      verified: true,
      helpful: 15,
      avatar: 'OP'
    },
    {
      id: 5,
      name: 'Liam K.',
      rating: 4,
      date: 'August 18, 2023',
      comment: 'This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion.',
      verified: true,
      helpful: 9,
      avatar: 'LK'
    },
    {
      id: 6,
      name: 'Ava H.',
      rating: 4.5,
      date: 'August 19, 2023',
      comment: 'I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.',
      verified: true,
      helpful: 11,
      avatar: 'AH'
    },
    {
      id: 7,
      name: 'Marcus T.',
      rating: 5,
      date: 'August 20, 2023',
      comment: 'Outstanding quality and design! The material is premium, the fit is perfect, and the graphic design is absolutely stunning. I\'ve received so many compliments wearing this shirt. Definitely worth every penny!',
      verified: true,
      helpful: 18,
      avatar: 'MT'
    },
    {
      id: 8,
      name: 'Isabella C.',
      rating: 3.5,
      date: 'August 21, 2023',
      comment: 'Good quality t-shirt with a nice design. The fabric is comfortable and the print seems durable. However, I wish there were more color options available. Overall, satisfied with the purchase.',
      verified: false,
      helpful: 6,
      avatar: 'IC'
    }
  ];

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${sizeClass} ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleColorChange = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setSelectedImageIndex(0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
            <span className="mx-2">/</span>
            <button onClick={onBack} className="hover:text-blue-600 transition-colors">Shop</button>
            <span className="mx-2">/</span>
            <span>Men</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">T-shirts</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.colors[selectedColor].image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-1 aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating, 'md')}
                  <span className="ml-2 text-lg font-medium">{product.rating}/5</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Select Colors</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === index ? 'border-gray-900 scale-110' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Choose Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-gray-100 text-gray-900 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-xl">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <button className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['Product Details', 'Rating & Reviews', 'FAQs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' & ', '-').replace(' ', '-'))}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.toLowerCase().replace(' & ', '-').replace(' ', '-')
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'product-details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <dt className="w-24 text-gray-600">{key}:</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'rating-reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium">All Reviews ({reviews.length})</h3>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Latest</option>
                      <option>Oldest</option>
                      <option>Highest Rating</option>
                      <option>Lowest Rating</option>
                    </select>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium">
                      Write a Review
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-medium text-sm">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{review.name}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                  ✓ Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Posted on {review.date}</span>
                        <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium mb-2">What is the return policy?</h4>
                  <p className="text-gray-600">We offer a 30-day return policy for all unworn items with original tags.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium mb-2">How do I care for this t-shirt?</h4>
                  <p className="text-gray-600">Machine wash cold with like colors. Tumble dry low. Do not bleach or iron directly on print.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium mb-2">What is the fit like?</h4>
                  <p className="text-gray-600">This t-shirt has a regular fit. If you prefer a looser fit, consider sizing up.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(relatedProduct.rating)}
                  <span className="ml-2 text-sm text-gray-600">{relatedProduct.rating}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">${relatedProduct.price}</span>
                  {relatedProduct.originalPrice > relatedProduct.price && (
                    <>
                      <span className="text-sm text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                      <span className="text-sm text-red-600">-{relatedProduct.discount}%</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;