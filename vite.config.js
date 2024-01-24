import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests:["./src/assets/world_atlas_favicon_192x192.png", "./src/assets/world_atlas_favicon_512x512.png", "./src/assets/world_atlas_favicon_apple_180x180.png"],
  manifest: {
    name: "Atlas of Conquests",
    short_name: "Atlas",
    description: "Atlas of Conquests PWA",
    icons: [
      {
        src: "./src/assets/world_atlas_favicon_192x192.png",
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: "./src/assets/world_atlas_favicon_512x512.png",
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: "./src/assets/world_atlas_favicon_apple_180x180.png",
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple-touch-icon',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#f0e7db',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait',
    prefer_related_applications: false,
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
