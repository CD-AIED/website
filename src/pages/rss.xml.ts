import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPublishedArticles } from '../lib/articles';
import { fullName, getArticleAuthors } from '../lib/researchers';
import { sitePath } from '../lib/paths';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const articles = await getPublishedArticles();
  const siteOrigin = site ?? new URL('http://localhost:4321');
  const absoluteUrl = (path: string) => new URL(sitePath(path), siteOrigin).href;
  const feedUrl = absoluteUrl('/rss.xml');

  const items = await Promise.all(articles.map(async (article) => {
    const { title, description, pubDate, tags } = article.data;
    const authors = await getArticleAuthors(article);
    const articleUrl = absoluteUrl(`/articles/${article.id}/`);

    return `
      <item>
        <title>${escapeXml(title)}</title>
        <link>${articleUrl}</link>
        <guid isPermaLink="true">${articleUrl}</guid>
        <dc:creator>${escapeXml(authors.map(fullName).join(', ') || SITE_TITLE)}</dc:creator>
        <pubDate>${pubDate.toUTCString()}</pubDate>
        <description>${escapeXml(description)}</description>
        ${tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
      </item>`;
  }));

  const lastBuildDate = articles[0]?.data.pubDate.toUTCString() ?? new Date(0).toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)} articles</title>
    <link>${absoluteUrl('/')}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items.join('')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
