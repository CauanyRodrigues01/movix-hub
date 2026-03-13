// server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

// CORS - Permite requisições do frontend
app.use(cors({
    origin: 'http://localhost:5173', // ou a porta do frontend
    credentials: true,
}));

// Middleware para processar JSON (body-parser)
app.use(express.json());

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API MovixHub Rodando...');
});

const PORT = process.env.PORT || 5000;

// Função assíncrona para iniciar o servidor
const startServer = async () => {
    try {
        // Conecta ao Banco de Dados primeiro
        await connectDB();
        
        // Só inicia o servidor após conexão bem-sucedida
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
};

startServer();