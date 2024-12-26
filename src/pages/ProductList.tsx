import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProductFilters } from '../components/ProductFilters';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  color: string;
  stock: number;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortBy, setSortBy] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const categories = ['Electronics', 'Clothing', 'Mobile Phones'];
  const colors = ['Black', 'White', 'Blue'];

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from('products').select('*');

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      if (selectedColor) {
        query = query.eq('color', selectedColor);
      }

      if (sortBy) {
        switch (sortBy) {
          case 'price_asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price_desc':
            query = query.order('price', { ascending: false });
            break;
          case 'name_asc':
            query = query.order('name', { ascending: true });
            break;
        }
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      
      setProducts(data || []);
      setLoading(false);
    }

    fetchProducts();
  }, [searchQuery, selectedCategory, selectedColor, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8 space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              colors={colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}