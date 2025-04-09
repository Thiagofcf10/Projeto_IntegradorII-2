import { defineConfig } from 'vite';
import ghPages from 'vite-plugin-gh-pages';


export default defineConfig({
  plugins: [ghPages()],
  base: 'https://github.com/Thiagofcf10/Projeto_IntegradorII-2.git', // Caminho base para GitHub Pages
});


