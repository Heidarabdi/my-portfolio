/**
 * Astro Image Helper
 * Provides utilities for handling both local and remote images
 */

/**
 * Get optimized image props for remote images
 * For remote images, Astro requires explicit width/height
 */
export function getRemoteImageProps(
  url: string,
  alt: string,
  width: number,
  height: number,
) {
  return {
    src: url,
    alt,
    width,
    height,
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}

/**
 * Generate the local branded placeholder image URL.
 */
export function getPlaceholderImage(
  seed: number,
  width = 600,
  height = 400,
): string {
  void width;
  void height;
  void seed;
  return "/images/portfolio/project-placeholder.svg";
}
