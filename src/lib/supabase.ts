import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          image: string;
          subcategories: string[];
          brands: string[];
          price_ranges: PriceRange[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          image: string;
          subcategories?: string[];
          brands?: string[];
          price_ranges?: PriceRange[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image?: string;
          subcategories?: string[];
          brands?: string[];
          price_ranges?: PriceRange[];
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          brand: string;
          price: number;
          original_price: number | null;
          discount: number;
          rating: number;
          reviews: number;
          image: string;
          features: string[];
          in_stock: boolean;
          category_id: string;
          subcategory: string | null;
          colors: string[];
          sizes: string[];
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          brand: string;
          price: number;
          original_price?: number | null;
          discount?: number;
          rating?: number;
          reviews?: number;
          image: string;
          features?: string[];
          in_stock?: boolean;
          category_id: string;
          subcategory?: string | null;
          colors?: string[];
          sizes?: string[];
          description: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          brand?: string;
          price?: number;
          original_price?: number | null;
          discount?: number;
          rating?: number;
          reviews?: number;
          image?: string;
          features?: string[];
          in_stock?: boolean;
          category_id?: string;
          subcategory?: string | null;
          colors?: string[];
          sizes?: string[];
          description?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];