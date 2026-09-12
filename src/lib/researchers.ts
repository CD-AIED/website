import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import placeholder from '../assets/images/researchers/placeholder.svg';

export type Researcher = CollectionEntry<'researchers'>;
const photos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/researchers/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export const fullName = ({ data }: Researcher) => `${data.firstName} ${data.lastName}`;

export function researcherPhoto(username: string) {
  for (const extension of ['jpg', 'jpeg', 'png', 'webp']) {
    const photo = photos[`../assets/images/researchers/${username}.${extension}`];
    if (photo) return photo.default;
  }
  return placeholder;
}

export async function getResearchers() {
  const researchers = await getCollection('researchers');
  for (const person of researchers) {
    if (person.id !== person.data.username) {
      throw new Error(`Researcher ${person.data.username}: filename must be ${person.data.username}.md`);
    }
  }
  return researchers.sort((a, b) => a.data.order - b.data.order || fullName(a).localeCompare(fullName(b), 'en'));
}

export async function getArticleAuthors(article: CollectionEntry<'articles'>) {
  return Promise.all(article.data.authors.map(async (reference) => {
    const person = await getEntry(reference);
    // Some collection references are resolved lazily; make typos fail the build.
    if (!person) throw new Error(`Article ${article.id}: unknown author "${reference.id}".`);
    return person;
  }));
}
