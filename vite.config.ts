import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/MRZ-Generator/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});