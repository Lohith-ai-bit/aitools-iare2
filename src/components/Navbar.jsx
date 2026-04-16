import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Search, X, Menu, Moon, Sun, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar({ onSearch, searchQuery }) {
  const { darkMode, setDarkMode, isAdmin, logout, favorites } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center glow-sm group-hover:glow-brand transition-all">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              AI<span className="text-gradient">Tools</span>
            </span>
          </Link>

          {/* Center search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <AnimatePresence>
              {searchOpen || searchQuery ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="relative w-full"
                >
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => onSearch(e.target.value)}
                    placeholder="Search AI tools..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-9 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/50 focus:bg-white/8 transition-all"
                  />
                  {searchQuery && (
                    <button onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      <X size={14} />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  key="search-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Search size={15} />
                  <span>Search tools...</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(s => !s)}
              className="md:hidden w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <Search size={15} />
            </button>

            <Link to="/?filter=favorites" className="relative w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
              <Heart size={15} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-medium hover:bg-brand-600/30 transition-all"
                >
                  <Shield size={12} />
                  Admin
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-gray-400 text-xs hover:text-white hover:border-white/20 transition-all"
              >
                <Shield size={12} />
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-3 overflow-hidden"
            >
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => onSearch(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
