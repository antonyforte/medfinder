# --- Estágio 1: Construção (Build Stage) ---
# Usa a imagem oficial do Bun para construir o projeto.
FROM oven/bun:1 as build

# Define o diretório de trabalho.
WORKDIR /app

# Copia os arquivos de manifesto de dependências.
COPY package.json bun.lockb ./

# Instala TODAS as dependências, incluindo as de desenvolvimento, necessárias para o build.
RUN bun install --frozen-lockfile

# Copia o restante do código-fonte.
COPY . .

# Executa o script de build do Astro.
RUN bun run build


# --- Estágio 2: Produção (Production Stage) ---
# Usa a imagem 'slim' do Bun, que é menor e ideal para produção.
FROM oven/bun:1-slim as production

WORKDIR /app

# Copia os arquivos de manifesto de dependências do estágio de build.
COPY --from=build /app/package.json ./
COPY --from=build /app/bun.lockb ./

# Instala APENAS as dependências de produção.
# Isso torna a imagem final muito menor e mais segura.
RUN bun install --production --frozen-lockfile

# Copia a pasta 'dist' com a aplicação construída do estágio de build.
COPY --from=build /app/dist ./dist

# O Cloud Run injeta a variável de ambiente PORT.
# A aplicação DEVE escutar nesta porta. O valor padrão é 8080.
# O EXPOSE é mais para documentação; o importante é a aplicação escutar na porta correta.
EXPOSE 8080

# Comando final para iniciar o servidor.
# Executa diretamente o arquivo de entrada do servidor gerado pelo Astro.
CMD ["bun", "dist/server/entry.mjs"]
