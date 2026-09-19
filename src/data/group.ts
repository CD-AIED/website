import type { ImageMetadata } from 'astro';
import togetherAiLogo from '../assets/images/sponsors/together-ai.svg';
import publicationData from './publications.json';

export const group = {
  introduction: 'We’re a newly formed group of researchers from the University of Bucharest. We bring our questions, ideas, and different perspectives to a shared research space.',
  outlook: 'Our group starts in Bucharest. As we grow, we hope to welcome collaborators from other institutions and disciplines.',
  interests: [
    { title: 'Datasets & automated assessment', description: 'We build evaluation datasets from real exams — Bacalaureat, licensing tests, subject exams in mathematics, grammar, biology and history — and study how well automated systems can grade and answer them.' },
    { title: 'Competitive programming', description: 'We generate problems, tests and editorials for programming contests, and use olympiad problems to study machine algorithmic reasoning' },
    { title: 'Expert-in-the-loop auditing', description: 'We design agentic systems that audit educational material and the models that deliver it, checking grammatical correctness, factual accuracy, consistency and bias, while human experts keep control of the verdict — including how models answer differently for different students.' },
  ],
};

export interface Sponsor {
  name: string;
  logo: ImageMetadata;
  url?: string;
}
export const sponsors: Sponsor[] = [
  { name: 'Together AI', logo: togetherAiLogo, url: 'https://www.together.ai/' },
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
  url?: string;
}
export const publications: Publication[] = publicationData;

