# 🤖 AI Tools Directory

A modern, Play Store–inspired directory of the best AI tools — built with React, Tailwind CSS, and Framer Motion.

![AI Tools Directory](https://via.placeholder.com/1200x630/0a0a14/6366f1?text=AI+Tools+Directory)

## ✨ Features

- **18+ preloaded AI tools** including ChatGPT, Gemini, Claude, Midjourney, and more
- **Play Store–style grid layout** with rounded icon cards
- **Hover to expand** — see full description, features, and use cases
- **Double-click** any card to open the tool's website in a new tab
- **Filtering** by category, pricing type, and minimum rating
- **Sorting** by rating, popularity, newest added, and A–Z
- **Search bar** with real-time filtering across names, descriptions, and tags
- **Trending strip** highlighting hot tools
- **Favorites / Bookmarks** with heart button + filter
- **Dark mode** aesthetic with glassmorphism UI
- **Admin dashboard** at `/admin` with full CRUD:
  - Add new tools with full metadata
  - Edit existing tools
  - Delete tools with confirmation
  - Toggle trending status
  - Set category, pricing, rating, features, use cases
- **Persistent state** via localStorage
- **Fully responsive** — mobile + desktop

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or unzip the project
cd ai-tools-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Admin Access

Navigate to `/admin/login` or click **Admin** in the navbar.

| Field    | Value      |
|----------|-----------|
| Username | `admin`   |
| Password | `admin123`|

The admin panel lets you add, edit, delete, and reorder tools. All changes persist in localStorage.

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation with search
│   ├── HeroSection.jsx     # Hero banner with stats
│   ├── FilterBar.jsx       # Category, pricing, sort, rating filters
│   ├── ToolCard.jsx        # Individual tool card with hover effects
│   └── TrendingStrip.jsx   # Horizontal trending tools row
├── pages/
│   ├── HomePage.jsx        # Main directory page
│   ├── AdminLoginPage.jsx  # Admin login form
│   └── AdminPage.jsx       # Admin dashboard (CRUD)
├── context/
│   └── AppContext.jsx      # Global state (tools, favorites, auth)
├── data/
│   └── tools.js            # 18 AI tools + category/color config
├── App.jsx                 # Router setup
├── main.jsx                # Entry point
└── index.css               # Tailwind + custom styles
```

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router v6 | Routing |
| Lucide React | Icons |
| localStorage | Data persistence |

## 🎨 UI Highlights

- **Glassmorphism** cards with `backdrop-filter: blur`
- **Noise texture** overlay for depth
- **Animated gradient** background
- **Syne + DM Sans** font pairing for a premium feel
- **Hover expansion** with Framer Motion `AnimatePresence`
- **Staggered card entry** animations
- Custom scrollbar styling

## 🤖 Preloaded Tools

ChatGPT · Gemini · Claude · Midjourney · DALL·E 3 · Stable Diffusion · Runway ML · Notion AI · Perplexity AI · GitHub Copilot · ElevenLabs · Pictory · Synthesia · Leonardo AI · DeepSeek · Suno AI · Cursor · Luma Dream Machine

## 📦 Extending

To add more tools, edit `src/data/tools.js` and add entries to the `AI_TOOLS` array following the existing schema. Or use the **Admin panel** at runtime — changes auto-save to localStorage.

## 📄 License

MIT — free to use and modify.
