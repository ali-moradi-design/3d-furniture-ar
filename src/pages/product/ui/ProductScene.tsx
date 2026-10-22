'use client';

import { useState } from 'react';
import type { FabricOption, Product } from '@/entities/product';
import { ProductInfo } from '@/widgets/product-info';
import { ProductViewer } from '@/widgets/product-viewer';
import type { Viewer } from '@/shared/ui';
import styles from './ProductPage.module.css';

/** Holds the state shared by the 3D viewer and the buy box: fabric and AR viewer. */
export function ProductScene({ product }: { product: Product }) {
  const [fabric, setFabric] = useState<FabricOption | undefined>(product.fabrics[0]);
  const [viewer, setViewer] = useState<Viewer | null>(null);

  return (
    <div className={styles.hero}>
      <ProductViewer
        product={product}
        variantName={fabric?.variant}
        onReady={setViewer}
      />
      <ProductInfo
        product={product}
        fabricId={fabric?.id ?? ''}
        onFabric={setFabric}
        viewer={viewer}
      />
    </div>
  );
}
