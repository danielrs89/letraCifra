import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/letraCifra/',  // Asegúrate de que esto coincida con el nombre de tu repositorio
  build: {
    outDir: 'dist',  // Asegúrate de que los archivos se generen en la carpeta dist
  },
});
