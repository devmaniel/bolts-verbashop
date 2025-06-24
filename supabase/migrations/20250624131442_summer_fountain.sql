/*
  # Seed Products Data

  1. Products Data
    - Insert all product data from categoryData.ts
    - 18 products across all categories
    - Include all product attributes and relationships

  2. Data Integrity
    - Ensure foreign key relationships
    - Handle nullable fields properly
    - Maintain data consistency
*/

-- Insert products data
INSERT INTO products (
  id, name, brand, price, original_price, discount, rating, reviews, image, 
  features, in_stock, category_id, subcategory, colors, sizes, description
) VALUES
-- Electronics
(
  1, 'iPhone 14 Pro Max', 'Apple', 1099.00, 1199.00, 8, 4.8, 2847,
  'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['128GB Storage', '6.7" Display', 'A16 Bionic Chip', '48MP Camera'],
  true, 'electronics', 'Smartphones',
  ARRAY['Deep Purple', 'Gold', 'Silver', 'Space Black'], ARRAY[]::text[],
  'The most advanced iPhone with Pro camera system and A16 Bionic chip.'
),
(
  2, 'Samsung Galaxy S23 Ultra', 'Samsung', 999.00, 1199.00, 17, 4.6, 1923,
  'https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['256GB Storage', '6.8" Display', 'S Pen Included', '200MP Camera'],
  true, 'electronics', 'Smartphones',
  ARRAY['Phantom Black', 'Cream', 'Green', 'Lavender'], ARRAY[]::text[],
  'Ultimate smartphone with S Pen and professional-grade camera.'
),
(
  3, 'MacBook Air M2', 'Apple', 1199.00, 1299.00, 8, 4.7, 1456,
  'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['M2 Chip', '13.6" Display', '256GB SSD', '18-hour battery'],
  true, 'electronics', 'Laptops',
  ARRAY['Space Gray', 'Silver', 'Gold', 'Starlight'], ARRAY[]::text[],
  'Supercharged by M2 chip for incredible performance and battery life.'
),
(
  4, 'Sony WH-1000XM5', 'Sony', 349.00, 399.00, 13, 4.5, 987,
  'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Noise Canceling', '30-hour battery', 'Quick Charge', 'Touch Controls'],
  true, 'electronics', 'Headphones',
  ARRAY['Black', 'Silver'], ARRAY[]::text[],
  'Industry-leading noise canceling with premium sound quality.'
),

-- Premium Fruits
(
  5, 'Organic Dragon Fruit', 'Premium Select', 12.00, NULL, 0, 4.3, 156,
  'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Organic Certified', 'Rich in Antioxidants', 'Fresh Picked', 'Premium Quality'],
  true, 'premium-fruits', 'Exotic Fruits',
  ARRAY[]::text[], ARRAY[]::text[],
  'Fresh organic dragon fruit with sweet, mild flavor and stunning appearance.'
),
(
  6, 'Premium Strawberries', 'Fresh Valley', 8.00, 10.00, 20, 4.6, 234,
  'https://images.pexels.com/photos/583843/pexels-photo-583843.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Hand-picked', 'Sweet & Juicy', 'Vitamin C Rich', '1lb Pack'],
  true, 'premium-fruits', 'Berries',
  ARRAY[]::text[], ARRAY[]::text[],
  'Sweet, juicy strawberries perfect for snacking or desserts.'
),
(
  7, 'Organic Mango', 'Organic Harvest', 15.00, NULL, 0, 4.4, 189,
  'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Organic Certified', 'Tree-ripened', 'Rich in Vitamins', '2lb Pack'],
  true, 'premium-fruits', 'Tropical Fruits',
  ARRAY[]::text[], ARRAY[]::text[],
  'Tree-ripened organic mangoes with tropical sweetness.'
),

-- Home & Kitchen
(
  8, 'KitchenAid Stand Mixer', 'KitchenAid', 379.00, 449.00, 16, 4.8, 1567,
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['5-Quart Bowl', '10 Speeds', 'Tilt-Head Design', 'Multiple Attachments'],
  true, 'home-kitchen', 'Small Appliances',
  ARRAY['Empire Red', 'Onyx Black', 'Silver', 'White'], ARRAY[]::text[],
  'Professional-grade stand mixer for all your baking needs.'
),
(
  9, 'Cuisinart Food Processor', 'Cuisinart', 199.00, 249.00, 20, 4.5, 892,
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['14-Cup Capacity', 'Stainless Steel Blades', 'Multiple Discs', 'BPA-Free'],
  true, 'home-kitchen', 'Small Appliances',
  ARRAY[]::text[], ARRAY[]::text[],
  'Versatile food processor for chopping, slicing, and more.'
),

-- Fashion
(
  10, 'Nike Air Max 270', 'Nike', 150.00, 180.00, 17, 4.4, 2341,
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Air Max Technology', 'Breathable Mesh', 'Rubber Outsole', 'Lifestyle Design'],
  true, 'fashion', 'Shoes',
  ARRAY['Black/White', 'Navy/Red', 'Gray/Blue'],
  ARRAY['7', '8', '9', '10', '11', '12'],
  'Comfortable lifestyle sneakers with iconic Air Max cushioning.'
),
(
  11, 'Levi''s 501 Original Jeans', 'Levi''s', 89.00, 98.00, 9, 4.3, 1876,
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['100% Cotton', 'Straight Fit', 'Button Fly', 'Classic 5-Pocket'],
  true, 'fashion', 'Men''s Clothing',
  ARRAY['Dark Blue', 'Light Blue', 'Black'],
  ARRAY['28', '30', '32', '34', '36', '38'],
  'The original blue jean with timeless style and comfort.'
),

-- Beauty
(
  12, 'L''Oreal Revitalift Serum', 'L''Oreal', 24.00, 29.00, 17, 4.2, 567,
  'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Anti-Aging', 'Vitamin C', 'Hyaluronic Acid', '30ml Bottle'],
  true, 'beauty', 'Skincare',
  ARRAY[]::text[], ARRAY[]::text[],
  'Advanced anti-aging serum with vitamin C and hyaluronic acid.'
),
(
  13, 'MAC Lipstick Collection', 'MAC', 19.00, NULL, 0, 4.6, 1234,
  'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Matte Finish', 'Long-lasting', 'Rich Pigment', 'Iconic Packaging'],
  true, 'beauty', 'Makeup',
  ARRAY['Ruby Woo', 'Velvet Teddy', 'Diva', 'Candy Yum-Yum'], ARRAY[]::text[],
  'Iconic matte lipstick with rich color and long-lasting wear.'
),

-- Home Improvement
(
  14, 'DeWalt Cordless Drill', 'DeWalt', 129.00, 149.00, 13, 4.7, 892,
  'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['20V Battery', '2-Speed Transmission', 'LED Light', 'Compact Design'],
  true, 'home-improvement', 'Tools',
  ARRAY[]::text[], ARRAY[]::text[],
  'Powerful cordless drill for all your DIY projects.'
),
(
  15, 'Bosch Circular Saw', 'Bosch', 179.00, 199.00, 10, 4.5, 456,
  'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['7.25" Blade', 'Electric Brake', 'Magnesium Base', 'Dust Port'],
  true, 'home-improvement', 'Tools',
  ARRAY[]::text[], ARRAY[]::text[],
  'Professional-grade circular saw with precision cutting.'
),

-- Sports, Toys & Luggage
(
  16, 'Nike Basketball', 'Nike', 29.00, 35.00, 17, 4.4, 678,
  'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['Official Size', 'Durable Rubber', 'Deep Channels', 'Indoor/Outdoor'],
  true, 'sports-toys-luggage', 'Sports Equipment',
  ARRAY[]::text[], ARRAY[]::text[],
  'Official size basketball perfect for indoor and outdoor play.'
),
(
  17, 'LEGO Creator Set', 'LEGO', 79.00, 89.00, 11, 4.8, 1234,
  'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['500+ Pieces', '3-in-1 Build', 'Ages 8+', 'Creative Building'],
  true, 'sports-toys-luggage', 'Toys',
  ARRAY[]::text[], ARRAY[]::text[],
  'Creative building set with multiple build options.'
),
(
  18, 'Samsonite Luggage Set', 'Samsonite', 299.00, 349.00, 14, 4.6, 567,
  'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  ARRAY['3-Piece Set', 'Spinner Wheels', 'TSA Lock', 'Lightweight'],
  true, 'sports-toys-luggage', 'Luggage',
  ARRAY['Black', 'Navy', 'Silver'], ARRAY[]::text[],
  'Durable 3-piece luggage set perfect for all your travels.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  discount = EXCLUDED.discount,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  image = EXCLUDED.image,
  features = EXCLUDED.features,
  in_stock = EXCLUDED.in_stock,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  description = EXCLUDED.description,
  updated_at = now();