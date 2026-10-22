import Link from 'next/link';
import { CATEGORY_LABEL, ProductCard, byCategory } from '@/entities/product';
import type { Category } from '@/entities/product';
import styles from './ShopGrid.module.css';

interface Props {
  active: Category | 'all';
}

export function ShopGrid({ active }: Props) {
  const products = byCategory(active);
  const filters: { id: Category | 'all'; label: string; href: string }[] = [
    { id: 'all', label: 'All', href: '/' },
    ...(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => ({
      id: c,
      label: CATEGORY_LABEL[c],
      href: `/shop/${c}/`,
    })),
  ];
  return (
    <section aria-labelledby="shop-title">
      <div className={styles.intro}>
        <h1 id="shop-title">
          {active === 'all' ? 'Furniture you can try first' : CATEGORY_LABEL[active]}
        </h1>
        <p>
          Spin every piece in 3D, check the real dimensions, then place it in your room
          with augmented reality.
        </p>
      </div>
      <nav aria-label="Filter by category" className={styles.filters}>
        {filters.map((f) => (
          <Link
            key={f.id}
            href={f.href}
            aria-current={f.id === active ? 'page' : undefined}
            className={f.id === active ? `${styles.chip} ${styles.on}` : styles.chip}
          >
            {f.label}
          </Link>
        ))}
      </nav>
      <p className={styles.count}>
        {products.length} {products.length === 1 ? 'product' : 'products'}
      </p>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
