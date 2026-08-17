---
title: "Optimizing Web Accessibility for Public Sector Portals"
excerpt: "Why inclusive design matters and how I implemented WCAG 2.1 standards for the Somali National Women Organization website."
date: "Nov 20, 2024"
readTime: "6 min read"
category: "Web Development"
imageUrl: "https://picsum.photos/800/400?random=5"
---

Building for the public sector means building for everyone. When I was tasked with developing the official portal for the **Somali National Women Organization (SNWO)**, accessibility wasn't just a "nice-to-have"—it was a fundamental requirement.

Digital inclusion ensures that people with disabilities—visual, auditory, motor, or cognitive—can navigate, understand, and interact with the web. Here is how we achieved WCAG 2.1 compliance.

## Semantic HTML: The Foundation

Using correct HTML tags is the first and most impactful step. Screen readers rely on the document object model (DOM) to interpret content.

- Use `<nav>`, `<main>`, and `<footer>` landmarks.
- Ensure heading levels (`h1` through `h6`) follow a logical hierarchy.
- Use `<button>` for actions and `<a>` for navigation links.

## Color Contrast and Visual Hierarchy

We adhered to a strict contrast ratio of at least 4.5:1 for normal text. This is crucial for users with low vision. Additionally, we ensured that color was not the only method used to convey information (e.g., adding text labels to error fields, not just red borders).

## Keyboard Navigation

A mouse is not the only way to browse the web. We rigorously tested the site using only a keyboard to ensure focus states were visible and logical tab order was preserved.

```css
/* Example of high-visibility focus state */
button:focus-visible {
  outline: 3px solid #ea580c;
  outline-offset: 2px;
}
```

By prioritizing accessibility, we didn't just meet a standard; we expanded the reach of the organization's critical resources to the widest possible audience.
