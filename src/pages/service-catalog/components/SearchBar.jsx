import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchTerm, onClear }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onClear();
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalSearchTerm(value);
    
    // Real-time search with debounce
    if (value?.length === 0) {
      onClear();
    } else if (value?.length >= 2) {
      onSearch(value);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search services, destinations, or features..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localSearchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="default"
          className="hidden sm:flex"
        >
          <Icon name="Search" size={16} />
          <span className="ml-2">Search</span>
        </Button>
      </form>
      {/* Quick Search Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {['Airport Transfer', 'Executive Sedan', 'Safari Gateway', 'Corporate Transport']?.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setLocalSearchTerm(suggestion);
              onSearch(suggestion);
            }}
            className="text-xs bg-muted hover:bg-muted/80 text-foreground px-2 py-1 rounded-full luxury-transition"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;