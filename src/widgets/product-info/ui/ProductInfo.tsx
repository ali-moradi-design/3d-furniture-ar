'use client';

import type { FabricOption, Product } from '@/entities/product';
import { AddToCart } from '@/features/add-to-cart';
import { FabricPicker } from '@/features/fabric-picker';
import { ViewInRoom } from '@/features/view-in-room';
import { formatPrice } from '@/shared/lib';
import type { Viewer } from '@/shared/ui';
import styles from './ProductInfo.module.css';

interface Props {
  product: Product;
  fabricId: string;
  onFabric: (fabric: FabricOption) => void;
  viewer: Viewer | null;
}

export function ProductInfo({ product, fabricId, onFabric, viewer }: Props) {
  const { w, d, h } = product.dimensionsCm;
  return (
    <div className={styles.info}>
      <p className={styles.kicker}>New · {product.category}</p>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.price}>
        {formatPrice(product.price)} <span>· free delivery over $300</span>
      </p>
      <p className={styles.lead}>{product.description}</p>

      {product.fabrics.length > 0 ? (
        <FabricPicker
          fabrics={product.fabrics}
          selectedId={fabricId}
          onSelect={onFabric}
        />
      ) : null}

      <h2 className={styles.label}>Dimensions (measured from the 3D model)</h2>
      <dl className={styles.dims}>
        <div>
          <dt>Width</dt>
          <dd>{w} cm</dd>
        </div>
        <div>
          <dt>Depth</dt>
          <dd>{d} cm</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{h} cm</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <AddToCart productName={product.name} />
        <ViewInRoom viewer={viewer} />
      </div>
    </div>
  );
}
