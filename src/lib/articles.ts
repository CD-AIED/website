import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getPublishedArticles() {
  const articles = await getCollection(
    'articles',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );

  return articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function getReadingTime(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
