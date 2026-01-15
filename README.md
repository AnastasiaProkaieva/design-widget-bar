# Agentforce Chat Widget

A premium, Apple/Stripe-inspired floating chat widget built with React, Tailwind CSS, and Framer Motion.

![Widget Preview](https://img.shields.io/badge/React-19.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.25-ff69b4)

## ✨ Features

- 🎨 **Premium UI** - Apple/Stripe design aesthetic with smooth animations
- 🔄 **3 View Modes** - Omnibar, Wide Canvas, and Docked Sidebar
- ⚡ **Physics-based Animations** - Powered by Framer Motion
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Embeddable** - Can be deployed as a standalone widget on any website

---

## 📦 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)

---

## 🚀 Quick Start

### Option 1: Use the setup script
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual setup

#### 1. Clone the repository
```bash
git clone https://github.com/AnastasiaProkaieva/design-widget-bar.git
cd design-widget-bar
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Run development server
```bash
npm run dev
```

#### 4. Open in browser
Visit: **http://localhost:5173**

---

## 📚 Dependencies

### Runtime Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `react` | ^19.2.0 | UI library |
| `react-dom` | ^19.2.0 | React DOM renderer |
| `framer-motion` | ^12.25.0 | Animation library for smooth transitions |
| `lucide-react` | ^0.562.0 | Beautiful icon library |

### Dev Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `vite` | ^7.2.4 | Lightning-fast build tool & dev server |
| `tailwindcss` | ^4.1.18 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.18 | Tailwind CSS Vite plugin |
| `@vitejs/plugin-react` | ^5.1.1 | React plugin for Vite |
| `eslint` | ^9.39.1 | Code linter |

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production app to `dist/` folder |
| `npm run build:widget` | Build standalone embeddable widget to `dist-widget/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📁 Project Structure

```
agentforce-widget/
├── src/
│   ├── components/
│   │   └── ChatWidget.jsx    # Main chat widget component
│   ├── App.jsx               # Main app with demo page
│   ├── main.jsx              # React entry point
│   ├── widget.jsx            # Standalone widget entry point
│   └── index.css             # Global styles & Tailwind config
├── dist-widget/              # Built standalone widget (after build)
├── vite.config.js            # Main Vite configuration
├── vite.widget.config.js     # Widget build configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

---

## 🌐 Embedding the Widget

After running `npm run build:widget`, you can embed the widget on any website:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <!-- Your website content -->
  
  <!-- Add the widget script at the end of body -->
  <script src="path/to/agentforce-widget.iife.js"></script>
</body>
</html>
```

---

## 🎨 View Modes

The widget supports three view modes:

1. **Omnibar** - Compact search bar at the bottom of the screen
2. **Wide Canvas** - Centered modal view for focused conversations
3. **Docked Sidebar** - Fixed sidebar on the right side

Users can switch between modes using the controls in the header or keyboard shortcuts (ESC to minimize).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ESC` | Minimize to Omnibar / Go back one view |
| `Enter` | Send message |

---

## 🔧 Customization

### Colors
Edit the theme colors in `src/index.css`:
```css
@theme {
  --color-primary: #0071E3;
  --color-primary-hover: #0077ED;
  /* ... */
}
```

### Fonts
The widget uses Inter font by default. Modify in `src/index.css`:
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, ...;
```

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
