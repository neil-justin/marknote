import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import 'dotenv/config';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@routes': path.resolve(__dirname, './src/app/routes'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['marknote-client.onrender.com'],
    host: true,
    proxy: {
      '/api': {
        target:
          process.env.VITE_NODE_ENV === 'production'
            ? 'https://marknote-api.onrender.com/'
            : 'http://marknote_api:3000/',
        changeOrigin: true,
      },
    },
  },
});
