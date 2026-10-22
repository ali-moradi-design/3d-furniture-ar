import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Next.js routes live in the root `app/` folder, outside `src/`, so Steiger cannot
    // see their references. It would flag every widget used only there as unused.
    files: ['./src/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
