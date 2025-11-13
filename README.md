# 🚚 MovixHub

O **MovixHub** é o sistema administrativo da startup **Movix**, criado para gerenciar de forma centralizada os **serviços de frete**, **promoções** e **usuários internos**.  
Desenvolvido com **ReactJS** no frontend e **Node.js + Express** no backend.

---

## 🌐 Visão Geral

O projeto tem como objetivo otimizar a gestão de fretes e operações internas da Movix, oferecendo uma interface moderna, responsiva e integrada a uma API REST.

### ✳️ Principais Funcionalidades
- Login e autenticação JWT  
- CRUD de serviços de frete  
- Cadastro e gerenciamento de usuários internos  
- Aplicação e remoção de promoções  
- Dashboard com dados administrativos

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- ReactJS  
- Vite
- Axios  
- React Router DOM  
- Styled Components

### Backend
- Node.js  
- Express  
- JWT para autenticação  
- MongoDB  
- Sequelize ORM  

---

## 🚀 Como Rodar o Projeto

### 🔹 Clonar o repositório
```bash
git clone [https://github.com/CauanyRodrigues01/movix-hub.git](https://github.com/CauanyRodrigues01/movix-hub.git)
cd movixhub
````

### 🔹 Instalar dependências do frontend e backend

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 🔹 Rodar o backend

```bash
cd backend
npm run dev
```

### 🔹 Rodar o frontend

```bash
cd frontend
npm start
```

O projeto estará disponível em:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧠 Estrutura do Projeto

```
movixhub/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

## 📄 Licença

Este projeto é de uso educacional e profissional interno da Movix.

---

Feito com 💛 por [Cauany Rodrigues](https://www.linkedin.com/in/cauany-rodrigues-78700b193/)