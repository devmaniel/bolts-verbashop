import { supabase } from '../lib/supabase';
import type { Category, Product } from '../lib/supabase';

export class CategoryService {
  // Get all categories
  static async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  }

  // Get category by ID
  static async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }

    return data;
  }

  // Get all products
  static async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data || [];
  }

  // Get products by category
  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .eq('in_stock', true)
      .order('name');

    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }

    return data || [];
  }

  // Get products by subcategory
  static async getProductsBySubcategory(categoryId: string, subcategory: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .eq('subcategory', subcategory)
      .eq('in_stock', true)
      .order('name');

    if (error) {
      console.error('Error fetching products by subcategory:', error);
      throw error;
    }

    return data || [];
  }

  // Get products by brand
  static async getProductsByBrand(categoryId: string, brand: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .eq('brand', brand)
      .eq('in_stock', true)
      .order('name');

    if (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }

    return data || [];
  }

  // Get products by price range
  static async getProductsByPriceRange(categoryId: string, minPrice: number, maxPrice: number): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .gte('price', minPrice)
      .lte('price', maxPrice)
      .eq('in_stock', true)
      .order('price');

    if (error) {
      console.error('Error fetching products by price range:', error);
      throw error;
    }

    return data || [];
  }

  // Search products
  static async searchProducts(query: string, categoryId?: string): Promise<Product[]> {
    let queryBuilder = supabase
      .from('products')
      .select('*')
      .eq('in_stock', true);

    if (categoryId) {
      queryBuilder = queryBuilder.eq('category_id', categoryId);
    }

    // Search in name, brand, and description
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`);

    const { data, error } = await queryBuilder.order('name');

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data || [];
  }

  // Get product by ID
  static async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  }

  // Get featured products (high rating, in stock)
  static async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .gte('rating', 4.0)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }

    return data || [];
  }

  // Get products on sale (with discount)
  static async getProductsOnSale(limit: number = 10): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .gt('discount', 0)
      .order('discount', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching products on sale:', error);
      throw error;
    }

    return data || [];
  }

  // Get related products (same category, different product)
  static async getRelatedProducts(productId: number, categoryId: string, limit: number = 4): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', productId)
      .eq('in_stock', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related products:', error);
      throw error;
    }

    return data || [];
  }
}