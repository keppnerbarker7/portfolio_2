# Portfolio Redesign - New Structure & Implementation Plan

## Current Assessment
- **Current**: Quarto-based site with Bootstrap theme
- **Issues**: Limited design control, outdated layout, minimal content
- **Assets**: Basic styling, single project (DormChef), profile image

## New Structure (GitHub Pages Compatible)

```
portfolio_2/
├── index.html                 # Homepage with hero & featured projects
├── work.html                  # All projects grid with filtering
├── visuals.html              # Photography/visual gallery
├── about.html                # Personal story & timeline
├── contact.html              # Contact form & CTA
├── css/
│   ├── main.css              # Core styles & design system
│   ├── components.css        # Reusable components
│   └── animations.css        # Motion & transitions
├── js/
│   ├── main.js              # Core functionality
│   ├── filter.js            # Project filtering
│   ├── gallery.js           # Lightbox & gallery
│   └── animations.js        # AOS/scroll animations
├── assets/
│   ├── images/
│   │   ├── projects/        # Project screenshots
│   │   ├── gallery/         # Photography portfolio
│   │   └── profile/         # Personal photos
│   ├── videos/              # Background videos
│   └── icons/               # SVG icons & favicon
├── projects/
│   ├── dormchef.html        # Case study pages
│   ├── broke-boys.html
│   ├── pickleball.html
│   ├── wasatch-water.html
│   └── mangrove.html
└── README.md                # Deployment & maintenance docs
```

## Design System Tokens

```css
:root {
  /* Typography */
  --font-primary: 'Inter', -apple-system, sans-serif;
  --font-secondary: 'Playfair Display', serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Colors - Adventure-inspired palette */
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #0077b6;          /* Deep ocean blue */
  --color-accent-warm: #c1666b;     /* Copper/rust */
  --color-success: #2d5a27;         /* Forest green */

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;

  /* Layout */
  --container-max: 1200px;
  --border-radius: 12px;
  --border-radius-sm: 8px;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.25s ease;
  --transition-slow: 0.4s ease;
}
```

## Component Architecture

### 1. Project Card Component
```html
<article class="project-card" data-category="product">
  <div class="project-card__media">
    <img src="..." alt="..." loading="lazy">
    <div class="project-card__overlay">
      <span class="project-card__category">Product</span>
      <h3 class="project-card__title">DormChef</h3>
      <p class="project-card__description">Social meal-planning app for college students</p>
    </div>
  </div>
  <div class="project-card__content">
    <div class="project-card__tags">
      <span class="tag">UX Design</span>
      <span class="tag">Product Strategy</span>
    </div>
    <a href="projects/dormchef.html" class="project-card__link">View Case Study</a>
  </div>
</article>
```

### 2. Navigation System
```html
<nav class="nav-primary" id="main-nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <svg class="nav-logo__icon"><!-- Custom KB signature --></svg>
    </a>
    <ul class="nav-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/work.html">Work</a></li>
      <li><a href="/visuals.html">Visuals</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
    <button class="nav-toggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-progress" id="scroll-progress"></div>
</nav>
```

### 3. Case Study Template
```html
<main class="case-study">
  <header class="case-study__hero">
    <div class="container">
      <div class="case-study__meta">
        <span class="case-study__category">Product Design</span>
        <span class="case-study__year">2024</span>
      </div>
      <h1 class="case-study__title">DormChef</h1>
      <p class="case-study__subtitle">Social meal-planning app for college students</p>
    </div>
    <div class="case-study__hero-image">
      <img src="..." alt="...">
    </div>
  </header>

  <section class="case-study__content">
    <div class="container">
      <div class="case-study__grid">
        <aside class="case-study__sidebar">
          <div class="case-study__details">
            <h3>Project Details</h3>
            <dl>
              <dt>Role</dt>
              <dd>Product Manager, UX Designer</dd>
              <dt>Timeline</dt>
              <dd>3 months</dd>
              <dt>Team</dt>
              <dd>Solo project</dd>
            </dl>
          </div>
        </aside>
        <article class="case-study__body">
          <!-- Case study content blocks -->
        </article>
      </div>
    </div>
  </section>
</main>
```

## Key Features to Implement

### 1. **Interactive Elements**
- Smooth scroll navigation with progress indicator
- Project filtering by category (Product, Event, Creative, Experimental)
- Lightbox gallery for photography
- Hover animations on cards and links

### 2. **Performance Optimizations**
- Lazy loading for images
- CSS-only animations where possible
- Optimized image formats (WebP fallbacks)
- Minimal JavaScript dependencies

### 3. **Responsive Design**
- Mobile-first approach
- Fluid typography and spacing
- Touch-friendly interactions
- Optimized for 320px - 1440px+ viewports

### 4. **Content Strategy**
- Hero: "Product Manager & Creator of Experiences"
- Featured projects showcase (4-6 key works)
- Personal story with adventure/business blend
- Visual portfolio with descriptive captions

## Migration Plan

1. **Keep Quarto temporarily** - Use current setup until new version is ready
2. **Build new structure** - Create parallel HTML/CSS/JS system
3. **Content migration** - Transfer and enhance existing content
4. **Testing & optimization** - Ensure performance and compatibility
5. **Deploy & redirect** - Switch to new system seamlessly

## Libraries & Dependencies

```json
{
  "css": [
    "Google Fonts: Inter, Playfair Display",
    "Custom CSS Grid/Flexbox system"
  ],
  "js": [
    "AOS.js - Scroll animations (lightweight)",
    "Vanilla JS for filtering and interactions"
  ],
  "icons": [
    "Custom SVG icons",
    "Feather Icons for UI elements"
  ]
}
```

This structure provides complete control over design while maintaining GitHub Pages compatibility and optimal performance.