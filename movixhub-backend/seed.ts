import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User';
import connectDB from './src/config/db';

// Carrega variáveis de ambiente
dotenv.config();

const adminUser = {
    fullName: "Admin Master",
    corporateEmail: "admin@movixhub.com",
    // Esta será hashada automaticamente pelo middleware 'pre-save' do Mongoose
    passwordHash: "12345678", 
    department: "Diretoria",
    position: "CEO",
    accessProfile: "Administrador",
    status: "Ativo",
    createdBy: "SYSTEM_SEEDER"
};

const importData = async () => {
    try {
        await connectDB();
        
        // 1. Limpa a coleção de usuários (opcional, mas bom para testes)
        await User.deleteMany();
        console.log('Dados de usuários existentes removidos.');

        // 2. Insere o usuário Admin
        const createdUsers = await User.create([adminUser]);
        
        console.log('Usuário Admin Master criado com sucesso!');
        console.log(`ID: ${createdUsers[0]._id}`);

        // 3. Encerra a conexão
        mongoose.connection.close();
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no seed';
        console.error(`Erro ao importar dados: ${errorMessage}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await User.deleteMany();
        console.log('Todos os dados de usuários destruídos.');
        mongoose.connection.close();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no destroy';
        console.error(`Erro ao destruir dados: ${errorMessage}`);
        process.exit(1);
    }
};


if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}