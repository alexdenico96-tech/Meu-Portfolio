# Backend do Portfólio

Servidor pequeno em Node.js + Express responsável por receber os dados do
formulário de contato e enviar um email real usando Nodemailer.

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

4. Preencha o `.env`:
   ```
   EMAIL_USER=alexdenico@gmail.com
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
separadamente. Opções gratuitas recomendadas:

- **Render** (render.com) — mais simples para iniciantes, plano free disponível
- **Railway** (railway.app)

Passos gerais (Render como exemplo):
1. Suba a pasta `backend/` para um repositório no GitHub (pode ser um repositório separado do portfólio)
2. Crie uma conta no Render e clique em "New Web Service"
3. Conecte o repositório
4. Configure o comando de start: `npm start`
5. Em "Environment Variables", adicione `EMAIL_USER` e `EMAIL_PASS` (os mesmos valores do seu `.env`)
6. Depois do deploy, copie a URL pública (algo como `https://seu-backend.onrender.com`)
7. No `js/script.js` do portfólio, troque a constante `URL_BACKEND` de `http://localhost:3000/api/contato` para `https://seu-backend.onrender.com/api/contato`