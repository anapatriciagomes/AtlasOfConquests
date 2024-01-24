import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssets: [
    'world_atlas_favicon_192x192.png',
    'world_atlas_favicon_512x512.png',
    'world_atlas_favicon_apple_180x180.png',
    'world_atlas_favicon_144x144.png',
  ],
  manifest: {
    name: 'Atlas of Conquests',
    short_name: 'Atlas',
    description: 'Atlas of Conquests PWA',
    icons: [
      {
        src: '/world_atlas_favicon_192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/world_atlas_favicon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/world_atlas_favicon_apple_180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple-touch-icon',
      },
      {
        src: '/world_atlas_favicon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
    prefer_related_applications: false,
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
