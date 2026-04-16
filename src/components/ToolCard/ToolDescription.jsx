import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolDescription({ tool, hovered }) {
  return (
    <AnimatePresence mode="wait">
      {!hovered ? (
        <motion.p
          key="short"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3"
        >
          {tool.description}
        </motion.p>
      ) : (
        <motion.div
          key="long"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3"
        >
          <p className="text-gray-400 text-xs leading-relaxed mb-2">{tool.longDescription}</p>
          <div className="space-y-1.5">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Key Features</p>
            <div className="flex flex-wrap gap-1">
              {tool.features?.slice(0, 3).map(f => (
                <span key={f} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/8">
                  {f}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1.5">Use Cases</p>
            <div className="flex flex-wrap gap-1">
              {tool.useCases?.slice(0, 3).map(u => (
                <span key={u} className="text-[10px] px-1.5 py-0.5 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {u}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
