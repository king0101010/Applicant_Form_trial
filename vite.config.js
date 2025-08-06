import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  plugins: [react(), tagger()],
  build: {
    outDir: "dist",
    rollupOptions: {
      // Explicitly ignore all unresolved imports
      onwarn(warning, defaultHandler) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          console.warn(`Ignored unresolved import: ${warning.source}`);
          return;
        }
        defaultHandler(warning);
      },
      // Force externalize i18next if it's still being referenced
      external: ['i18next']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets'),
      '@constants': path.resolve('./src/constants'),
      '@styles': path.resolve('./src/styles'),
    },
  },
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  },
  // Add this optimization setting
  optimizeDeps: {
    exclude: ['i18next']
  }
});