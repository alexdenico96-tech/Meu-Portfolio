# Backend do Portfólio

Servidor pequeno em Node.js + Express responsável por receber os dados do
formulário de contato e enviar um email real usando a API do **Resend**.

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

3. Crie uma conta gratuita em [resend.com](https://resend.com) (dá pra entrar
   direto com o Google) e gere uma chave de API em "API Keys" → "Create API Key".
   Copie a chave (ela só aparece uma vez) e cole no `.env`, no campo `RESEND_API_KEY`.

4. Preencha o `.env`:
   ```
   EMAIL_USER=seu-email-real@gmail.com
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   PORT=3000
   ```

5. Rode o servidor:
   ```bash
   npm start
   ```
   Acesse `http://localhost:3000` — deve aparecer "Backend do portfólio está rodando."

> Não precisa verificar domínio próprio no Resend: como o email é sempre
> enviado **para a sua própria caixa** (`EMAIL_USER`), o remetente de teste
> padrão do Resend (`onboarding@resend.dev`) já funciona sem configuração extra.

## Como publicar (deploy)

O GitHub Pages não roda back-end, então esse servidor precisa ser hospedado
separadamente. Usamos o **Render** (render.com), plano free.

Passos gerais:
1. No Render, "New +" → "Web Service", conecte o repositório do portfólio
2. **Root Directory:** `backend` (assim o Render roda só essa subpasta)
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Em "Environment Variables", adicione `EMAIL_USER` e `RESEND_API_KEY`
6. Depois do deploy, copie a URL pública e atualize a constante `URL_BACKEND`
   no `js/script.js` do portfólio (incluindo o caminho `/api/contato` no final)

## ⚠️ Solução de problemas

### "Missing credentials for PLAIN" (histórico, já resolvido)
Acontecia quando o `dotenv` não encontrava o `.env`. Confirme que o arquivo
se chama exatamente `.env` (não `.env.txt`) e está dentro de `backend/`.

### "Connection timeout" / "ETIMEDOUT" ao enviar email (histórico, já resolvido)
**Causa raiz encontrada:** o Render, no plano gratuito, bloqueia conexões
SMTP de saída — por isso o Nodemailer (conectando direto no `smtp.gmail.com`,
tanto na porta 465 quanto na 587) sempre dava timeout, mesmo com credenciais
corretas.

**Solução:** trocamos o envio por SMTP direto pela **API do Resend**, que
funciona por uma chamada HTTPS comum (nunca bloqueada), em vez de abrir uma
conexão de rede na porta de email.

### Push feito mas o Render continua rodando código antigo
Às vezes o Auto-Deploy do Render não dispara sozinho depois de um push.
Solução: no painel do serviço, "Manual Deploy" → "Deploy latest commit"
para forçar a atualização.

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