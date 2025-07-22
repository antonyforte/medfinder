// astro.config.mjs
import { defineConfig } from 'astro/config';

// ADICIONE a linha de importação do Node:
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // ...suas outras configurações...
  output: "server",
  // SUBSTITUA o adaptador "deno()" pelo "node()":
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: Number(process.env.PORT || 4321), // Usa a porta do ambiente ou 4321 como padrão
    host: true, // Necessário para escutar em todos os IPs dentro do container
  }
});