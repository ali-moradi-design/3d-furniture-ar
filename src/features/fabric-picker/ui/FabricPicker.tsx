'use client';

import type { FabricOption } from '@/entities/product';
import styles from './FabricPicker.module.css';

interface Props {
  fabrics: FabricOption[];
  selectedId: string;
  onSelect: (fabric: FabricOption) => void;
}

export function FabricPicker({ fabrics, selectedId, onSelect }: Props) {
  const selected = fabrics.find((f) => f.id === selectedId);
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        Fabric · <span data-testid="fabric-name">{selected?.label}</span>
      </legend>
      <div className={styles.swatches}>
        {fabrics.map((fabric) => (
          <label key={fabric.id} className={styles.swatch}>
            <input
              type="radio"
              name="fabric"
              value={fabric.id}
              checked={fabric.id === selectedId}
              onChange={() => onSelect(fabric)}
              className={styles.input}
            />
            <span className={styles.dot} style={{ background: fabric.hex }} />
            <span className={styles.hidden}>{fabric.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
