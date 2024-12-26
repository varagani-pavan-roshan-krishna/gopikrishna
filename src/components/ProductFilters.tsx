import React from 'react';

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  colors,
  selectedColor,
  onColorChange,
  sortBy,
  onSortChange
}: FilterProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Colors</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}