import type { CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

// Helper type for project data (frontmatter + content entry ID)
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  gallery: string[];
  category: "Machine Learning" | "Web Development" | "IT Support" | "Other";
  featured: boolean;
  order: number;
  status: "completed" | "in-progress" | "archived";
  client?: string;
  year?: number;
  teamSize?: number;
}

// Convert collection entry to simple project data
export function toProjectData(entry: Project): ProjectData {
  return {
    id: entry.id,
    ...entry.data,
  };
}
