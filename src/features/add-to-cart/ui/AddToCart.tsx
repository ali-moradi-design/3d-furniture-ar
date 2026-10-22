'use client';

import { useState } from 'react';
import { addToCart } from '@/shared/lib';
import { Button } from '@/shared/ui';

export function AddToCart({ productName }: { productName: string }) {
  const [added, setAdded] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          addToCart();
          setAdded(true);
        }}
      >
        Add to cart
      </Button>
      <p role="status" style={{ margin: '8px 0 0', fontSize: 13, minHeight: '1.5em' }}>
        {added ? `${productName} added. This is a demo: nothing is charged.` : ''}
      </p>
    </>
  );
}
