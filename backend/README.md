# Backend do Portfólio

Servidor pequeno em Node.js + Express responsável por receber os dados do
formulário de contato e enviar um email real usando Nodemailer.

🔗 **Publicado em:** https://meu-portfolio-6dcj.onrender.com

## Como rodar localmente

1. Entre na pasta e instale as dependências:
   ```bash
   cd backend
   npm install
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. Gere uma **senha de app** do Gmail (não é sua senha normal):
   - Acesse https://myaccount.google.com/security
   - Ative a "Verificação em duas etapas" (obrigatório para gerar senha de app)
   - Vá em "Senhas de app", crie uma nova para "Email"
   - Copie a senha gerada (16 caracteres) e cole no `.env`, no campo `EMAIL_PASS`

4. Preencha o `.env` com os dados **da conta correta**:
   ```
   EMAIL_USER=seu-email-real@gmail.com
   EMAIL_PASS=xxxxxxxxxxxxxxxx
   PORT=3000
   ```

5. Rode o servidor:
   ```bash
   npm start
   ```
   Acesse `http://localhost:3000` — deve aparecer "Backend do portfólio está rodando."

## Como publicar (deploy)

O GitHub Pages não roda back-end, então esse servidor precisa ser hospedado
separadamente. Usamos o **Render** (render.com), plano free.

Passos gerais:
1. No Render, "New +" → "Web Service", conecte o repositório do portfólio
2. **Root Directory:** `backend` (assim o Render roda só essa subpasta)
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Em "Environment Variables", adicione `EMAIL_USER` e `EMAIL_PASS`
6. Depois do deploy, copie a URL pública e atualize a constante `URL_BACKEND`
   no `js/script.js` do portfólio (incluindo o caminho `/api/contato` no final)

## ⚠️ Solução de problemas

### "Missing credentials for PLAIN"
O `dotenv` não encontrou o arquivo `.env`. Confirme que:
- O arquivo se chama exatamente `.env` (não `.env.txt` — ative "Extensões de
  nome de arquivo" no Explorer do Windows para verificar)
- Ele está dentro da pasta `backend/`, não na raiz do projeto
- Você rodou `npm start` de dentro da pasta `backend/`

### "Connection timeout" / "ETIMEDOUT" ao enviar email
Aconteceu no deploy do Render: a configuração padrão do Nodemailer
(`service: 'gmail'`, que usa a porta 465) deu timeout tentando conectar no
Gmail a partir do servidor do Render. A correção foi configurar a conexão
explicitamente pela **porta 587** (STARTTLS) em vez da 465:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  connectionTimeout: 15000,
});
```

Se o timeout persistir mesmo na porta 587, o próximo passo seria trocar o
envio direto por SMTP por um serviço de email transacional (Resend, Brevo,
etc.), que costuma ser mais confiável em hospedagens gratuitas.

### Formulário publicado ainda aponta para "localhost"
Sinal de que o `js/script.js` publicado no GitHub Pages está desatualizado.
Confirme, na raiz do projeto:
```bash
git show HEAD:js/script.js | grep URL_BACKEND
```
Se mostrar a URL antiga, o arquivo editado não foi commitado de fato — rode
`git add js/script.js`, `git commit` e `git push` de novo, de dentro da pasta
**raiz** do projeto (não de dentro de `backend/`).

### Primeira requisição demora ~50 segundos
Normal no plano gratuito do Render: o servidor "dorme" após ~15 minutos sem
uso e demora para "acordar" na primeira chamada. As requisições seguintes
ficam rápidas.