import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Baseado na sua interface User do frontend (simplificado para o backend)
export interface IUser extends Document {
    // Campos necessários para o login e gerenciamento de acesso
    fullName: string;
    corporateEmail: string;
    passwordHash: string;
    department: string;
    position: string;
    accessProfile: string;
    status: 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
    internalNotes?: string;
    
    // Metadados (BaseEntity)
    createdAt: Date;
    updatedAt: Date;
    
    // Métodos para o Model
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// 1. Definição do Schema
const UserSchema: Schema = new Schema({
    // --- Campos de Identificação e Organização ---
    fullName: { type: String, required: true },
    corporateEmail: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    accessProfile: { type: String, required: true },

    // --- Campo de Segurança ---
    passwordHash: { type: String, required: true },
    
    // --- Metadados e Status ---
    status: { 
        type: String, 
        required: true, 
        default: 'Ativo',
        enum: ['Ativo', 'Inativo', 'Bloqueado', 'Suspenso']
    },
    internalNotes: { type: String },

}, {
    // Mongoose gerencia createdAt e updatedAt automaticamente
    timestamps: true,
});


// 2. Método: Comparar Senha (Deve vir ANTES do Middleware)
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    // Compara a senha informada com o hash salvo (this.passwordHash)
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};


// 3. Middleware: Hash da Senha antes de salvar (Executa ANTES de persistir no DB)
UserSchema.pre<IUser>('save', async function () { 
    
    // 1. Se o campo passwordHash não foi modificado, não fazemos nada.
    if (!this.isModified('passwordHash')) {
        // Quando a função retorna, o Mongoose prossegue com o salvamento
        return; 
    }

    // 2. Geração e atribuição do Hash
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    
    // A Promessa é resolvida e o Mongoose salva o documento.
});


// 4. Criação e Exportação do Modelo
const User = mongoose.model<IUser>('User', UserSchema);

export default User;