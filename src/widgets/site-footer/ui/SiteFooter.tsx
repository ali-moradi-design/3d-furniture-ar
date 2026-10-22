import { PRODUCTS } from '@/entities/product';
import { SITE } from '@/shared/config';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <p>{SITE.notice}</p>
        <details className={styles.credits}>
          <summary>Credits and licenses</summary>
          <h2 className={styles.title}>3D models</h2>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                {p.name} uses <a href={p.credit.sourceUrl}>“{p.credit.title}”</a> by{' '}
                {p.credit.author}, licensed under{' '}
                <a href={p.credit.licenseUrl}>{p.credit.license}</a>.
                {p.credit.license === 'CC BY 4.0' ? ' Renamed under our brand.' : ''}
              </li>
            ))}
          </ul>
          <h2 className={styles.title}>Software</h2>
          <p>
            3D viewer and AR:{' '}
            <a href="https://github.com/google/model-viewer">model-viewer</a> by Google
            (Apache-2.0). Draco decoder from three.js (MIT).
          </p>
        </details>
      </div>
    </footer>
  );
}
