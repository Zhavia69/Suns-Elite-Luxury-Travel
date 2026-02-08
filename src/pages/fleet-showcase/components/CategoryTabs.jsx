import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      {/* Desktop Tabs */}
      <div className="hidden lg:flex items-center justify-center space-x-2 bg-muted/30 p-2 rounded-lg">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            className="flex-1 max-w-48"
          >
            {category?.name}
          </Button>
        ))}
      </div>
      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              className="whitespace-nowrap flex-shrink-0 min-w-32"
            >
              {category?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Category Description */}
      <div className="mt-4 text-center">
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          {categories?.find(cat => cat?.id === activeCategory)?.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryTabs;