# Heidar Dev Portfolio

A modern, performant portfolio website built with **Astro 7**, featuring optimized images, SEO best practices, and a vintage-inspired design aesthetic.

![Astro](https://img.shields.io/badge/Astro-7.4-BC52EE?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38BDF8?logo=tailwind-css&logoColor=white)

## ✨ Features

### 🚀 Performance & Optimization

- **Local Image Assets** - Branded SVG artwork with no external image-fetch dependency
- **Zero Duplicate Font Loading** - Optimized font delivery via `@fontsource`
- **SVG Optimization** - Build-time compression using Astro's SVGO optimizer
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
- **Blog** - Markdown content collections
- **About Page** - Professional history, education, certificates
- **Contact Form** - Direct email through a Cloudflare Pages Function, with Turnstile and server-side validation; submissions are not stored
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
│   ├── content/           # Content collection entries
│   │   ├── blog/          # Blog posts (Markdown)
│   │   ├── projects/      # Project details
│   ├── content.config.ts  # Collection loaders and schemas
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
├── .nvmrc                 # Supported Node.js version
└── tsconfig.json          # TypeScript config with path aliases
```

## 🚀 Quick Start

### Prerequisites

- Node.js 24.22.0 or newer
- npm 11+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Heidarabdi/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables** (optional)

```bash
cp .env.example .env
# Edit .env with your values
```

4. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site!

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`   |
| `npm run preview` | Preview production build locally     |
| `npm run check`   | Run Astro type checking              |
| `npm test`        | Run static output smoke tests        |
| `npm run clean`   | Remove build artifacts               |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format code with Prettier            |

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

- **Projects**: Add Markdown files to `src/content/projects/`
- **Blog Posts**: Add Markdown files to `src/content/blog/`
- **About Info**: Edit `src/pages/about.astro`

### Images

Place images in `src/assets/images/` and import:

```astro
---
import { Image } from "astro:assets";
import myImage from "@assets/images/my-image.jpg";
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

- **[Astro 7](https://astro.build)** - Static site framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed
- **[@fontsource](https://fontsource.org/)** - Self-hosted fonts

## 🚢 Deployment

This site can be deployed to any static hosting platform. Below are detailed instructions for the most popular options:

### Cloudflare Pages

The site stays at https://heidar-dev.pages.dev. Its Pages Function sends contact
messages through the owner's Gmail over authenticated TLS without storing submissions.

```bash
npm ci
npm run check
npm run lint
npm run build:cloudflare
npm test
npm audit --audit-level=high
```

Configure the Gmail App Password and Turnstile runtime settings using
[contact setup](docs/contact-setup.md). Pushing committed changes to `master`
automatically builds and deploys the existing `heidar-dev` Pages project.
`npm run deploy` can also trigger a fresh build of the latest pushed `master`
commit; it does not upload uncommitted local files.
This repository uses `cf`, not Wrangler.

`npm run dev` previews the static frontend. `npm run dev:cloudflare` runs the
frontend and API in the local Workers runtime. Real Gmail credentials send real
email even in development; automated tests mock delivery.

### Environment Variables

If using analytics or external services, set these in Cloudflare Pages dashboard:

1. Go to your project → **Settings** → **Environment variables**
2. Add variables:
   ```env
   PUBLIC_SITE_URL=https://yourdomain.com
   PUBLIC_CF_ANALYTICS_TOKEN=your-cloudflare-token
   ```

#### Getting Your Cloudflare Analytics Token

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Analytics & Logs** → **Web Analytics**
3. Click **Add a site** and enter your domain
4. Copy the token from the script snippet (the value after `data-cf-beacon`)
5. Add it as `PUBLIC_CF_ANALYTICS_TOKEN` in your environment variables

The analytics script only loads in production builds.

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

### Content collections

Collections are defined in `src/content.config.ts` and loaded from Markdown files with Astro's built-in `glob()` loader. Update the schemas there when changing frontmatter fields.

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

- Website: [heidar-dev.pages.dev](https://heidar-dev.pages.dev)
- GitHub: [@Heidarabdi](https://github.com/Heidarabdi)
- Email: [xeydarcabdi3@gmail.com](mailto:xeydarcabdi3@gmail.com)

---

**Built with ❤️ using Astro**
