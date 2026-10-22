import Image from 'next/image';
import styles from './ArExplainer.module.css';

export function ArExplainer({
  posterSrc,
  productName,
}: {
  posterSrc: string;
  productName: string;
}) {
  return (
    <section className={styles.section} aria-labelledby="ar-title">
      <div className={styles.text}>
        <h2 id="ar-title">See it in your room</h2>
        <ol className={styles.steps}>
          <li>
            <span aria-hidden="true">1</span>
            <p>
              Tap <strong>View in your room</strong> on your phone.
            </p>
          </li>
          <li>
            <span aria-hidden="true">2</span>
            <p>Point the camera at the floor and move slowly.</p>
          </li>
          <li>
            <span aria-hidden="true">3</span>
            <p>Drag to place, twist to rotate. It keeps its real size.</p>
          </li>
        </ol>
        <p className={styles.note}>
          On desktop we show a QR code that opens this page on your phone. AR works on
          Android (Chrome, ARCore) and iPhone (Safari, AR Quick Look).
        </p>
      </div>
      <div className={styles.phone}>
        <Image
          src={posterSrc}
          alt={`${productName} placed in a room, phone preview`}
          width={600}
          height={450}
        />
      </div>
    </section>
  );
}
