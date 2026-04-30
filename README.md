#  Richie Phinardi Kosasih - Portfolio Website

A responsive personal portfolio website built with React, Vite, and Tailwind CSS to showcase my projects, technical skills, and career transition into IT.

## Website

Visit the live website: [https://richiekosasih.com](https://richiekosasih.com)

##  About This Portfolio

This is a professional portfolio showcasing my skills as a Frontend Developer and React Specialist. The website features modern design principles, smooth animations, and responsive layouts optimized for both desktop and mobile devices.

##  Tech Stack

- **Frontend Framework**: React 18 (JavaScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with dark mode support
- **Animations**: Framer Motion
- **3D Graphics**: @react-three/fiber + @react-three/drei (lazy loaded)
- **Routing**: React Router DOM with lazy routes
- **Icons**: Lucide React
- **Theme**: Class-based dark mode strategy

##  Project Structure

```
RPKdev/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── app/               # App configuration
│   │   ├── App.jsx        # Main app component
│   │   ├── routes.jsx     # Lazy routing configuration
│   │   ├── layouts/       # Layout components
│   │   │   └── SiteLayout.jsx
│   │   └── providers/     # Context providers
│   │       └── ThemeProvider.jsx
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Basic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── Section.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── nav/          # Navigation components
│   │   │   ├── Header.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── accessibility/ # A11y components
│   │       └── SkipToContent.jsx
│   ├── features/         # Feature-specific components
│   │   ├── hero/         # Hero section
│   │   ├── about/        # About section
│   │   ├── projects/     # Projects showcase
│   │   ├── skills/       # Skills & technologies
│   │   ├── blog/         # Blog posts
│   │   └── contact/      # Contact form
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   └── NotFound.jsx
│   ├── lib/              # Utilities & configurations
│   │   ├── seo.js        # SEO utilities
│   │   ├── motion.js     # Framer Motion presets
│   │   ├── analytics.js  # Analytics tracking
│   │   └── three/        # 3D components
│   │       ├── Canvas3D.jsx
│   │       └── useResizeCanvas.js
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── assets/           # Static assets
│   │   ├── images/
│   │   └── fonts/
│   └── main.jsx          # App entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── jsconfig.json
└── README.md
```

## 🛠 Installation & Setup

1. **Clone and install dependencies**:

   ```bash
   git clone <repository-url>
   cd RPKdev
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

##  Features

###  Implemented

-  **Vite + React** - Fast development and optimized builds
-  **Tailwind CSS** - Utility-first styling with dark mode
-  **Dark Mode Toggle** - Persistent theme switching
-  **Responsive Design** - Mobile-first approach
-  **Framer Motion** - Smooth animations and transitions
-  **Lazy Routing** - Code splitting for better performance
-  **Accessibility** - Skip links, ARIA labels, focus management
-  **SEO Ready** - Meta tags, semantic HTML structure
-  **3D Canvas** - Lazy-loaded Three.js integration
-  **Mobile Navigation** - Slide-out menu with backdrop

###  Portfolio Sections

All sections are fully implemented with professional content:

-  **Hero Section** - Personal introduction with animated text effects and social links
-  **About Section** - Professional story, education, and current focus
-  **Skills Section** - Technical skills with progress bars and categorization
-  **Projects Section** - Featured projects with status indicators and tech stacks
-  **Contact Section** - Professional contact form and social media links
-  **3D Effects** - Interactive comet card with hover animations

##  How to Use

### Adding New Sections

1. **Create a new feature component**:

   ```jsx
   // src/features/example/Example.jsx
   import React from 'react';
   import Section from '@/components/ui/Section';

   const Example = () => {
     return (
       <Section
         id='example'
         title='Example Section'
         subtitle='Your section description'
         background='gray' // or "white", "transparent"
       >
         {/* Your content here */}
       </Section>
     );
   };

   export default Example;
   ```

2. **Add to a page**:

   ```jsx
   // src/pages/Home.jsx
   import Example from '@/features/example/Example';

   const Home = () => {
     return (
       <>
         {/* Other sections */}
         <Example />
       </>
     );
   };
   ```

### Using 3D Canvas

```jsx
import Canvas3D from '@/lib/three/Canvas3D';

const MyComponent = () => {
  return (
    <Canvas3D
      height='500px'
      camera={{ position: [0, 0, 5] }}
      enableControls={true}
    >
      {/* Your 3D objects here */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='blue' />
      </mesh>
    </Canvas3D>
  );
};
```

### Animation Presets

```jsx
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/motion';

const AnimatedComponent = () => {
  return (
    <motion.div variants={staggerContainer} initial='initial' animate='animate'>
      <motion.h1 variants={slideUp}>Animated Title</motion.h1>
      <motion.p variants={fadeIn}>Animated text</motion.p>
    </motion.div>
  );
};
```

### Theme Integration

```jsx
import { useTheme } from '@/app/providers/ThemeProvider';

const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

##  Configuration

### Tailwind Config

- Dark mode: `class` strategy
- Custom animations and keyframes
- Typography and forms plugins
- Custom color palette and fonts

### Path Aliases

- `@/` points to `src/` directory
- Configured in both `vite.config.js` and `jsconfig.json`

### Environment Setup

- All configurations are development-ready
- Production optimizations included
- No additional environment variables needed

##  Portfolio Features

This portfolio includes:

-  **Personal Branding** - Complete with name, tagline, and professional photo placeholder
-  **Professional Content** - About section with education and career focus
-  **Skills Showcase** - Comprehensive technical skills with visual progress indicators
-  **Project Portfolio** - Featured projects with status, tech stack, and links
-  **Contact Integration** - Working contact form with email integration
-  **SEO Optimization** - Complete meta tags, Open Graph, and Twitter Cards
-  **Performance Optimized** - Lazy loading, code splitting, and optimized animations
-  **Mobile Responsive** - Perfect mobile experience with touch-friendly interactions

##  Ready for Job Applications

A personal portfolio website built with React, Vite, and Tailwind CSS to showcase my frontend learning journey and selected projects.

##  Deployment

The project is ready for deployment to:

- **Vercel** (recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

Build command: `npm run build`
Output directory: `dist/`

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

##  License

This project is open source and available under the [MIT License](LICENSE).

---

**Built using React, Vite, and Tailwind CSS**

By Me "Richie"
