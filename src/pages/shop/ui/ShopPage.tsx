import type { Category } from '@/entities/product';
import { ShopGrid } from '@/widgets/shop-grid';

export function ShopPage({ category }: { category: Category | 'all' }) {
  return (
    <div className="wrap">
      <ShopGrid active={category} />
    </div>
  );
}
