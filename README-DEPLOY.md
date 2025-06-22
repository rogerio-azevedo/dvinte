# 🚀 Guia de Deploy - Sistema DVinte

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Render (gratuita) ou Railway ($5/mês)
- Conta no Vercel/Netlify (gratuita)

## 🔧 1. Deploy do Backend

### 🆓 Opção A: Render (100% Gratuito)

#### Passo 1: Render Setup

1. Acesse [render.com](https://render.com)
2. Conecte com GitHub
3. Clique "New" → "Web Service"
4. Selecione seu repositório `dvinte`
5. Configure:
   - **Name**: dvinte-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Passo 2: Variáveis de Ambiente (Render)

No Dashboard → Environment:

```
NODE_ENV=production
DB_HOST=aws-0-us-east-1.pooler.supabase.com
DB_USER=postgres.uiwxpafcmhtzrzdessod
DB_PASS=DV1NT3!
DB_NAME=postgres
APP_SECRET=seu-jwt-secret-aqui
APP_URL=https://dvinte-backend.onrender.com
FRONTEND_URL=https://dvinte.vercel.app
```

#### Passo 3: PostgreSQL Gratuito (Render)

1. No Render: New → PostgreSQL
2. **Plan**: Free
3. Copiar credenciais para variáveis de ambiente

### 💰 Opção B: Railway ($5/mês)

#### Railway Setup

1. Acesse [railway.app](https://railway.app)
2. Conecte com GitHub
3. **Free Trial**: $5 em créditos para testar
4. **Hobby Plan**: $5/mês (inclui $5 de uso)

#### Configuração Railway

```
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

## 🌐 2. Deploy do Frontend (Vercel - Gratuito)

### Passo 1: Vercel Setup

1. Acesse [vercel.com](https://vercel.com)
2. Import Git Repository
3. Selecione seu repositório `dvinte`
4. Configure:
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Passo 2: Variáveis de Ambiente

```
# Para Render:
REACT_APP_API_URL=https://dvinte-backend.onrender.com

# Para Railway:
REACT_APP_API_URL=https://seu-app.railway.app
```

## 💰 3. Comparação de Custos

### 🆓 Stack Totalmente Gratuita:

| Serviço      | Plano      | Limitações                       |
| ------------ | ---------- | -------------------------------- |
| **Render**   | Free       | 750h/mês, sleep após inatividade |
| **Vercel**   | Free       | Sites ilimitados                 |
| **Supabase** | Free       | 500MB storage                    |
| **Total**    | **$0/mês** | ✅ Perfeito para hobby           |

### 💰 Stack Premium (Recomendada para Produção):

| Serviço      | Plano      | Benefícios                |
| ------------ | ---------- | ------------------------- |
| **Railway**  | Hobby $5   | Sem sleep, mais confiável |
| **Vercel**   | Free       | Suficiente                |
| **Supabase** | Free       | Suficiente                |
| **Total**    | **$5/mês** | ✅ Produção pequena       |

## 🚀 4. Recomendação Final

### Para Começar (Gratuito):

```
Frontend: Vercel (Free)
Backend: Render (Free)
Database: Supabase (Free)
Total: $0/mês
```

### Para Produção Séria:

```
Frontend: Vercel (Free)
Backend: Railway (Hobby $5)
Database: Supabase (Free)
Total: $5/mês
```

## ⚠️ 5. Limitações do Plano Gratuito (Render)

- **Sleep**: App "dorme" após 15min de inatividade
- **Cold Start**: Primeira requisição pode demorar ~30s
- **750h/mês**: Suficiente se não for 24/7

## 🔧 6. Próximos Passos

1. **Teste Gratuito**: Comece com Render (Free)
2. **Se Gostar**: Upgrade para Railway ($5/mês)
3. **Produção**: Considere Railway Pro ($20/mês)

---

**💡 Dica**: Comece grátis com Render para testar, depois migre para Railway se precisar de mais performance!

## 🗄️ 7. Banco de Dados

### Opção A: Continuar com Supabase (Recomendado)

- ✅ Já configurado
- ✅ Interface web
- ✅ Backups automáticos

### Opção B: PostgreSQL do Railway

1. No Railway: Add Service → PostgreSQL
2. Copiar credenciais para variáveis de ambiente
3. Executar migrations:

```bash
npx sequelize-cli db:migrate
```

## 🔗 8. URLs Finais

Após o deploy você terá:

- **Frontend**: `https://dvinte.vercel.app`
- **Backend**: `https://dvinte.railway.app`
- **Database**: Supabase ou Railway PostgreSQL

## 🐛 9. Troubleshooting

### CORS Errors

Adicione a URL do frontend nas variáveis:

```
FRONTEND_URL=https://seu-frontend.vercel.app
```

### Build Errors

Verifique se todas as dependências estão no `package.json`:

```bash
npm install
```

### Database Connection

Teste a conexão no Railway Logs:

```bash
railway logs
```

## 💰 10. Custos

### Gratuito Forever:

- **Railway**: 500 horas/mês (suficiente para hobby)
- **Vercel**: Sites ilimitados
- **Supabase**: 500MB storage + 2GB bandwidth

### Upgrade Quando Necessário:

- **Railway Pro**: $5/mês (uso ilimitado)
- **Vercel Pro**: $20/mês (mais recursos)
- **Supabase Pro**: $25/mês (mais storage)

## 🎯 11. Próximos Passos

1. **Custom Domain**: Configurar domínio próprio
2. **SSL**: Automático no Vercel/Railway
3. **Monitoring**: Logs e métricas
4. **Backup**: Configurar backups regulares
5. **CI/CD**: Deploy automático via GitHub

---

**🚀 Seu sistema estará online e acessível para qualquer pessoa na internet!**
