/*
  # Add color field to products table

  1. Changes
    - Add color column to products table
    - Add sample products for different categories
*/

-- Add color column
ALTER TABLE products ADD COLUMN IF NOT EXISTS color text;

-- Add sample products
INSERT INTO products (name, description, price, category, color, stock, image_url) VALUES
  -- Electronics
  ('4K Smart TV', '55-inch 4K Ultra HD Smart LED TV', 45999.99, 'Electronics', 'Black', 10, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  ('Wireless Earbuds', 'True Wireless Bluetooth Earbuds', 2999.99, 'Electronics', 'White', 50, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  
  -- Clothing
  ('Cotton T-Shirt', 'Premium Cotton Round Neck T-Shirt', 599.99, 'Clothing', 'Blue', 100, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  ('Denim Jeans', 'Classic Fit Denim Jeans', 1499.99, 'Clothing', 'Blue', 50, 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  ('Formal Shirt', 'Cotton Formal Shirt', 899.99, 'Clothing', 'White', 75, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  
  -- Mobile Phones
  ('Smartphone Pro', 'Latest flagship smartphone', 79999.99, 'Mobile Phones', 'Black', 15, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
  ('Budget Phone', 'Affordable smartphone with great features', 12999.99, 'Mobile Phones', 'Blue', 30, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');