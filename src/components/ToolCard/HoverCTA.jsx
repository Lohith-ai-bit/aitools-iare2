import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function HoverCTA({ hovered, website }) {
  return (
    <AnimatePresence>
      {hovered && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="border-t border-white/6 overflow-hidden"
        >
          <div className="p-3 flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Double-click to open</p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Visit <ArrowUpRight size={10} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
