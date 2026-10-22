import type { Category, ModelCredit, Product } from './types';

const CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/';
const CC_BY = 'https://creativecommons.org/licenses/by/4.0/';
const KHRONOS = 'https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models';

const credit = (
  title: string,
  author: string,
  license: ModelCredit['license'],
  sourceUrl: string,
): ModelCredit => ({
  title,
  author,
  license,
  licenseUrl: license === 'CC0 1.0' ? CC0 : CC_BY,
  sourceUrl,
});

export const PRODUCTS: Product[] = [
  {
    slug: 'marlow-lounge-chair',
    name: 'Marlow Lounge Chair',
    category: 'chairs',
    price: 489,
    summary: 'Low, wide and button-tufted, on solid walnut legs.',
    description:
      'A low, wide chair with a button-tufted seat and solid walnut legs. See it in 3D, then place it in your own room at true size.',
    details:
      'Solid walnut legs, high-resilience foam, performance velvet. Delivered assembled. 30-day returns.',
    dimensionsCm: { w: 83, d: 57, h: 69 },
    modelSrc: '/models/marlow-lounge-chair.glb',
    posterSrc: '/posters/marlow-lounge-chair.webp',
    fabrics: [
      { id: 'mango', label: 'Mango', hex: '#e8562c', variant: 'Mango Velvet' },
      { id: 'peacock', label: 'Peacock', hex: '#1f6f78', variant: 'Peacock Velvet' },
    ],
    credit: credit(
      'SheenChair',
      'Eric Chadwick (Wayfair)',
      'CC0 1.0',
      `${KHRONOS}/SheenChair`,
    ),
    related: [
      'slate-coffee-table',
      'oak-side-table',
      'hollis-swivel-chair',
      'ainsley-velvet-sofa',
    ],
  },
  {
    slug: 'ainsley-velvet-sofa',
    name: 'Ainsley Velvet Sofa',
    category: 'sofas',
    price: 1290,
    summary: 'A curved velvet sofa with slim brass-capped legs.',
    description:
      'A sweeping curved sofa in soft velvet with slim legs. Choose a fabric, then see how it sits in your living room.',
    details:
      'Kiln-dried hardwood frame, velvet upholstery, brass-capped steel legs. Delivered in two parts. 30-day returns.',
    dimensionsCm: { w: 219, d: 102, h: 79 },
    modelSrc: '/models/ainsley-velvet-sofa.glb',
    posterSrc: '/posters/ainsley-velvet-sofa.webp',
    fabrics: [
      { id: 'champagne', label: 'Champagne', hex: '#d9c7a3', variant: 'Champagne' },
      { id: 'navy', label: 'Navy', hex: '#27456e', variant: 'Navy' },
      { id: 'gray', label: 'Gray', hex: '#8c8c8c', variant: 'Gray' },
      { id: 'black', label: 'Black', hex: '#2d2d2d', variant: 'Black' },
      { id: 'pale-pink', label: 'Pale Pink', hex: '#e6c3c3', variant: 'Pale Pink' },
    ],
    credit: credit(
      'GlamVelvetSofa',
      'Eric Chadwick (Wayfair)',
      'CC BY 4.0',
      `${KHRONOS}/GlamVelvetSofa`,
    ),
    related: [
      'marlow-lounge-chair',
      'slate-coffee-table',
      'hollis-swivel-chair',
      'oak-side-table',
    ],
  },
  {
    slug: 'slate-coffee-table',
    name: 'Slate Coffee Table',
    category: 'tables',
    price: 229,
    summary: 'A low oak frame with a slate-look top.',
    description:
      'A low coffee table with an inlaid slate-look top and a warm oak frame. Check the size against your sofa before you buy.',
    details:
      'Solid oak frame, composite top. Flat-pack with tools included. 30-day returns.',
    dimensionsCm: { w: 60, d: 120, h: 39 },
    modelSrc: '/models/slate-coffee-table.glb',
    posterSrc: '/posters/slate-coffee-table.webp',
    fabrics: [],
    credit: credit(
      'Modern Coffee Table 01',
      'Amin (Poly Haven)',
      'CC0 1.0',
      'https://polyhaven.com/a/modern_coffee_table_01',
    ),
    related: [
      'oak-side-table',
      'marlow-lounge-chair',
      'ainsley-velvet-sofa',
      'hollis-swivel-chair',
    ],
  },
  {
    slug: 'oak-side-table',
    name: 'Oak Side Table',
    category: 'tables',
    price: 139,
    summary: 'Two open shelves in warm oak.',
    description:
      'A compact side table with two open shelves, sized to sit beside a sofa or armchair.',
    details:
      'Solid oak with a clear satin finish. Flat-pack with tools included. 30-day returns.',
    dimensionsCm: { w: 55, d: 45, h: 55 },
    modelSrc: '/models/oak-side-table.glb',
    posterSrc: '/posters/oak-side-table.webp',
    fabrics: [],
    credit: credit(
      'Side Table 01',
      'James Ray Cock (Poly Haven)',
      'CC0 1.0',
      'https://polyhaven.com/a/side_table_01',
    ),
    related: [
      'slate-coffee-table',
      'marlow-lounge-chair',
      'hollis-swivel-chair',
      'ainsley-velvet-sofa',
    ],
  },
  {
    slug: 'hollis-swivel-chair',
    name: 'Hollis Swivel Chair',
    category: 'chairs',
    price: 649,
    summary: 'A mid-century swivel lounger in leather and bent wood.',
    description:
      'A mid-century swivel lounge chair with a leather seat, bent-wood shell and a polished star base.',
    details:
      'Bent-wood shell, full-grain leather, aluminium base. Delivered assembled. 30-day returns.',
    dimensionsCm: { w: 101, d: 119, h: 117 },
    modelSrc: '/models/hollis-swivel-chair.glb',
    posterSrc: '/posters/hollis-swivel-chair.webp',
    fabrics: [],
    credit: credit(
      'Mid Century Lounge Chair',
      'Kuutti Siitonen (Poly Haven)',
      'CC0 1.0',
      'https://polyhaven.com/a/mid_century_lounge_chair',
    ),
    related: [
      'marlow-lounge-chair',
      'slate-coffee-table',
      'oak-side-table',
      'ainsley-velvet-sofa',
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(product: Product): Product[] {
  return product.related
    .map(getProduct)
    .filter((p): p is Product => p !== undefined)
    .slice(0, 4);
}

export function byCategory(category: Category | 'all'): Product[] {
  return category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
}
