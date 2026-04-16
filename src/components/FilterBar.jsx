import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { CATEGORIES, PRICING_TYPES, SORT_OPTIONS, CATEGORY_COLORS } from '../data/tools';

export default function FilterBar({ filters, onFilterChange, resultCount, totalCount }) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters = filters.category !== 'All' || filters.pricing !== 'All' || filters.minRating > 0 || filters.showFavorites;

  const clearFilters = () => {
    onFilterChange({ category: 'All', pricing: 'All', minRating: 0, showFavorites: false });
  };

  return (
    <div className="space-y-3">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setShowMobileFilters(s => !s)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-sm text-gray-300"
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-brand-500" />}
          <ChevronDown size={12} className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>
        <p className="text-xs text-gray-500">
          <span className="text-white font-medium">{resultCount}</span> / {totalCount} tools
        </p>
      </div>

      {/* Filter rows */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-3`}>
        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium shrink-0">Category:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => {
              const active = filters.category === cat;
              const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS.All;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`text-xs px-3 py-1 rounded-full transition-all font-medium ${
                    active
                      ? `${color.bg} ${color.text} border ${color.border}`
                      : 'glass border border-white/8 text-gray-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing + Sort + Rating row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Pricing:</span>
            <div className="flex items-center gap-1.5">
              {PRICING_TYPES.map(p => (
                <button
                  key={p}
                  onClick={() => onFilterChange({ ...filters, pricing: p })}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                    filters.pricing === p
                      ? 'bg-brand-600 text-white'
                      : 'glass border border-white/8 text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort:</span>
            <select
              value={filters.sort}
              onChange={e => onFilterChange({ ...filters, sort: e.target.value })}
              className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-gray-300 outline-none hover:border-white/20 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value} className="bg-[#1a1a2e]">{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Min rating:</span>
            <div className="flex items-center gap-1">
              {[0, 3, 4, 4.5].map(r => (
                <button
                  key={r}
                  onClick={() => onFilterChange({ ...filters, minRating: r })}
                  className={`text-xs px-2 py-1 rounded-lg transition-all ${
                    filters.minRating === r
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'glass border border-white/8 text-gray-400 hover:text-white'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}+★`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onFilterChange({ ...filters, showFavorites: !filters.showFavorites })}
            className={`text-xs px-3 py-1 rounded-full transition-all ${
              filters.showFavorites
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'glass border border-white/8 text-gray-400 hover:text-white'
            }`}
          >
            ❤️ Favorites
          </button>

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <X size={12} />
              Clear
            </motion.button>
          )}
        </div>
      </div>

      {/* Result count desktop */}
      <div className="hidden md:flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Showing <span className="text-white font-medium">{resultCount}</span> of {totalCount} tools
          {filters.category !== 'All' && <span className="text-brand-400"> in {filters.category}</span>}
        </p>
      </div>
    </div>
  );
}
