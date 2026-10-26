import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://guillaumejones.com",
  integrations: [mdx(), react()],
  prefetch: { prefetchAll: true },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "B612 Mono",
      cssVariable: "--font-b612-mono",
      weights: [400, 700],
      styles: ["normal", "italic"],
      fallbacks: ["monospace"],
    },
  ],
});
