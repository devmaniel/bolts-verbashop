/*
  # Seed Categories Data

  1. Categories Data
    - Insert all category data from categoryData.ts
    - Electronics, Premium Fruits, Home & Kitchen, Fashion, Beauty, Home Improvement, Sports/Toys/Luggage
    - Include subcategories, brands, and price ranges

  2. Data Structure
    - Convert TypeScript data to SQL format
    - Handle arrays and JSON data properly
    - Maintain data integrity
*/

-- Insert categories data
INSERT INTO categories (id, name, description, image, subcategories, brands, price_ranges) VALUES
(
  'electronics',
  'Electronics',
  'Latest gadgets and electronic devices',
  'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras', 'Smart Watches'],
  ARRAY['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Google'],
  '[
    {"label": "Under $500", "min": 0, "max": 500},
    {"label": "$500 - $1000", "min": 500, "max": 1000},
    {"label": "$1000 - $2000", "min": 1000, "max": 2000},
    {"label": "Above $2000", "min": 2000, "max": 10000}
  ]'::jsonb
),
(
  'premium-fruits',
  'Premium Fruits',
  'Fresh, organic, and premium quality fruits',
  'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Tropical Fruits', 'Berries', 'Citrus', 'Stone Fruits', 'Exotic Fruits', 'Organic'],
  ARRAY['Fresh Valley', 'Organic Harvest', 'Premium Select', 'Nature''s Best', 'Farm Fresh'],
  '[
    {"label": "Under $10", "min": 0, "max": 10},
    {"label": "$10 - $25", "min": 10, "max": 25},
    {"label": "$25 - $50", "min": 25, "max": 50},
    {"label": "Above $50", "min": 50, "max": 200}
  ]'::jsonb
),
(
  'home-kitchen',
  'Home & Kitchen',
  'Everything for your home and kitchen needs',
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Cookware', 'Small Appliances', 'Storage', 'Dinnerware', 'Home Decor', 'Cleaning'],
  ARRAY['KitchenAid', 'Cuisinart', 'OXO', 'Pyrex', 'Rubbermaid', 'Hamilton Beach'],
  '[
    {"label": "Under $50", "min": 0, "max": 50},
    {"label": "$50 - $150", "min": 50, "max": 150},
    {"label": "$150 - $300", "min": 150, "max": 300},
    {"label": "Above $300", "min": 300, "max": 1000}
  ]'::jsonb
),
(
  'fashion',
  'Fashion',
  'Trendy clothing and accessories for all',
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Men''s Clothing', 'Women''s Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'],
  ARRAY['Nike', 'Adidas', 'Zara', 'H&M', 'Levi''s', 'Calvin Klein', 'Tommy Hilfiger'],
  '[
    {"label": "Under $50", "min": 0, "max": 50},
    {"label": "$50 - $100", "min": 50, "max": 100},
    {"label": "$100 - $200", "min": 100, "max": 200},
    {"label": "Above $200", "min": 200, "max": 1000}
  ]'::jsonb
),
(
  'beauty',
  'Beauty',
  'Cosmetics and personal care products',
  'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Tools', 'Men''s Grooming'],
  ARRAY['L''Oreal', 'Maybelline', 'MAC', 'Clinique', 'Estee Lauder', 'Urban Decay'],
  '[
    {"label": "Under $25", "min": 0, "max": 25},
    {"label": "$25 - $50", "min": 25, "max": 50},
    {"label": "$50 - $100", "min": 50, "max": 100},
    {"label": "Above $100", "min": 100, "max": 500}
  ]'::jsonb
),
(
  'home-improvement',
  'Home Improvement',
  'Tools and materials for home projects',
  'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Tools', 'Hardware', 'Paint', 'Lighting', 'Plumbing', 'Electrical'],
  ARRAY['DeWalt', 'Black & Decker', 'Bosch', 'Makita', 'Stanley', 'Craftsman'],
  '[
    {"label": "Under $50", "min": 0, "max": 50},
    {"label": "$50 - $150", "min": 50, "max": 150},
    {"label": "$150 - $500", "min": 150, "max": 500},
    {"label": "Above $500", "min": 500, "max": 2000}
  ]'::jsonb
),
(
  'sports-toys-luggage',
  'Sports, Toys & Luggage',
  'Sports equipment, toys, and travel gear',
  'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  ARRAY['Sports Equipment', 'Fitness', 'Toys', 'Games', 'Luggage', 'Travel Accessories'],
  ARRAY['Nike', 'Adidas', 'Wilson', 'Spalding', 'LEGO', 'Samsonite', 'American Tourister'],
  '[
    {"label": "Under $50", "min": 0, "max": 50},
    {"label": "$50 - $150", "min": 50, "max": 150},
    {"label": "$150 - $300", "min": 150, "max": 300},
    {"label": "Above $300", "min": 300, "max": 1000}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  subcategories = EXCLUDED.subcategories,
  brands = EXCLUDED.brands,
  price_ranges = EXCLUDED.price_ranges,
  updated_at = now();