import { ProductCard } from '@/entities/product';
import type { Product } from '@/entities/product';
import styles from './RelatedProducts.module.css';

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className={styles.section} aria-labelledby="related-title">
      <h2 id="related-title">Pairs well with</h2>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} headingLevel="h3" />
        ))}
      </div>
    </section>
  );
}
