import type { ImageMetadata } from 'astro';
import sponsorMark from '../assets/images/sponsors/placeholder.svg';

// Replace the sample research topics when the group's focus is confirmed.
export const group = {
  introduction: 'We’re a newly formed group of researchers from the University of Bucharest. We bring our questions, ideas, and different perspectives to a shared research space.',
  outlook: 'Our group starts in Bucharest. As we grow, we hope to welcome collaborators from other institutions and disciplines.',
  researchIsPlaceholder: true,
  interests: [
    { title: 'AI & education', description: 'Exploring how artificial intelligence can support teaching, learning, and the people involved.' },
    { title: 'Language & understanding', description: 'Studying language technologies and how we can better understand and evaluate them.' },
    { title: 'Human-centred AI', description: 'Asking how AI systems can be useful, understandable, and responsive to human needs.' },
  ],
};

export interface Sponsor {
  name: string;
  logo: ImageMetadata;
  url?: string;
  placeholder?: boolean;
}
// Generic placeholders, not real endorsements. Import actual local logos above.
export const sponsors: Sponsor[] = [
  { name: 'Sponsor 01', logo: sponsorMark, placeholder: true },
  { name: 'Sponsor 02', logo: sponsorMark, placeholder: true },
  { name: 'Sponsor 03', logo: sponsorMark, placeholder: true },
  { name: 'Sponsor 04', logo: sponsorMark, placeholder: true },
];

export interface Project {
  title: string;
  description: string;
  url?: string;
}
export const projects: Project[] = [];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
  abstract?: string;
}
export const publications: Publication[] = [];
