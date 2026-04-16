import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/tools';
import ToolIcon from './ToolIcon';
import ToolDescription from './ToolDescription';
import ToolFooter from './ToolFooter';
import HoverCTA from './HoverCTA';

export default function ToolCard({ tool, index }) {
  const { favorites, toggleFavorite } = useApp();
  const [hovered, setHovered] = useState(false);
  
  const isFav = favorites.includes(tool.id);
  const catColor = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.All;

  const handleDoubleClick = () => {
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  const handleFavClick = (e) => {
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4), ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onDoubleClick={handleDoubleClick}
      className="relative cursor-pointer group"
      style={{ zIndex: hovered ? 10 : 1 }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.03 : 1,
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative rounded-2xl glass border border-white/6 overflow-hidden transition-all duration-200"
        style={{
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 4px 20px rgba(0,0,0,0.15)`,
        }}
      >
        {/* Hover glow border */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.35)' }}
            />
          )}
        </AnimatePresence>

        {/* Trending badge */}
        {tool.trending && (
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30">
            <Zap size={8} className="text-brand-400 fill-brand-400" />
            <span className="text-[9px] font-bold text-brand-400 uppercase tracking-wider">Hot</span>
          </div>
        )}

        {/* Favorite button */}
        <motion.button
          onClick={handleFavClick}
          whileTap={{ scale: 0.8 }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={12}
            className={isFav ? 'text-red-400 fill-red-400' : 'text-gray-400'}
          />
        </motion.button>

        {/* Main content */}
        <div className="p-4">
          <ToolIcon icon={tool.icon} name={tool.name} iconBg={tool.iconBg} />

          {/* Name + category */}
          <div className="mb-1.5">
            <h3 className="font-display font-semibold text-white text-sm leading-tight truncate">{tool.name}</h3>
            <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md mt-1 ${catColor.bg} ${catColor.text}`}>
              {tool.category}
            </span>
          </div>

          <ToolDescription tool={tool} hovered={hovered} />
          
          <ToolFooter rating={tool.rating} pricing={tool.pricing} />
        </div>

        <HoverCTA hovered={hovered} website={tool.website} />
      </motion.div>
    </motion.div>
  );
}
