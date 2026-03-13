import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Adiciona opções de conexão para evitar warnings
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movixhubdb');
        
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
        
        // Event listeners para monitorar a conexão
        mongoose.connection.on('error', (err) => {
            console.error('Erro de conexão com MongoDB:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB desconectado');
        });
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro de conexão desconhecido';
        console.error(`Erro ao conectar ao MongoDB: ${errorMessage}`);
        
        // Lança o erro para ser capturado no server.ts
        throw new Error(`Conexão com DB falhou: ${errorMessage}`);
    }
};

export default connectDB;