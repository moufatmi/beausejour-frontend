import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/beausejour-frontend/',
=======
  base: "/beausejour-frontend/",
>>>>>>> 44c14e0d582a5ab5b7037c30bfe5770ff1c66704
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
