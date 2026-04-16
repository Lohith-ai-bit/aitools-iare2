import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function HeroSection({ toolCount, trendingCount }) {
  return (
    <div className="relative pt-28 pb-10 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-brand-600/8 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-purple-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-strong border border-brand-500/20 text-xs text-brand-400 font-medium mb-5"
        >
          <Sparkles size={11} className="animate-pulse" />
          {toolCount}+ AI tools curated
          <span className="w-1 h-1 rounded-full bg-brand-500" />
          Updated daily
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-[1.1] tracking-tight"
        >
          Discover the Best
          <br />
          <span className="text-gradient">AI Tools</span> of 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Your curated directory of the most powerful AI tools — from text generation to image creation, coding assistants, and beyond.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Sparkles, label: 'Curated Tools', value: toolCount + '+' },
            { icon: TrendingUp, label: 'Trending Now', value: trendingCount },
            { icon: Zap, label: 'Categories', value: '7' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <Icon size={12} className="text-brand-400" />
                <span className="font-display font-bold text-xl sm:text-2xl text-white">{value}</span>
              </div>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
