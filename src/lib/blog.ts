import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { marked } from "marked";
import {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostSummary,
  BlogHeading,
  BlogAuthor,
} from "@/types/blog";

/**
 * Resolves the absolute path to the blog content directory (content/blog).
 * Creates the directory if it does not already exist.
 */
export function getBlogDirectory(): string {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  return blogDir;
}

/**
 * Strips fenced code blocks (both ``` and ~~~) from markdown content.
 */
export function stripFencedCodeBlocks(markdown: string): string {
  if (!markdown) return "";
  return markdown.replace(
    /^[ \t]*(`{3,}|~{3,})[^\r\n]*(?:\r?\n)[\s\S]*?(?:^[ \t]*\1[ \t]*(?:\r?\n|$)|$)/gm,
    ""
  );
}

/**
 * Converts a string into a URL-friendly slug / anchor ID.
 * Preserves Unicode letters and numbers (\p{L}, \p{M}, \p{N}), strips HTML tags,
 * markdown links, and collapses whitespace and hyphens.
 */
export function slugify(text: string): string {
  if (!text) return "";
  const cleaned = text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // strip images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip links, keep anchor text
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[*_`~#]/g, "") // strip markdown format characters
    .trim();

  // Normalize Latin accents (e.g. Café -> Cafe)
  const normalized = cleaned
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const slug = normalized
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "") // preserve Unicode letters, combining marks, numbers, spaces, hyphens
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

/**
 * Configure marked with custom heading renderer to guarantee 100% synchronization
 * between rendered <h2 id="...">/<h3 id="..."> tags and Table of Contents links.
 */
marked.use({
  renderer: {
    heading(this: unknown, ...args: unknown[]): string {
      const arg1 = args[0];
      const arg2 = args[1];
      let depth = 2;
      let content = "";
      let plainText = "";

      const self = this as { parser?: { parseInline?: (tokens: unknown[]) => string } } | undefined;

      if (typeof arg1 === "object" && arg1 !== null) {
        const headingObj = arg1 as { depth?: number; tokens?: unknown[]; text?: string };
        depth = headingObj.depth || 2;
        content =
          self?.parser?.parseInline && Array.isArray(headingObj.tokens) && headingObj.tokens.length > 0
            ? self.parser.parseInline(headingObj.tokens)
            : headingObj.text || "";
        plainText = (headingObj.text || content)
          .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/<[^>]*>/g, "")
          .replace(/[*_`#]/g, "")
          .trim();
      } else if (typeof arg1 === "string") {
        content = arg1;
        depth = typeof arg2 === "number" ? arg2 : 2;
        plainText = content
          .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/<[^>]*>/g, "")
          .replace(/[*_`#]/g, "")
          .trim();
      }

      const id = slugify(plainText);
      return `<h${depth} id="${id}">${content}</h${depth}>\n`;
    },
  },
});

/**
 * Calculates reading time in minutes based on an average 200 wpm reading speed.
 */
export function calculateReadingTime(text: string): string {
  if (!text) return "1 min read";
  const cleanText = stripFencedCodeBlocks(text)
    .replace(/`.*?`/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#*_\-\[\]()]/g, " ")
    .trim();

  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Extracts H2 and H3 headings from markdown content for the Table of Contents.
 * Fenced code blocks are stripped before extraction to prevent code comments
 * from polluting the TOC.
 */
export function extractHeadings(markdown: string): BlogHeading[] {
  if (!markdown) return [];
  const headings: BlogHeading[] = [];
  const cleanMarkdown = stripFencedCodeBlocks(markdown);
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanMarkdown)) !== null) {
    const level = match[1].length; // 2 or 3
    const rawText = match[2].trim();
    // Clean text by stripping inline links, formatting, and code ticks
    const cleanText = rawText
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/<[^>]*>/g, "")
      .replace(/[*_`#]/g, "")
      .trim();

    const id = slugify(cleanText);

    headings.push({
      id,
      text: cleanText,
      level,
    });
  }

  return headings;
}

/**
 * Normalizes raw frontmatter data into a strongly-typed BlogPostFrontmatter object.
 * Safely guards against missing fields, null values, and invalid Date objects.
 */
function normalizeFrontmatter(
  data: Record<string, unknown>,
  rawContent: string,
  fallbackSlug: string
): BlogPostFrontmatter {
  const safeData = data && typeof data === "object" ? data : {};
  const title = safeData.title ? String(safeData.title).trim() : fallbackSlug;
  const description = safeData.description ? String(safeData.description).trim() : "";
  const excerpt = safeData.excerpt
    ? String(safeData.excerpt).trim()
    : description || "";

  let dateStr = "2026-10-09";
  if (safeData.date) {
    if (typeof safeData.date === "string") {
      const trimmed = safeData.date.trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          dateStr = trimmed;
        }
      } else {
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          try {
            dateStr = parsed.toISOString().split("T")[0];
          } catch {
            // Keep fallback dateStr
          }
        }
      }
    } else if (safeData.date instanceof Date) {
      if (!isNaN(safeData.date.getTime())) {
        try {
          dateStr = safeData.date.toISOString().split("T")[0];
        } catch {
          // Keep fallback dateStr
        }
      }
    } else if (typeof safeData.date === "number") {
      const parsed = new Date(safeData.date);
      if (!isNaN(parsed.getTime())) {
        try {
          dateStr = parsed.toISOString().split("T")[0];
        } catch {
          // Keep fallback dateStr
        }
      }
    }
  }

  let author: BlogAuthor = {
    name: "Amanuro Stays Team",
    role: "Local Accommodation Specialist",
    avatar: "/amanuro-brand-logo.jpg",
  };
  if (safeData.author) {
    if (typeof safeData.author === "string" && safeData.author.trim()) {
      author.name = safeData.author.trim();
    } else if (typeof safeData.author === "object" && safeData.author !== null && !Array.isArray(safeData.author)) {
      const authorObj = safeData.author as Record<string, unknown>;
      author = {
        name: authorObj.name ? String(authorObj.name).trim() : "Amanuro Stays Team",
        role: authorObj.role ? String(authorObj.role).trim() : "Local Accommodation Specialist",
        avatar: authorObj.avatar ? String(authorObj.avatar).trim() : "/amanuro-brand-logo.jpg",
        bio: authorObj.bio ? String(authorObj.bio).trim() : undefined,
      };
    }
  }

  const category = safeData.category ? String(safeData.category).trim() : "Guides";

  let tags: string[] = [];
  if (Array.isArray(safeData.tags)) {
    tags = (safeData.tags as unknown[]).map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof safeData.tags === "string") {
    tags = safeData.tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
  }

  const readTime =
    safeData.readTime && String(safeData.readTime).trim()
      ? String(safeData.readTime).trim()
      : calculateReadingTime(rawContent);

  const coverImage =
    safeData.coverImage && String(safeData.coverImage).trim()
      ? String(safeData.coverImage).trim()
      : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80";

  const canonicalUrl =
    safeData.canonicalUrl && String(safeData.canonicalUrl).trim()
      ? String(safeData.canonicalUrl).trim()
      : undefined;

  const draft = Boolean(safeData.draft);

  return {
    title,
    description,
    excerpt,
    date: dateStr,
    author,
    category,
    tags,
    readTime,
    coverImage,
    canonicalUrl,
    draft,
  };
}

/**
 * Internal helper to read and parse a markdown file by slug.
 * Confines paths strictly within content/blog and excludes templates/dotfiles.
 */
function readPostFile(slug: string): {
  frontmatter: BlogPostFrontmatter;
  rawContent: string;
  headings: BlogHeading[];
} | null {
  if (!slug || typeof slug !== "string") return null;

  const trimmedSlug = slug.trim();
  if (
    trimmedSlug.startsWith("_") ||
    trimmedSlug.startsWith(".") ||
    trimmedSlug.includes("..") ||
    trimmedSlug.includes("/") ||
    trimmedSlug.includes("\\") ||
    trimmedSlug.includes("\0")
  ) {
    return null;
  }

  const dir = getBlogDirectory();
  const resolvedDir = path.resolve(dir);
  const mdPath = path.resolve(dir, `${trimmedSlug}.md`);
  const mdxPath = path.resolve(dir, `${trimmedSlug}.mdx`);

  // Confine file access strictly to blog content directory
  if (
    !mdPath.startsWith(resolvedDir + path.sep) &&
    !mdxPath.startsWith(resolvedDir + path.sep)
  ) {
    return null;
  }

  let targetPath = "";
  if (fs.existsSync(mdPath)) {
    targetPath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    targetPath = mdxPath;
  } else {
    return null;
  }

  try {
    const rawFile = fs.readFileSync(targetPath, "utf-8");
    let data: Record<string, unknown> = {};
    let content = rawFile;

    const match = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(rawFile);
    if (match) {
      try {
        data = (yaml.load(match[1]) as Record<string, unknown>) || {};
      } catch (err) {
        console.error(`Error parsing YAML frontmatter in ${trimmedSlug}:`, err);
      }
      content = match[2];
    }

    const frontmatter = normalizeFrontmatter(data, content, trimmedSlug);
    const headings = extractHeadings(content);

    return {
      frontmatter,
      rawContent: content,
      headings,
    };
  } catch (error) {
    console.error(`Error reading blog post ${trimmedSlug}:`, error);
    return null;
  }
}

/**
 * Returns all post slugs from content/blog (excluding files starting with '_' or '.').
 * Excludes draft posts unless includeDrafts is true or running in development mode.
 */
export function getAllPostSlugs(includeDrafts: boolean = false): string[] {
  const dir = getBlogDirectory();
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const slugs = new Set<string>();
  const allowDrafts = includeDrafts || process.env.NODE_ENV === "development";

  for (const file of files) {
    // Ignore template or hidden files starting with '_' or '.'
    if (file.startsWith("_") || file.startsWith(".")) continue;

    let slug = "";
    if (file.endsWith(".md")) {
      slug = file.slice(0, -3);
    } else if (file.endsWith(".mdx")) {
      slug = file.slice(0, -4);
    } else {
      continue;
    }

    if (!allowDrafts) {
      const postData = readPostFile(slug);
      if (!postData || postData.frontmatter.draft) {
        continue;
      }
    }

    slugs.add(slug);
  }

  return Array.from(slugs);
}

/**
 * Returns sorted summary of all published blog posts (newest first).
 * Draft posts are excluded unless running in development mode.
 */
export function getAllPosts(): BlogPostSummary[] {
  const dir = getBlogDirectory();
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const posts: BlogPostSummary[] = [];

  for (const file of files) {
    if (file.startsWith("_") || file.startsWith(".")) continue;

    let slug = "";
    if (file.endsWith(".md")) {
      slug = file.slice(0, -3);
    } else if (file.endsWith(".mdx")) {
      slug = file.slice(0, -4);
    } else {
      continue;
    }

    const postData = readPostFile(slug);
    if (!postData) continue;

    // Filter out draft posts unless in development
    if (postData.frontmatter.draft && process.env.NODE_ENV !== "development") {
      continue;
    }

    posts.push({
      slug,
      frontmatter: postData.frontmatter,
      headings: postData.headings,
    });
  }

  // Sort descending by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime() || 0;
    const dateB = new Date(b.frontmatter.date).getTime() || 0;
    return dateB - dateA;
  });
}

/**
 * Retrieves a full blog post by slug, compiling markdown content to HTML.
 * Returns null if not found, if invalid traversal attempted, or if the post is a draft in production.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug || typeof slug !== "string") return null;

  let decodedSlug = slug.trim();
  try {
    decodedSlug = decodeURIComponent(slug).trim();
  } catch {
    return null;
  }

  if (
    decodedSlug.startsWith("_") ||
    decodedSlug.startsWith(".") ||
    decodedSlug.includes("..") ||
    decodedSlug.includes("/") ||
    decodedSlug.includes("\\") ||
    decodedSlug.includes("\0")
  ) {
    return null;
  }

  const postData = readPostFile(decodedSlug);
  if (!postData) return null;

  if (postData.frontmatter.draft && process.env.NODE_ENV !== "development") {
    return null;
  }

  const compiledContent = (await marked.parse(postData.rawContent)) as string;

  return {
    slug: decodedSlug,
    frontmatter: postData.frontmatter,
    content: compiledContent,
    headings: postData.headings,
  };
}

/**
 * Retrieves all unique categories across published blog posts, sorted alphabetically.
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, string>();

  for (const post of posts) {
    const rawCat = post.frontmatter.category;
    if (typeof rawCat === "string") {
      const cat = rawCat.trim();
      if (cat) {
        const lower = cat.toLowerCase();
        if (!categoryMap.has(lower)) {
          categoryMap.set(lower, cat);
        }
      }
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

/**
 * Retrieves all unique tags across published blog posts, sorted alphabetically.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, string>();

  for (const post of posts) {
    if (Array.isArray(post.frontmatter.tags)) {
      for (const rawTag of post.frontmatter.tags) {
        if (typeof rawTag === "string") {
          const tag = rawTag.trim();
          if (tag) {
            const lower = tag.toLowerCase();
            if (!tagMap.has(lower)) {
              tagMap.set(lower, tag);
            }
          }
        }
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

/**
 * Filter posts by category (case-insensitive).
 */
export function getPostsByCategory(category: string): BlogPostSummary[] {
  if (!category || typeof category !== "string") return [];
  const normalizedCategory = category.trim().toLowerCase();
  if (!normalizedCategory) return [];

  const allPosts = getAllPosts();
  return allPosts.filter((post) => {
    const postCategory = (post.frontmatter.category || "").trim().toLowerCase();
    return postCategory === normalizedCategory;
  });
}

/**
 * Filter posts by tag (case-insensitive).
 */
export function getPostsByTag(tag: string): BlogPostSummary[] {
  if (!tag || typeof tag !== "string") return [];
  const normalizedTag = tag.trim().toLowerCase();
  if (!normalizedTag) return [];

  const allPosts = getAllPosts();
  return allPosts.filter((post) => {
    if (!Array.isArray(post.frontmatter.tags)) return false;
    return post.frontmatter.tags.some(
      (t) => typeof t === "string" && t.trim().toLowerCase() === normalizedTag
    );
  });
}

/**
 * Returns related posts for a given post, matching on category or shared tags (case-insensitive).
 */
export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPostSummary[] {
  const maxLimit = Math.max(0, limit);
  if (maxLimit === 0) return [];

  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);

  const candidates = allPosts.filter((p) => p.slug !== currentSlug);
  if (!currentPost) return candidates.slice(0, maxLimit);

  const currentCategoryLower = (currentPost.frontmatter.category || "")
    .trim()
    .toLowerCase();
  const currentTagsLower = new Set(
    (currentPost.frontmatter.tags || [])
      .map((t) => (typeof t === "string" ? t.trim().toLowerCase() : ""))
      .filter(Boolean)
  );

  const scored = candidates.map((post) => {
    let score = 0;

    // Category match bonus (+2 points)
    const postCategoryLower = (post.frontmatter.category || "")
      .trim()
      .toLowerCase();
    if (currentCategoryLower && postCategoryLower === currentCategoryLower) {
      score += 2;
    }

    // Shared tags (+1 point per tag, case-insensitive)
    const postTags = post.frontmatter.tags || [];
    const sharedCount = postTags.filter((t) => {
      const tagLower = typeof t === "string" ? t.trim().toLowerCase() : "";
      return tagLower && currentTagsLower.has(tagLower);
    }).length;

    score += sharedCount;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxLimit).map((s) => s.post);
}
