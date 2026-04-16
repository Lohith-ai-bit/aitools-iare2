import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Shield, Plus, Edit3, Trash2, LogOut,
  Star, Search, ArrowUpDown, Check, X, AlertTriangle,
  LayoutGrid, List, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRICING_COLORS, CATEGORY_COLORS } from '../data/tools';

const EMPTY_TOOL = {
  name: '', icon: '', iconBg: '#1a1a2e', description: '', longDescription: '',
  category: 'Text', pricing: 'Free', rating: 4.0,
  features: [], useCases: [], website: '', trending: false,
  tags: [],
};

function ToolForm({ tool, onSave, onCancel }) {
  const [form, setForm] = useState(tool || EMPTY_TOOL);
  const [featInput, setFeatInput] = useState('');
  const [ucInput, setUcInput] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addFeature = () => {
    if (featInput.trim()) {
      set('features', [...(form.features || []), featInput.trim()]);
      setFeatInput('');
    }
  };

  const addUseCase = () => {
    if (ucInput.trim()) {
      set('useCases', [...(form.useCases || []), ucInput.trim()]);
      setUcInput('');
    }
  };

  const handleSave = () => {
    if (!form.name || !form.description || !form.website) return;
    onSave(form);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-brand-500/50 transition-all";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl border border-white/10 p-6 space-y-4"
    >
      <h3 className="font-display font-bold text-white">{tool?.id ? 'Edit Tool' : 'Add New Tool'}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tool Name *</label>
          <input className={inputClass} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. ChatGPT" />
        </div>
        <div>
          <label className={labelClass}>Website URL *</label>
          <input className={inputClass} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Icon URL</label>
          <input className={inputClass} value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Icon Background Color</label>
          <div className="flex gap-2">
            <input type="color" value={form.iconBg} onChange={e => set('iconBg', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10 p-1" />
            <input className={`${inputClass} flex-1`} value={form.iconBg} onChange={e => set('iconBg', e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} className="bg-[#1a1a2e]">{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Pricing</label>
          <select className={inputClass} value={form.pricing} onChange={e => set('pricing', e.target.value)}>
            {['Free', 'Paid', 'Credits', 'Free/Paid'].map(p => <option key={p} className="bg-[#1a1a2e]">{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Rating (0–5)</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min="0" max="5" step="0.1"
              value={form.rating}
              onChange={e => set('rating', parseFloat(e.target.value))}
              className="flex-1 accent-brand-500"
            />
            <span className="font-mono text-amber-400 text-sm w-8">{form.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className={labelClass + ' mb-0'}>Trending</label>
          <button
            onClick={() => set('trending', !form.trending)}
            className={`relative w-10 h-5 rounded-full transition-all ${form.trending ? 'bg-brand-600' : 'bg-white/10'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.trending ? 'left-5' : 'left-0.5'}`} />
          </button>
          <span className="text-xs text-gray-400">{form.trending ? 'Yes' : 'No'}</span>
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Description *</label>
        <input className={inputClass} value={form.description} onChange={e => set('description', e.target.value)} placeholder="One-liner description..." />
      </div>

      <div>
        <label className={labelClass}>Long Description</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={form.longDescription}
          onChange={e => set('longDescription', e.target.value)}
          placeholder="Full description shown on hover..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Features</label>
          <div className="flex gap-2 mb-2">
            <input
              className={`${inputClass} flex-1`}
              value={featInput}
              onChange={e => setFeatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFeature()}
              placeholder="Add feature..."
            />
            <button onClick={addFeature} className="px-3 py-2 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 hover:bg-brand-600/30">
              <Plus size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {form.features?.map((f, i) => (
              <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg bg-white/5 border border-white/8 text-gray-300">
                {f}
                <button onClick={() => set('features', form.features.filter((_, j) => j !== i))}><X size={10} /></button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Use Cases</label>
          <div className="flex gap-2 mb-2">
            <input
              className={`${inputClass} flex-1`}
              value={ucInput}
              onChange={e => setUcInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addUseCase()}
              placeholder="Add use case..."
            />
            <button onClick={addUseCase} className="px-3 py-2 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-400 hover:bg-brand-600/30">
              <Plus size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {form.useCases?.map((u, i) => (
              <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
                {u}
                <button onClick={() => set('useCases', form.useCases.filter((_, j) => j !== i))}><X size={10} /></button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={!form.name || !form.description || !form.website}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all disabled:opacity-40"
        >
          <Check size={14} />
          {tool?.id ? 'Save Changes' : 'Add Tool'}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-gray-400 hover:text-white text-sm transition-all"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

function DeleteConfirm({ tool, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong rounded-2xl border border-red-500/20 p-6 max-w-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Delete Tool</h3>
          <p className="text-xs text-gray-500">This cannot be undone</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-5">
        Are you sure you want to delete <span className="text-white font-medium">{tool.name}</span>?
      </p>
      <div className="flex gap-3">
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 text-sm font-medium transition-all">
          Delete
        </button>
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-gray-400 hover:text-white text-sm transition-all">
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
  const { tools, addTool, updateTool, deleteTool, logout } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // list | add | edit | delete
  const [selectedTool, setSelectedTool] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredTools = tools
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });

  const handleSave = (formData) => {
    if (selectedTool?.id) {
      updateTool(selectedTool.id, formData);
    } else {
      addTool(formData);
    }
    setView('list');
    setSelectedTool(null);
  };

  const handleDelete = () => {
    deleteTool(selectedTool.id);
    setView('list');
    setSelectedTool(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const catColor = (cat) => CATEGORY_COLORS[cat] || CATEGORY_COLORS.All;
  const pricingColor = (p) => PRICING_COLORS[p] || PRICING_COLORS.Free;

  return (
    <div className="min-h-screen bg-animated">
      {/* Top nav */}
      <div className="glass-strong border-b border-white/6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="font-display font-bold text-sm text-white">AI<span className="text-gradient">Tools</span></span>
            </Link>
            <span className="text-gray-600">/</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <Shield size={11} className="text-brand-400" />
              <span className="text-xs text-brand-400 font-medium">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">{tools.length} tools in directory</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-gray-400 hover:text-white text-xs transition-all"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">Tool Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">Add, edit, and manage AI tools</p>
          </div>
          {view === 'list' && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => { setSelectedTool(null); setView('add'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all glow-sm"
            >
              <Plus size={15} />
              Add Tool
            </motion.button>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Tools', value: tools.length, color: 'text-white' },
            { label: 'Trending', value: tools.filter(t => t.trending).length, color: 'text-brand-400' },
            { label: 'Free Tools', value: tools.filter(t => t.pricing === 'Free').length, color: 'text-emerald-400' },
            { label: 'Avg Rating', value: (tools.reduce((s, t) => s + t.rating, 0) / tools.length).toFixed(1), color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl border border-white/6 p-3.5">
              <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form panels */}
        <AnimatePresence mode="wait">
          {(view === 'add' || view === 'edit') && (
            <motion.div key="form" className="mb-6">
              <ToolForm
                tool={view === 'edit' ? selectedTool : null}
                onSave={handleSave}
                onCancel={() => { setView('list'); setSelectedTool(null); }}
              />
            </motion.div>
          )}

          {view === 'delete' && (
            <motion.div key="delete" className="mb-6">
              <DeleteConfirm
                tool={selectedTool}
                onConfirm={handleDelete}
                onCancel={() => { setView('list'); setSelectedTool(null); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tools table */}
        <div className="glass rounded-2xl border border-white/6 overflow-hidden">
          {/* Table header */}
          <div className="p-4 border-b border-white/6 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tools..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-brand-500/50 transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none"
            >
              <option value="name" className="bg-[#1a1a2e]">A-Z</option>
              <option value="rating" className="bg-[#1a1a2e]">By Rating</option>
              <option value="category" className="bg-[#1a1a2e]">By Category</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Tool', 'Category', 'Pricing', 'Rating', 'Trending', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTools.map((tool, i) => (
                  <motion.tr
                    key={tool.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/4 hover:bg-white/2 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                          style={{ background: tool.iconBg || '#1a1a2e' }}
                        >
                          <img
                            src={tool.icon}
                            alt=""
                            className="w-5 h-5 object-contain"
                            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                          />
                          <span style={{display:'none'}} className="text-white text-[10px] font-bold w-full h-full items-center justify-center">
                            {tool.name.slice(0,2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{tool.name}</p>
                          <p className="text-[11px] text-gray-500 truncate max-w-[160px]">{tool.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${catColor(tool.category).bg} ${catColor(tool.category).text}`}>
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${pricingColor(tool.pricing).bg} ${pricingColor(tool.pricing).text}`}>
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-mono text-amber-400">{tool.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${tool.trending ? 'bg-brand-500/15 text-brand-400' : 'bg-white/5 text-gray-500'}`}>
                        {tool.trending ? '🔥 Hot' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setSelectedTool(tool); setView('edit'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-7 h-7 rounded-lg glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-500/30 transition-all"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() => { setSelectedTool(tool); setView('delete'); }}
                          className="w-7 h-7 rounded-lg glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredTools.length === 0 && (
              <div className="py-12 text-center text-gray-500 text-sm">No tools match your search</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
