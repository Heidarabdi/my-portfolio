import ai from "../assets/home/blog-ai.jpg";
import accessibility from "../assets/home/blog-accessibility.jpg";
import systems from "../assets/home/workspace.jpg";
import type { ImageMetadata } from "astro";
export const journalImages: Record<string, ImageMetadata> = {
  "ai-integration": ai,
  "web-accessibility": accessibility,
  "it-support": systems,
};
export const formatPostDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(date);
