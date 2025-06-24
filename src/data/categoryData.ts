export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  inStock: boolean;
  category: string;
  subcategory?: string;
  colors?: string[];
  sizes?: string[];
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
  brands: string[];
  priceRanges: { label: string; min: number; max: number }[];
}

export const categories: Record<string, Category> = {
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras', 'Smart Watches'],
    brands: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Google'],
    priceRanges: [
      { label: 'Under $500', min: 0, max: 500 },
      { label: '$500 - $1000', min: 500, max: 1000 },
      { label: '$1000 - $2000', min: 1000, max: 2000 },
      { label: 'Above $2000', min: 2000, max: 10000 }
    ]
  },
  'premium-fruits': {
    id: 'premium-fruits',
    name: 'Premium Fruits',
    description: 'Fresh, organic, and premium quality fruits',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Tropical Fruits', 'Berries', 'Citrus', 'Stone Fruits', 'Exotic Fruits', 'Organic'],
    brands: ['Fresh Valley', 'Organic Harvest', 'Premium Select', 'Nature\'s Best', 'Farm Fresh'],
    priceRanges: [
      { label: 'Under $10', min: 0, max: 10 },
      { label: '$10 - $25', min: 10, max: 25 },
      { label: '$25 - $50', min: 25, max: 50 },
      { label: 'Above $50', min: 50, max: 200 }
    ]
  },
  'home-kitchen': {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Everything for your home and kitchen needs',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Cookware', 'Small Appliances', 'Storage', 'Dinnerware', 'Home Decor', 'Cleaning'],
    brands: ['KitchenAid', 'Cuisinart', 'OXO', 'Pyrex', 'Rubbermaid', 'Hamilton Beach'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $150', min: 50, max: 150 },
      { label: '$150 - $300', min: 150, max: 300 },
      { label: 'Above $300', min: 300, max: 1000 }
    ]
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy clothing and accessories for all',
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'],
    brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: '$100 - $200', min: 100, max: 200 },
      { label: 'Above $200', min: 200, max: 1000 }
    ]
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty',
    description: 'Cosmetics and personal care products',
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Tools', 'Men\'s Grooming'],
    brands: ['L\'Oreal', 'Maybelline', 'MAC', 'Clinique', 'Estee Lauder', 'Urban Decay'],
    priceRanges: [
      { label: 'Under $25', min: 0, max: 25 },
      { label: '$25 - $50', min: 25, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: 'Above $100', min: 100, max: 500 }
    ]
  },
  'home-improvement': {
    id: 'home-improvement',
    name: 'Home Improvement',
    description: 'Tools and materials for home projects',
    image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Tools', 'Hardware', 'Paint', 'Lighting', 'Plumbing', 'Electrical'],
    brands: ['DeWalt', 'Black & Decker', 'Bosch', 'Makita', 'Stanley', 'Craftsman'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $150', min: 50, max: 150 },
      { label: '$150 - $500', min: 150, max: 500 },
      { label: 'Above $500', min: 500, max: 2000 }
    ]
  },
  'sports-toys-luggage': {
    id: 'sports-toys-luggage',
    name: 'Sports, Toys & Luggage',
    description: 'Sports equipment, toys, and travel gear',
    image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    subcategories: ['Sports Equipment', 'Fitness', 'Toys', 'Games', 'Luggage', 'Travel Accessories'],
    brands: ['Nike', 'Adidas', 'Wilson', 'Spalding', 'LEGO', 'Samsonite', 'American Tourister'],
    priceRanges: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $150', min: 50, max: 150 },
      { label: '$150 - $300', min: 150, max: 300 },
      { label: 'Above $300', min: 300, max: 1000 }
    ]
  }
};

export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    price: 1099,
    originalPrice: 1199,
    discount: 8,
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['128GB Storage', '6.7" Display', 'A16 Bionic Chip', '48MP Camera'],
    inStock: true,
    category: 'electronics',
    subcategory: 'Smartphones',
    colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
    description: 'The most advanced iPhone with Pro camera system and A16 Bionic chip.'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    rating: 4.6,
    reviews: 1923,
    image: 'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['256GB Storage', '6.8" Display', 'S Pen Included', '200MP Camera'],
    inStock: true,
    category: 'electronics',
    subcategory: 'Smartphones',
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    description: 'Ultimate smartphone with S Pen and professional-grade camera.'
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    rating: 4.7,
    reviews: 1456,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['M2 Chip', '13.6" Display', '256GB SSD', '18-hour battery'],
    inStock: true,
    category: 'electronics',
    subcategory: 'Laptops',
    colors: ['Space Gray', 'Silver', 'Gold', 'Starlight'],
    description: 'Supercharged by M2 chip for incredible performance and battery life.'
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 349,
    originalPrice: 399,
    discount: 13,
    rating: 4.5,
    reviews: 987,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Noise Canceling', '30-hour battery', 'Quick Charge', 'Touch Controls'],
    inStock: true,
    category: 'electronics',
    subcategory: 'Headphones',
    colors: ['Black', 'Silver'],
    description: 'Industry-leading noise canceling with premium sound quality.'
  },

  // Premium Fruits
  {
    id: 5,
    name: 'Organic Dragon Fruit',
    brand: 'Premium Select',
    price: 12,
    rating: 4.3,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Organic Certified', 'Rich in Antioxidants', 'Fresh Picked', 'Premium Quality'],
    inStock: true,
    category: 'premium-fruits',
    subcategory: 'Exotic Fruits',
    description: 'Fresh organic dragon fruit with sweet, mild flavor and stunning appearance.'
  },
  {
    id: 6,
    name: 'Premium Strawberries',
    brand: 'Fresh Valley',
    price: 8,
    originalPrice: 10,
    discount: 20,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.pexels.com/photos/583843/pexels-photo-583843.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Hand-picked', 'Sweet & Juicy', 'Vitamin C Rich', '1lb Pack'],
    inStock: true,
    category: 'premium-fruits',
    subcategory: 'Berries',
    description: 'Sweet, juicy strawberries perfect for snacking or desserts.'
  },
  {
    id: 7,
    name: 'Organic Mango',
    brand: 'Organic Harvest',
    price: 15,
    rating: 4.4,
    reviews: 189,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Organic Certified', 'Tree-ripened', 'Rich in Vitamins', '2lb Pack'],
    inStock: true,
    category: 'premium-fruits',
    subcategory: 'Tropical Fruits',
    description: 'Tree-ripened organic mangoes with tropical sweetness.'
  },

  // Home & Kitchen
  {
    id: 8,
    name: 'KitchenAid Stand Mixer',
    brand: 'KitchenAid',
    price: 379,
    originalPrice: 449,
    discount: 16,
    rating: 4.8,
    reviews: 1567,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['5-Quart Bowl', '10 Speeds', 'Tilt-Head Design', 'Multiple Attachments'],
    inStock: true,
    category: 'home-kitchen',
    subcategory: 'Small Appliances',
    colors: ['Empire Red', 'Onyx Black', 'Silver', 'White'],
    description: 'Professional-grade stand mixer for all your baking needs.'
  },
  {
    id: 9,
    name: 'Cuisinart Food Processor',
    brand: 'Cuisinart',
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['14-Cup Capacity', 'Stainless Steel Blades', 'Multiple Discs', 'BPA-Free'],
    inStock: true,
    category: 'home-kitchen',
    subcategory: 'Small Appliances',
    description: 'Versatile food processor for chopping, slicing, and more.'
  },

  // Fashion
  {
    id: 10,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    originalPrice: 180,
    discount: 17,
    rating: 4.4,
    reviews: 2341,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Air Max Technology', 'Breathable Mesh', 'Rubber Outsole', 'Lifestyle Design'],
    inStock: true,
    category: 'fashion',
    subcategory: 'Shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Navy/Red', 'Gray/Blue'],
    description: 'Comfortable lifestyle sneakers with iconic Air Max cushioning.'
  },
  {
    id: 11,
    name: 'Levi\'s 501 Original Jeans',
    brand: 'Levi\'s',
    price: 89,
    originalPrice: 98,
    discount: 9,
    rating: 4.3,
    reviews: 1876,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['100% Cotton', 'Straight Fit', 'Button Fly', 'Classic 5-Pocket'],
    inStock: true,
    category: 'fashion',
    subcategory: 'Men\'s Clothing',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    description: 'The original blue jean with timeless style and comfort.'
  },

  // Beauty
  {
    id: 12,
    name: 'L\'Oreal Revitalift Serum',
    brand: 'L\'Oreal',
    price: 24,
    originalPrice: 29,
    discount: 17,
    rating: 4.2,
    reviews: 567,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Anti-Aging', 'Vitamin C', 'Hyaluronic Acid', '30ml Bottle'],
    inStock: true,
    category: 'beauty',
    subcategory: 'Skincare',
    description: 'Advanced anti-aging serum with vitamin C and hyaluronic acid.'
  },
  {
    id: 13,
    name: 'MAC Lipstick Collection',
    brand: 'MAC',
    price: 19,
    rating: 4.6,
    reviews: 1234,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Matte Finish', 'Long-lasting', 'Rich Pigment', 'Iconic Packaging'],
    inStock: true,
    category: 'beauty',
    subcategory: 'Makeup',
    colors: ['Ruby Woo', 'Velvet Teddy', 'Diva', 'Candy Yum-Yum'],
    description: 'Iconic matte lipstick with rich color and long-lasting wear.'
  },

  // Home Improvement
  {
    id: 14,
    name: 'DeWalt Cordless Drill',
    brand: 'DeWalt',
    price: 129,
    originalPrice: 149,
    discount: 13,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['20V Battery', '2-Speed Transmission', 'LED Light', 'Compact Design'],
    inStock: true,
    category: 'home-improvement',
    subcategory: 'Tools',
    description: 'Powerful cordless drill for all your DIY projects.'
  },
  {
    id: 15,
    name: 'Bosch Circular Saw',
    brand: 'Bosch',
    price: 179,
    originalPrice: 199,
    discount: 10,
    rating: 4.5,
    reviews: 456,
    image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['7.25" Blade', 'Electric Brake', 'Magnesium Base', 'Dust Port'],
    inStock: true,
    category: 'home-improvement',
    subcategory: 'Tools',
    description: 'Professional-grade circular saw with precision cutting.'
  },

  // Sports, Toys & Luggage
  {
    id: 16,
    name: 'Nike Basketball',
    brand: 'Nike',
    price: 29,
    originalPrice: 35,
    discount: 17,
    rating: 4.4,
    reviews: 678,
    image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['Official Size', 'Durable Rubber', 'Deep Channels', 'Indoor/Outdoor'],
    inStock: true,
    category: 'sports-toys-luggage',
    subcategory: 'Sports Equipment',
    description: 'Official size basketball perfect for indoor and outdoor play.'
  },
  {
    id: 17,
    name: 'LEGO Creator Set',
    brand: 'LEGO',
    price: 79,
    originalPrice: 89,
    discount: 11,
    rating: 4.8,
    reviews: 1234,
    image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['500+ Pieces', '3-in-1 Build', 'Ages 8+', 'Creative Building'],
    inStock: true,
    category: 'sports-toys-luggage',
    subcategory: 'Toys',
    description: 'Creative building set with multiple build options.'
  },
  {
    id: 18,
    name: 'Samsonite Luggage Set',
    brand: 'Samsonite',
    price: 299,
    originalPrice: 349,
    discount: 14,
    rating: 4.6,
    reviews: 567,
    image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    features: ['3-Piece Set', 'Spinner Wheels', 'TSA Lock', 'Lightweight'],
    inStock: true,
    category: 'sports-toys-luggage',
    subcategory: 'Luggage',
    colors: ['Black', 'Navy', 'Silver'],
    description: 'Durable 3-piece luggage set perfect for all your travels.'
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (categoryId: string, subcategory: string): Product[] => {
  return products.filter(product => 
    product.category === categoryId && product.subcategory === subcategory
  );
};

export const getProductsByBrand = (categoryId: string, brand: string): Product[] => {
  return products.filter(product => 
    product.category === categoryId && product.brand === brand
  );
};

export const getProductsByPriceRange = (categoryId: string, min: number, max: number): Product[] => {
  return products.filter(product => 
    product.category === categoryId && product.price >= min && product.price <= max
  );
};