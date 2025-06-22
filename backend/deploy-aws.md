# 🚀 Deploy AWS EC2 - DVinte Backend

## 📋 Pré-requisitos

- Instância EC2 (Ubuntu 20.04+ recomendado)
- Node.js 18+ instalado
- PM2 para gerenciamento de processos
- Nginx como proxy reverso
- PostgreSQL configurado
- MongoDB configurado

## 🔧 1. Preparação do Servidor

### Conectar na instância:

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Instalar dependências:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Instalar Git
sudo apt install -y git
```

## 📂 2. Deploy do Código

### Clonar repositório:

```bash
cd /var/www
sudo git clone https://github.com/seu-usuario/dvinte.git
sudo chown -R ubuntu:ubuntu dvinte
cd dvinte/backend
```

### Instalar dependências:

```bash
npm install
```

### Build do projeto:

```bash
npm run build
```

## 🔐 3. Variáveis de Ambiente

### Criar arquivo .env:

```bash
sudo nano .env
```

### Configurar variáveis:

```env
NODE_ENV=production
PORT=9600

# Database PostgreSQL
DB_HOST=localhost
DB_USER=dvinte_user
DB_PASS=sua_senha_segura
DB_NAME=dvinte_prod

# MongoDB
MONGO_URL=mongodb://localhost:27017/dvinte

# JWT
APP_SECRET=seu_jwt_secret_super_seguro_aqui

# URLs
APP_URL=https://api.seudomain.com
FRONTEND_URL=https://seudomain.com

# Logs
LOG_LEVEL=info
```

## 🗄️ 4. Configuração do Banco

### PostgreSQL:

```bash
# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Criar usuário e banco
sudo -u postgres psql
CREATE USER dvinte_user WITH PASSWORD 'sua_senha_segura';
CREATE DATABASE dvinte_prod OWNER dvinte_user;
GRANT ALL PRIVILEGES ON DATABASE dvinte_prod TO dvinte_user;
\q

# Executar migrations
npm run migrate
```

### MongoDB:

```bash
# Instalar MongoDB
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## 🚀 5. Configurar PM2

### Criar arquivo ecosystem:

```bash
nano ecosystem.config.js
```

### Configuração PM2:

```javascript
module.exports = {
  apps: [
    {
      name: 'dvinte-backend',
      script: 'dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 9600,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
}
```

### Iniciar aplicação:

```bash
# Criar pasta de logs
mkdir logs

# Iniciar com PM2
pm2 start ecosystem.config.js

# Configurar PM2 para iniciar automaticamente
pm2 startup
pm2 save
```

## 🔀 6. Configurar Nginx

### Configurar proxy reverso:

```bash
sudo nano /etc/nginx/sites-available/dvinte
```

### Configuração Nginx:

```nginx
server {
    listen 80;
    server_name api.seudomain.com;

    location / {
        proxy_pass http://localhost:9600;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.IO support
    location /socket.io/ {
        proxy_pass http://localhost:9600;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Ativar configuração:

```bash
sudo ln -s /etc/nginx/sites-available/dvinte /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 7. SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d api.seudomain.com

# Renovação automática
sudo crontab -e
# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 8. Script de Deploy Automático

### Criar script de deploy:

```bash
nano deploy.sh
chmod +x deploy.sh
```

### Conteúdo do script:

```bash
#!/bin/bash

echo "🚀 Iniciando deploy..."

# Pull latest changes
git pull origin main

# Install/update dependencies
npm install

# Build project
npm run build

# Run migrations
npm run migrate

# Restart PM2
pm2 restart dvinte-backend

echo "✅ Deploy concluído!"
```

## 📊 9. Monitoramento

### Verificar status:

```bash
# PM2 status
pm2 status
pm2 logs dvinte-backend

# Nginx status
sudo systemctl status nginx

# Disk space
df -h

# Memory usage
free -h
```

### Monitoramento em tempo real:

```bash
# PM2 monitoring
pm2 monit

# Logs em tempo real
pm2 logs dvinte-backend --lines 50
```

## 🔧 10. Comandos Úteis

```bash
# Restart aplicação
pm2 restart dvinte-backend

# Ver logs
pm2 logs dvinte-backend

# Reload sem downtime
pm2 reload dvinte-backend

# Backup banco
pg_dump -U dvinte_user -h localhost dvinte_prod > backup.sql

# Restaurar banco
psql -U dvinte_user -h localhost dvinte_prod < backup.sql
```

## 🛡️ 11. Segurança

### Firewall (UFW):

```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### Fail2Ban:

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

## 📱 12. Health Check

### Endpoint de saúde:

```bash
curl https://api.seudomain.com/health
```

### Resposta esperada:

```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

---

## 🚨 Troubleshooting

### Se a aplicação não iniciar:

1. Verificar logs: `pm2 logs dvinte-backend`
2. Verificar variáveis de ambiente
3. Verificar conexão com banco
4. Verificar permissões de arquivos

### Se Nginx não funcionar:

1. Verificar configuração: `sudo nginx -t`
2. Verificar logs: `sudo tail -f /var/log/nginx/error.log`
3. Verificar se a porta 9600 está livre: `netstat -tulpn | grep 9600`
