import React, { createContext, useContext, useState, useEffect } from 'react';
import { AI_TOOLS } from '../data/tools';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [tools, setTools] = useState(() => {
    try {
      const stored = localStorage.getItem('ai_tools');
      return stored ? JSON.parse(stored) : AI_TOOLS;
    } catch { return AI_TOOLS; }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('ai_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [darkMode, setDarkMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ai_tools', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('ai_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addTool = (tool) => {
    const newTool = {
      ...tool,
      id: Date.now(),
      addedDate: new Date().toISOString().split('T')[0],
      reviews: 0,
      popularity: 50,
    };
    setTools(prev => [...prev, newTool]);
    return newTool;
  };

  const updateTool = (id, updates) => {
    setTools(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTool = (id) => {
    setTools(prev => prev.filter(t => t.id !== id));
  };

  const login = (username, password) => {
    if (username === 'kolalohithkumar' && password === 'Lohith@224193080') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider value={{
      tools, setTools,
      favorites, toggleFavorite,
      darkMode, setDarkMode,
      isAdmin, login, logout,
      addTool, updateTool, deleteTool,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
