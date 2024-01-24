import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssets: [
    'pwa-192x192.png',
    'pwa-512x512.png',
    'apple-touch-icon.png',
    'pwa-144x144.png',
    '**/*',
  ],
  workbox: {
    globPatterns: ['**/*'],
  },
  manifest: {
    name: 'Atlas of Conquests',
    short_name: 'Atlas',
    description: 'Atlas of Conquests Web App',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/pwa-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
});
