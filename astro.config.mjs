import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://guillaumejones.com',
  integrations: [mdx(), react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Doto',
      cssVariable: '--font-doto',
      weights: [700],
      fallbacks: ['monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'B612 Mono',
      cssVariable: '--font-b612-mono',
      fallbacks: ['monospace'],
    },
  ],
});
