'use client';

import Link from 'next/link';
import { CATEGORY_LABEL } from '@/entities/product';
import type { Category } from '@/entities/product';
import { SITE } from '@/shared/config';
import { useCartCount } from '@/shared/lib';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const count = useCartCount();
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.row}`}>
        <Link href="/" className={styles.logo}>
          Fern<i>hill</i> &amp; Co.
          <span className={styles.hidden}>{SITE.brand} home</span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <Link href="/">All</Link>
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
            <Link key={c} href={`/shop/${c}/`}>
              {CATEGORY_LABEL[c]}
            </Link>
          ))}
          <span aria-live="polite">Cart ({count})</span>
        </nav>
      </div>
    </header>
  );
}
