import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    fullName: string;
    corporateEmail: string;
    passwordHash: string;
    department: string;
    position: string;
    accessProfile: string;
    status: 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
    
    cpfCnpj: string;      
    phone: string;        
    personalEmail: string; 
    zipCode: string;      
    fullAddress: string;  
    city: string;
    state: string;
    admissionDate: Date;  
    internalNotes?: string;
    
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    corporateEmail: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    accessProfile: { type: String, required: true },
    
    
    cpfCnpj: { type: String, required: true },
    phone: { type: String, required: true },
    personalEmail: { type: String, required: true },
    zipCode: { type: String, required: true },
    fullAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    admissionDate: { type: Date, required: true }, 
    
    status: { 
        type: String, 
        required: true, 
        default: 'Ativo',
        enum: ['Ativo', 'Inativo', 'Bloqueado', 'Suspenso']
    },
    internalNotes: { type: String },
}, {
    timestamps: true,
});


// Comparar Senha
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    // Compara a senha informada com o hash salvo (this.passwordHash)
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};


// Middleware: Hash da Senha antes de salvar (Executa ANTES de persistir no DB)
UserSchema.pre<IUser>('save', async function () { 
    
    // Se o campo passwordHash não foi modificado, não fazemos nada.
    if (!this.isModified('passwordHash')) {
        // Quando a função retorna, o Mongoose prossegue com o salvamento
        return; 
    }

    // Geração e atribuição do Hash
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    
    // A Promessa é resolvida e o Mongoose salva o documento.
});


// Criação e Exportação do Modelo
const User = mongoose.model<IUser>('User', UserSchema);

export default User;