import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this repository at /gorkiland-website/.
  // Keep local development and the normal production build rooted at /.
  base: mode === 'github-pages' ? '/gorkiland-website/' : '/',
  plugins: [react()],
}));
