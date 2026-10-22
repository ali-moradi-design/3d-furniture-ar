'use client';

import { useCallback, useRef, useState } from 'react';
import type { Product } from '@/entities/product';
import { ModelViewer } from '@/shared/ui';
import type { Viewer } from '@/shared/ui';
import styles from './ProductViewer.module.css';

const VIEWS = [
  { id: '3d', label: '3D', orbit: '35deg 75deg auto' },
  { id: 'front', label: 'Front', orbit: '0deg 80deg auto' },
  { id: 'side', label: 'Side', orbit: '90deg 80deg auto' },
  { id: 'detail', label: 'Detail', orbit: '35deg 65deg 55%' },
] as const;

interface Props {
  product: Product;
  variantName?: string;
  onReady: (viewer: Viewer) => void;
}

export function ProductViewer({ product, variantName, onReady }: Props) {
  const el = useRef<Viewer | null>(null);
  const [view, setView] = useState<string>('3d');

  const handleReady = useCallback(
    (viewer: Viewer) => {
      el.current = viewer;
      onReady(viewer);
    },
    [onReady],
  );

  function choose(id: string, orbit: string) {
    setView(id);
    if (el.current) el.current.cameraOrbit = orbit;
  }

  return (
    <div>
      <div className={styles.stage}>
        <span className={styles.tag}>Drag to rotate · pinch to zoom</span>
        <ModelViewer
          className={styles.viewer}
          src={product.modelSrc}
          poster={product.posterSrc}
          alt={`3D model of the ${product.name}`}
          variantName={variantName}
          cameraOrbit={VIEWS[0].orbit}
          autoRotate
          ar
          onReady={handleReady}
        />
      </div>
      <div className={styles.thumbs} role="group" aria-label="Camera angle">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            className={view === v.id ? `${styles.thumb} ${styles.on}` : styles.thumb}
            onClick={() => choose(v.id, v.orbit)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
