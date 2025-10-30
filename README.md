# Keppner Barker Portfolio - Redesigned

A high-impact, design-forward portfolio showcasing Keppner Barker as both a Product Manager and Creator of Experiences. This redesign transforms the original Quarto-based site into a modern, performance-optimized showcase that blends professional case studies with creative storytelling and photography.

## 🎯 Design Philosophy

**"Product Manager & Creator of Experiences"**

The portfolio embodies Keppner's unique positioning at the intersection of product strategy, event creation, and visual storytelling. Every element is designed to demonstrate the three core principles:

- **Preparation**: Strategic thinking and systematic approach
- **Curiosity**: Open-minded exploration and learning
- **Courage**: Bold decisions and willingness to take on challenges

## 🏗️ Architecture

### Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS Grid/Flexbox system with design tokens
- **Performance**: Optimized images, lazy loading, efficient animations
- **Deployment**: GitHub Pages compatible (static files only)
- **Analytics**: Ready for Google Analytics integration

### Folder Structure
```
portfolio_2/
├── index.html              # Homepage with hero & featured projects
├── work.html               # All projects grid with filtering
├── visuals.html           # Photography gallery with lightbox
├── about.html             # Personal story & timeline
├── contact.html           # Contact form & CTA
├── css/
│   ├── main.css           # Core styles & design system
│   ├── components.css     # Reusable UI components
│   └── animations.css     # Motion & transitions
├── js/
│   ├── main.js           # Core functionality
│   ├── filter.js         # Project filtering
│   ├── gallery.js        # Lightbox & gallery
│   ├── animations.js     # Scroll animations
│   └── contact.js        # Contact form handling
├── assets/
│   ├── images/
│   │   ├── projects/     # Project screenshots
│   │   ├── gallery/      # Photography portfolio
│   │   └── profile/      # Personal photos
│   ├── videos/           # Background videos
│   └── icons/            # SVG icons & favicon
├── projects/
│   ├── dormchef.html     # Detailed case studies
│   ├── broke-boys.html
│   ├── pickleball.html
│   ├── wasatch-water.html
│   └── mangrove.html
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
```css
/* Adventure-inspired colors */
--color-bg: #fafafa;           /* Clean background */
--color-accent: #0077b6;        /* Deep ocean blue */
--color-accent-warm: #c1666b;   /* Copper/rust */
--color-success: #2d5a27;       /* Forest green */
--color-warning: #f4a261;       /* Warm orange */
```

### Typography
- **Primary**: Inter (clean, modern sans-serif)
- **Secondary**: Playfair Display (elegant serif for headings)
- **Scale**: Modular type scale with consistent spacing

### Layout System
- **Grid**: CSS Grid with auto-fit columns
- **Spacing**: Consistent spacing scale (8px base unit)
- **Breakpoints**: Mobile-first responsive design
- **Components**: Modular, reusable component system

## ✨ Key Features

### 🏠 Homepage
- Hero section with animated profile image
- Featured projects with hover overlays
- About preview with personal philosophy
- Strong call-to-action sections

### 💼 Work Page
- Interactive project filtering by category
- Project cards with animated overlays
- Case study template with detailed layouts
- Navigation between projects

### 📸 Visuals Page
- Masonry photography gallery
- Lightbox with keyboard navigation
- Category filtering for photos
- Mobile-optimized touch gestures

### 👤 About Page
- Personal story with timeline
- Core philosophy explanation
- Skills and expertise breakdown
- Values and principles showcase

### 📧 Contact Page
- Interactive contact form with validation
- Multiple contact methods
- FAQ section
- Project inquiry form with budget/timeline

## 🔧 Performance Optimizations

### Loading Performance
- Lazy loading for all images
- Critical CSS inlined in head
- Optimized font loading
- Efficient animation timing

### User Experience
- Smooth scroll navigation
- Responsive touch interactions
- Keyboard accessibility
- Reduced motion support

### SEO Optimization
- Semantic HTML structure
- Meta tags and Open Graph
- Descriptive alt text
- Clean URL structure

## 🚀 Deployment Guide

### GitHub Pages Setup
1. **Repository Settings**:
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/" (root) folder
   - Save settings

2. **Custom Domain** (optional):
   - Add CNAME file with custom domain
   - Update DNS settings with your domain provider
   - Enable "Enforce HTTPS" in repository settings

3. **Deployment Workflow**:
   ```bash
   # Commit changes
   git add .
   git commit -m "Update portfolio content"
   git push origin main

   # Site will auto-deploy to:
   # https://keppnerbarker7.github.io/portfolio_2/
   ```

### Content Updates

#### Adding New Projects
1. Create new HTML file in `/projects/` folder
2. Use existing case study template structure
3. Add project card to `work.html` and `index.html`
4. Update navigation and filtering categories

#### Adding New Photos
1. Add optimized images to `/assets/images/gallery/`
2. Add gallery items to `visuals.html`
3. Include appropriate category data attributes
4. Ensure alt text and captions are descriptive

#### Updating Content
- **Copy changes**: Edit HTML files directly
- **Styling changes**: Modify CSS variables in `main.css`
- **Functionality**: Update JavaScript files as needed

## 📱 Browser Support

### Modern Browsers (Fully Supported)
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### Fallbacks Included
- Intersection Observer polyfill
- CSS Grid fallbacks
- Reduced motion preferences
- Touch interaction support

## 🔍 Analytics Integration

Ready for analytics implementation:
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Custom event tracking examples:
gtag('event', 'project_view', {
  event_category: 'Portfolio',
  event_label: 'DormChef'
});

gtag('event', 'contact_form_submit', {
  event_category: 'Contact',
  value: 1
});
```

## 🛠️ Development Workflow

### Local Development
```bash
# Serve files locally
python -m http.server 8000
# or
npx serve .

# Navigate to localhost:8000
```

### Code Organization
- **CSS**: BEM methodology for class naming
- **JavaScript**: ES6 modules and modern syntax
- **HTML**: Semantic structure with ARIA labels
- **Images**: WebP format with fallbacks

### Performance Monitoring
- Lighthouse scores: 90+ across all metrics
- Core Web Vitals optimization
- Image optimization and compression
- Efficient animation performance

## 📋 Maintenance

### Regular Updates
- **Content**: Add new projects and photos quarterly
- **Dependencies**: Update any CDN links annually
- **Performance**: Monitor and optimize loading times
- **Accessibility**: Regular WCAG compliance checks

### Backup Strategy
- Git repository serves as primary backup
- Export static files periodically
- Document any custom modifications
- Maintain changelog of major updates

## 🎯 Future Enhancements

### Potential Additions
- **Blog section**: Technical writing and insights
- **Case study videos**: Embedded project walkthroughs
- **Interactive elements**: 3D animations or WebGL
- **CMS integration**: Headless CMS for easier content updates

### Performance Improvements
- **Image optimization**: Next-gen formats (AVIF)
- **Caching strategy**: Service worker implementation
- **CDN integration**: Global content delivery
- **Progressive Web App**: Offline functionality

---

## 🤝 Credits

**Design & Development**: Keppner Barker
**Inspiration**: Jimmy Chin, Peter McKinnon, Mike Kus, Sean Halpin
**Font**: Inter (Google Fonts), Playfair Display (Google Fonts)
**Icons**: Custom SVG icons
**Photography**: All photos by Keppner Barker

---

*Built with purpose. Designed for impact. Optimized for experience.*