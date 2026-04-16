import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import ToolCard from '../components/ToolCard';
import TrendingStrip from '../components/TrendingStrip';
import { Ghost } from 'lucide-react';

const DEFAULT_FILTERS = {
  category: 'All',
  pricing: 'All',
  minRating: 0,
  sort: 'rating',
  showFavorites: false,
};

export default function HomePage() {
  const { tools, favorites } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const trendingTools = useMemo(() => tools.filter(t => t.trending), [tools]);

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'All') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.pricing !== 'All') {
      result = result.filter(t => t.pricing === filters.pricing || t.pricing.includes(filters.pricing));
    }

    if (filters.minRating > 0) {
      result = result.filter(t => t.rating >= filters.minRating);
    }

    if (filters.showFavorites) {
      result = result.filter(t => favorites.includes(t.id));
    }

    switch (filters.sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [tools, searchQuery, filters, favorites]);

  return (
    <div className="min-h-screen bg-animated">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main>
        <HeroSection toolCount={tools.length} trendingCount={trendingTools.length} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          {/* Trending strip */}
          {!searchQuery && filters.category === 'All' && (
            <TrendingStrip tools={trendingTools} />
          )}

          {/* Filters */}
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filteredTools.length}
              totalCount={tools.length}
            />
          </div>

          {/* Grid */}
          {filteredTools.length > 0 ? (
            <div className="card-grid">
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                <Ghost size={28} className="text-gray-500" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Try adjusting your filters or search query to discover more AI tools.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs text-gray-600">
          AI Tools Directory • Built with ❤️ •{' '}
          <span className="text-gray-500">Double-click any card to visit the tool</span>
        </p>
      </footer>
    </div>
  );
}
