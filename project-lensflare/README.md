# Aadiz.FX - Professional Videographer Portfolio

A stunning, cinematic portfolio website built for professional videographers and VFX artists. This project showcases modern web development practices with a focus on visual storytelling and user experience.

## 🎬 Features

### Core Functionality
- **Cinematic Hero Section** with video background and smooth animations
- **Interactive Portfolio Gallery** with filtering, sorting, and detailed project pages
- **Professional Services Showcase** with pricing tiers and process breakdown
- **Client Testimonials Carousel** with auto-play functionality
- **Comprehensive Contact Form** with project type and budget selection
- **Responsive Design** optimized for all devices

### Technical Features
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom design system
- **Framer Motion** for smooth animations
- **SEO Optimized** with proper meta tags and structured data
- **Performance Optimized** with Next.js Image component
- **Content Management** system for easy updates
- **Scroll-Based Video Autoplay** for enhanced user experience

## 🎨 Design System

### Color Palette
- **Primary**: Dark Charcoal (#101010, #1a1a1a, #2a2a2a)
- **Accent**: Electric Blue (#00BFFF, #33CCFF, #66D9FF)
- **Neutral**: Light Gray (#EAEAEA, #D4D4D4, #A3A3A3)

### Typography
- **Headlines**: Montserrat (400-900)
- **Body Text**: Inter (300-700)

### Logo
- **Name**: Aadiz.FX
- **Implementation**: SVG logo file with gradient effect
- **File Location**: `public/images/logo.svg`
- **Usage**: Featured prominently in the header and footer
- **Components**: Implemented in `src/components/Navigation.tsx` and `src/components/Footer.tsx`

### Animations
- Smooth scroll animations
- Hover effects and micro-interactions
- Cinematic transitions between sections
- Glass morphism effects

## 🎵 Media Features

### Video Player
The custom video player includes:
- **Responsive design** that works on all device sizes
- **Custom controls** with play/pause and mute/unmute buttons
- **Poster image** support for better loading experience
- **Loop and autoplay** options
- **Scroll-based autoplay** functionality (videos play when in viewport)

### Scroll-Based Video Autoplay
- Videos automatically play when they come into view
- Videos automatically pause when scrolled out of view
- Improves user experience by reducing manual interaction
- Conserves bandwidth and battery when videos are not visible
- Works on both the homepage hero video and project detail pages

### Performance Optimization
- **Lazy loading** for off-screen videos
- **Preloading** strategies for critical video assets
- **Adaptive streaming** based on network conditions
- **Efficient codecs** for faster loading times

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aadiz-fx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── work/              # Portfolio pages
│   │   └── [id]/          # Dynamic project detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── HeroSection.tsx    # Homepage hero
│   ├── FeaturedWork.tsx   # Portfolio preview
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Site footer
├── data/                  # Static data and content
│   └── index.ts           # Projects, testimonials, etc.
├── lib/                   # Utility functions
│   ├── animations.ts      # Animation hooks
│   └── cms.ts             # Content management utilities
└── types/                 # TypeScript type definitions
    └── index.ts           # Core types

public/
├── images/                 # Image assets
│   ├── clients/           # Client logos
│   ├── projects/          # Project thumbnails
│   ├── testimonials/      # Testimonial avatars
│   └── logo.svg           # Aadiz.FX logo
├── icons/                 # Tool and software icons
├── videos/                # Project videos
└── favicon.ico            # Site favicon
```

## 📊 Content Management

The project includes a basic CMS system for easy content updates:

### Adding New Projects
1. Edit `src/data/index.ts`
2. Add new project object to the `projects` array
3. Include all required fields (id, title, description, etc.)
4. Add project assets to the public directory

### Updating Content
- **Projects**: Edit the `projects` array in `src/data/index.ts`
- **Testimonials**: Update the `testimonials` array
- **Clients**: Modify the `clients` array
- **Services**: Update the `services` array

### Content Validation
The CMS includes validation functions to ensure data integrity:
- `validateProject()` - Validates project data
- `validateTestimonial()` - Validates testimonial data

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with video background
- Featured work gallery
- Services overview
- Client testimonials
- Client logos and statistics

### Portfolio (`/work`)
- Complete project gallery
- Category filtering
- Search functionality
- Grid and list view modes
- Sorting options

### Project Detail (`/work/[id]`)
- Full project showcase
- Video player with controls
- Before/after comparisons
- Behind-the-scenes gallery
- Related projects

### Services (`/services`)
- Service tier breakdown
- Pricing information
- Tools and software showcase
- Process overview

### About (`/about`)
- Personal story and philosophy
- Achievement highlights
- Skills showcase
- Career timeline

### Contact (`/contact`)
- Comprehensive contact form
- Project type selection
- Budget and timeline options
- FAQ section
- Social media links

## 🔧 Customization

### Updating Colors
Edit the color palette in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    900: '#101010',  // Your dark color
    800: '#1a1a1a',
    700: '#2a2a2a',
  },
  accent: {
    500: '#00BFFF',  // Your accent color
    400: '#33CCFF',
    300: '#66D9FF',
  }
}
```

### Adding New Animations
Create new animation utilities in `src/lib/animations.ts` and add corresponding CSS classes in `globals.css`.

### Updating Typography
Modify font imports in `src/app/layout.tsx` and update the Tailwind configuration.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt gracefully across device sizes with optimized layouts and touch-friendly interactions.

## ⚡ Performance

- **Next.js Image optimization** for fast loading
- **Lazy loading** for off-screen content
- **Optimized animations** with CSS transforms
- **Minimal JavaScript** for faster page loads
- **SEO optimized** with proper meta tags

## 🔍 SEO Features

- Dynamic meta tags for each page
- Open Graph integration
- Twitter Card support
- Structured data for projects
- Sitemap generation
- Robots.txt configuration

## 📞 Support

For questions or support regarding this project:
- Email: adityashinde6050@gmail.com
- Contact: +91 81809 99435
- Location: Pirangut, Pune
- Documentation: Check this README and code comments
- Issues: Create an issue in the repository

## 📄 License

This project is created for Aadiz.FX. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**