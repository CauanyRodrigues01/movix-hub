import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import freightServiceRoutes from './src/routes/freightServiceRoutes';
import driverRoutes from './src/routes/driverRoutes';
import promotionRoutes from './src/routes/promotionRoutes';
import clientRoutes from './src/routes/clientRoutes';
import notificationRoutes from './src/routes/notificationRoutes';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();

// CORS - permite requisições do frontend
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const frontendUrlsEnv = process.env.FRONTEND_URLS || '';
const allowedOrigins = Array.from(new Set([
    frontendUrl,
    ...frontendUrlsEnv.split(',').map(s => s.trim()).filter(Boolean),
]));

app.use(cors({
    origin: (origin, callback) => {
        // permitir requests sem origin (ex.: Postman, server-to-server)
        if (!origin) return callback(null, true);

        // aceitar origins explicitamente listadas
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        // permitir domínios Vercel (preview/prod) que terminem com .vercel.app
        try {
            if (/\.vercel\.app$/.test(origin)) return callback(null, true);
        } catch (e) {
            // continue para rejeitar abaixo
        }

        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
}));

// Middleware para processar JSON (body-parser)
app.use(express.json());

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/freight-services', freightServiceRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/notifications', notificationRoutes);


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
