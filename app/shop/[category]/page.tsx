import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORY_LABEL } from '@/entities/product';
import type { Category } from '@/entities/product';
import { ShopPage } from '@/pages/shop';

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(CATEGORY_LABEL) as Category[]).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<'/shop/[category]'>): Promise<Metadata> {
  const { category } = await params;
  return { title: CATEGORY_LABEL[category as Category] ?? 'Shop' };
}

export default async function Page({ params }: PageProps<'/shop/[category]'>) {
  const { category } = await params;
  if (!(category in CATEGORY_LABEL)) notFound();
  return <ShopPage category={category as Category} />;
}
