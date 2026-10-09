export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  excerpt: string;
  date: string; // ISO 8601 YYYY-MM-DD
  author: BlogAuthor;
  category: string;
  tags: string[];
  readTime: string; // e.g. "5 min read"
  coverImage: string;
  canonicalUrl?: string;
  draft?: boolean;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string; // Compiled HTML or raw markdown
  headings: BlogHeading[];
}

export interface BlogPostSummary {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  headings: BlogHeading[];
}
