/*
  # E-commerce Database Schema

  1. New Tables
    - `categories`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `image` (text)
      - `subcategories` (text array)
      - `brands` (text array)
      - `price_ranges` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (integer, primary key)
      - `name` (text)
      - `brand` (text)
      - `price` (decimal)
      - `original_price` (decimal, nullable)
      - `discount` (integer, nullable)
      - `rating` (decimal)
      - `reviews` (integer)
      - `image` (text)
      - `features` (text array)
      - `in_stock` (boolean)
      - `category_id` (text, foreign key)
      - `subcategory` (text, nullable)
      - `colors` (text array, nullable)
      - `sizes` (text array, nullable)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage data

  3. Indexes
    - Add indexes for better query performance
    - Category and brand filtering
    - Price range queries
    - Search functionality
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  subcategories text[] DEFAULT '{}',
  brands text[] DEFAULT '{}',
  price_ranges jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id integer PRIMARY KEY,
  name text NOT NULL,
  brand text NOT NULL,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  discount integer DEFAULT 0,
  rating decimal(2,1) NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  image text NOT NULL,
  features text[] DEFAULT '{}',
  in_stock boolean DEFAULT true,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  subcategory text,
  colors text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products can be managed by authenticated users"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();