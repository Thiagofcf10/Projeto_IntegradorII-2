import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Permite acessar pelo IP local (ex.: em uma rede local)
    port: 3000, // Porta que será usada para o servidor de desenvolvimento
  },
  build: {
    outDir: 'dist', // Diretório de saída para os arquivos de produção
    sourcemap: true, // Gera mapa de origem para depuração em produção
  },
  base: process.env.NODE_ENV === 'production' ? '/Projeto_IntegradorII-2/' : '/',
});
