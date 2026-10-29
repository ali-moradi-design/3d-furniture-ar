import type { NextConfig } from 'next';

// The site runs as a Next.js server in a container (output: 'standalone'),
// behind Nginx on the VPS. Only the build output goes into the image.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
];

// Models, the Draco decoder and posters have no content hash in their names:
// a long cache, but not immutable (rename the file when a model changes).
const longCache = { key: 'Cache-Control', value: 'public, max-age=2592000' };

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
  // Nginx on the server gzips responses: no second compression in Node.
  compress: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/models/:file*',
        headers: [longCache, { key: 'Content-Type', value: 'model/gltf-binary' }],
      },
      { source: '/draco/:file*', headers: [longCache] },
      { source: '/posters/:file*', headers: [longCache] },
    ];
  },
};

export default nextConfig;
