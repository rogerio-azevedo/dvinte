# Use Node.js 22 LTS
FROM node:22.16-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json primeiro (cache do Docker)
COPY package*.json ./

# Instalar TODAS as dependências 
RUN npm ci --silent

# Copiar código da aplicação
COPY . .

# Build da aplicação TypeScript
RUN npm run build

# Remover devDependencies após o build (otimização)
RUN npm prune --production

# Expor porta (DVinte usa porta 9600)
EXPOSE 9600

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Comando para iniciar a aplicação (otimizado para produção)
CMD ["node", "dist/server.js"] 