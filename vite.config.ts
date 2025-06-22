import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://ticket.beausejourvoyage.com/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
