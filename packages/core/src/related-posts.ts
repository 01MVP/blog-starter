import type { Post } from "./types";

export function pickRelatedPosts(post: Post, candidates: Post[], limit = 3): Post[] {
  const others = candidates.filter(
    (candidate) => candidate.id !== post.id && candidate.status === "published",
  );
  const tagSlugs = new Set(post.tags.map((tag) => tag.slug));
  const tagged = tagSlugs.size
    ? others.filter((candidate) => candidate.tags.some((tag) => tagSlugs.has(tag.slug)))
    : [];

  return (tagged.length ? tagged : others).slice(0, limit);
}
