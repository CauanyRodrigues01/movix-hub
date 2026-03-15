import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';


// Alinhando campos com o frontend
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
    specificPermissions: string[]; 
    
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
    status: { 
        type: String, 
        required: true, 
        default: 'Ativo',
        enum: ['Ativo', 'Inativo', 'Bloqueado', 'Suspenso']
    },
    cpfCnpj: { type: String, required: true },
    phone: { type: String, required: true },
    personalEmail: { type: String, required: true },
    zipCode: { type: String, required: true },
    fullAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    admissionDate: { type: Date, required: true },
    specificPermissions: { type: [String], default: [] },
    internalNotes: { type: String },
}, {
    timestamps: true,
});

UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

UserSchema.pre<IUser>('save', async function () { 
    if (!this.isModified('passwordHash')) return; 
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;