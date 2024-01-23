import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Atlas of Conquests',
        short_name: 'Atlas',
        description: 'Atlas of Conquests PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/world_atlas_favicon.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
});
