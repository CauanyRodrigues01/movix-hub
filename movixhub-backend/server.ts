// server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

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
        });
    } catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
};

startServer();