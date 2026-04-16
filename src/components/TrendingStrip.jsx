import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function TrendingStrip({ tools }) {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={14} className="text-brand-400" />
        <span className="text-sm font-display font-semibold text-white">Trending</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {tools.map((tool, i) => (
          <motion.a
            key={tool.id}
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl glass border border-white/6 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all group"
          >
            <div
              className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: tool.iconBg || '#1a1a2e' }}
            >
              {!imgErrors[tool.id] ? (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-5 h-5 object-contain"
                  onError={() => handleImgError(tool.id)}
                />
              ) : (
                <span className="text-white text-[10px] font-bold">{tool.name.slice(0,2)}</span>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-white leading-none mb-0.5">{tool.name}</p>
              <p className="text-[10px] text-gray-500">{tool.category}</p>
            </div>
            <ArrowRight size={10} className="text-gray-600 group-hover:text-brand-400 transition-colors ml-1" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
