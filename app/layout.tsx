import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/styles/globals.css';
import { SITE } from '@/shared/config';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

export const metadata: Metadata = {
  title: { default: `${SITE.brand} · ${SITE.tagline}`, template: `%s · ${SITE.brand}` },
  description:
    'Fictional furniture shop demo: 3D product viewer and "view in your room" augmented reality.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
