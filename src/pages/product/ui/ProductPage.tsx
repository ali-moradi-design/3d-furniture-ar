import Link from 'next/link';
import { CATEGORY_LABEL, getRelated } from '@/entities/product';
import type { Product } from '@/entities/product';
import { ArExplainer } from '@/widgets/ar-explainer';
import { RelatedProducts } from '@/widgets/related-products';
import { ProductScene } from './ProductScene';
import styles from './ProductPage.module.css';

export function ProductPage({ product }: { product: Product }) {
  return (
    <div className="wrap">
      <nav aria-label="Breadcrumb" className={styles.crumb}>
        <Link href="/">Home</Link> /{' '}
        <Link href={`/shop/${product.category}/`}>
          {CATEGORY_LABEL[product.category]}
        </Link>{' '}
        / <span aria-current="page">{product.name}</span>
      </nav>
      <ProductScene product={product} />
      <ArExplainer posterSrc={product.posterSrc} productName={product.name} />
      <section className={styles.details} aria-labelledby="details-title">
        <h2 id="details-title">Details &amp; care</h2>
        <p>{product.details}</p>
      </section>
      <RelatedProducts products={getRelated(product)} />
    </div>
  );
}
