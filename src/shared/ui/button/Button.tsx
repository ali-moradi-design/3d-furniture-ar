import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  hint?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  hint,
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      {hint ? <small>{hint}</small> : null}
    </button>
  );
}
