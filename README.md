# Heidar Dev Portfolio

A modern, performant portfolio website built with **Astro 5**, featuring optimized images, SEO best practices, and a vintage-inspired design aesthetic.

![Astro](https://img.shields.io/badge/Astro-5.0-BC52EE?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38BDF8?logo=tailwind-css&logoColor=white)

## ✨ Features

### 🚀 Performance & Optimization
- **Astro Image Component** - Automatic image optimization with WebP/AVIF conversion
- **Zero Duplicate Font Loading** - Optimized font delivery via `@fontsource`
- **SVG Optimization** - Automatic compression using SVGO
- **View Transitions** - Smooth page transitions with Astro's built-in API
- **Lazy Loading** - Images and content load on demand

### 🎨 Design
- **Vintage Aesthetic** - Custom design system with hard shadows and paper textures
- **Dark Mode** - Full dark/light theme support with system preference detection
- **Responsive** - Mobile-first design that works on all devices
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

### 📈 SEO & Discoverability
- **OpenGraph Tags** - Rich social media previews
- **Twitter Cards** - Optimized Twitter/X sharing
- **Canonical URLs** - Proper SEO URL structure
- **robots.txt** - Search engine crawler configuration
- **Sitemap** - Automatic XML sitemap generation
- **RSS Feed** - Blog content syndication at `/rss.xml`

### 🎯 Content
- **Projects Showcase** - Filterable portfolio with modal details
- **Blog** - Content collections with MDX support
- **About Page** - Professional history, education, certificates
- **Contact Form** - Interactive contact form with validation
- **Custom 404** - Branded error page

## 📁 Project Structure

```
/
├── public/
│   ├── h.svg              # Favicon
│   └── robots.txt         # SEO crawler config
├── src/
│   ├── assets/            # Optimized images
│   │   ├── images/        # Project images
│   │   └── README.md      # Image usage guide
│   ├── components/
│   │   ├── cards/         # Reusable card components
│   │   ├── ui/            # UI primitives (Button, Badge, etc.)
│   │   ├── Hero.astro
│   │   ├── Navbar.astro
│   │   └── ...
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts (MDX)
│   │   ├── projects/      # Project details
│   │   └── config.ts      # Collection schemas
│   ├── data/
│   │   └── siteData.ts    # Site-wide data
│   ├── layouts/
│   │   └── Layout.astro   # Base layout with SEO
│   ├── pages/
│   │   ├── blog/          # Blog pages
│   │   ├── index.astro    # Homepage
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   ├── 404.astro      # Custom error page
│   │   └── rss.xml.ts     # RSS feed
│   ├── styles/
│   │   └── global.css     # Global styles & custom properties
│   └── utils/
│       ├── cn.ts          # Class name utility
│       └── image.ts       # Image helpers
├── .env.example           # Environment variables template
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── tsconfig.json          # TypeScript config with path aliases
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Heidarabdi/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Configure environment variables** (optional)
```bash
cp .env.example .env
# Edit .env with your values
```

4. **Start development server**
```bash
npm run dev
# or
bun dev
```

Visit `http://localhost:4321` to see your site!

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
|:--------|:-------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run Astro type checking |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🎨 Customization

### Colors & Theme
Edit `src/styles/global.css` to customize colors:
```css
:root {
  --color-paper: #fdf8f3;
  --color-ink: #1a1512;
  --color-accent: #f97316;
  /* ... */
}
```

### Content
- **Projects**: Add to `src/data/siteData.ts`
- **Blog Posts**: Add MDX files to `src/content/blog/`
- **About Info**: Edit `src/pages/about.astro`

### Images
Place images in `src/assets/images/` and import:
```astro
---
import { Image } from 'astro:assets';
import myImage from '@assets/images/my-image.jpg';
---
<Image src={myImage} alt="Description" />
```

### Path Aliases
Configured in `tsconfig.json`:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@utils/*` → `src/utils/*`
- `@data/*` → `src/data/*`
- `@assets/*` → `src/assets/*`

## 📦 Technologies

- **[Astro 5](https://astro.build)** - Static site framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed
- **[@fontsource](https://fontsource.org/)** - Self-hosted fonts

## 🚢 Deployment

This site can be deployed to any static hosting platform. Below are detailed instructions for the most popular options:

### Cloudflare Pages (Recommended) ⚡

Cloudflare Pages offers blazing-fast global CDN, automatic SSL, and preview deployments - perfect for Astro sites!

#### Method 1: Deploy via Git (Easiest)

1. **Push your code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** → **Create Application** → **Pages**
   - Click **Connect to Git**

3. **Configure your build**
   - Select your repository
   - Configure build settings:
     - **Framework preset**: `Astro`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Production branch**: `main`
   
4. **Deploy**
   - Click **Save and Deploy**
   - Your site will be live in ~1 minute! 🎉

#### Method 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -D wrangler
   ```

2. **Build your site**
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy dist
   ```
   
   **Important**: Use `wrangler pages deploy dist` (not just `wrangler deploy`)

4. **First time setup**
   - The CLI will ask for your project name
   - It will guide you through authentication
   - Your site will be deployed to `<project-name>.pages.dev`

**Note**: Method 1 (Git integration) is recommended as it's easier and provides automatic deployments on every push!

#### Custom Domain Setup

1. In Cloudflare Dashboard, go to your Pages project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow DNS instructions (usually add a CNAME record)

**Benefits of Cloudflare Pages:**
- ⚡ Global CDN with 275+ locations
- 🔒 Free SSL certificates
- 🚀 Unlimited bandwidth
- 📊 Built-in analytics
- 🔄 Automatic preview deployments for PRs
- 💰 Generous free tier

#### Troubleshooting Bun Deployment

If you encounter a **"lockfile had changes, but lockfile is frozen"** error:

**Solution 1: Update lockfile and commit (Recommended)**
```bash
bun install
git add bun.lock
git commit -m "Update Bun lockfile"
git push
```

**Solution 2: Configure Cloudflare to use npm instead**
In Cloudflare Pages project settings:
1. Go to **Settings** → **Build & deployments**
2. Under **Build configurations**, set:
   - Build command: `npm install && npm run build`
   
**Solution 3: Remove frozen lockfile flag**
Create a `package.json` script:
```json
{
  "scripts": {
    "cf:build": "bun install && bun run build"
  }
}
```
Then in Cloudflare, set build command to: `bun run cf:build`


### Environment Variables

If using analytics or external services, set these in Cloudflare Pages dashboard:

1. Go to your project → **Settings** → **Environment variables**
2. Add variables:
   ```env
   PUBLIC_SITE_URL=https://yourdomain.com
   PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```


## 🔧 Configuration

### Adding Remote Images
To use images from external sources, authorize them in `astro.config.mjs`:
```javascript
export default defineConfig({
  image: {
    domains: ["example.com", "cdn.example.com"],
  },
});
```

### RSS Feed
The RSS feed is automatically generated at `/rss.xml` from blog posts in `src/content/blog/`.

### Sitemap
Automatically generated at `/sitemap-index.xml`. Configure in `astro.config.mjs`.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

**Heidar Abdi Ahmed**
- Website: [heidarabdi.dev](https://heidarabdi.dev)
- GitHub: [@Heidarabdi](https://github.com/Heidarabdi)
- Email: [contact@heidarabdi.dev](mailto:contact@heidarabdi.dev)

---

**Built with ❤️ using Astro**
