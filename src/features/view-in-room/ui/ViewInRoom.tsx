'use client';

import QRCode from 'qrcode';
import { useRef, useState } from 'react';
import { Button } from '@/shared/ui';
import type { Viewer } from '@/shared/ui';
import styles from './ViewInRoom.module.css';

interface Props {
  viewer: Viewer | null;
}

/** Opens AR on phones; on desktop shows a QR code that opens this page on a phone. */
export function ViewInRoom({ viewer }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [qr, setQr] = useState('');

  async function handleClick() {
    if (viewer?.canActivateAR) {
      await viewer.activateAR();
      return;
    }
    setQr(await QRCode.toString(window.location.href, { type: 'svg', margin: 1 }));
    dialog.current?.showModal();
  }

  return (
    <>
      <Button variant="secondary" hint="AR on Android and iPhone" onClick={handleClick}>
        View in your room
      </Button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="qr-title">
        <h2 id="qr-title" className={styles.title}>
          Open on your phone
        </h2>
        <p>Scan this code with your phone camera, then tap “View in your room”.</p>
        <div
          className={styles.qr}
          role="img"
          aria-label="QR code for this page"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <form method="dialog">
          <button className={styles.close}>Close</button>
        </form>
      </dialog>
    </>
  );
}
