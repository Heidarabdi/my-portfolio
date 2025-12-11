# Assets Directory

This directory contains project assets that will be optimized by Astro.

## Structure

- `images/` - Image assets (PNG, JPG, WebP, SVG)
- Future: `fonts/`, `icons/`, etc.

## Usage

Import and use images with Astro's Image component:

```astro
---
import { Image } from 'astro:assets';
import myImage from '@assets/images/hero.jpg';
---

<Image src={myImage} alt="Description" />
```

## Benefits

- Automatic optimization
- Responsive images
- Format conversion (WebP, AVIF)
- Lazy loading
- Better performance
