import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/shared/lib';
import { CATEGORY_LABEL } from '../model/types';
import type { Product } from '../model/types';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
  /** Heading level of the product name; pick the level that follows the section heading. */
  headingLevel?: 'h2' | 'h3';
}

export function ProductCard({ product, headingLevel: Heading = 'h2' }: Props) {
  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}/`} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={product.posterSrc}
            alt={`${product.name}, front three-quarter view`}
            width={600}
            height={450}
            className={styles.image}
          />
          <span className={styles.badge}>3D · AR</span>
        </div>
        <div className={styles.body}>
          <p className={styles.category}>{CATEGORY_LABEL[product.category]}</p>
          <Heading className={styles.name}>{product.name}</Heading>
          <p className={styles.summary}>{product.summary}</p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
