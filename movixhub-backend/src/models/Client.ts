import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    fullName: string;
    corporateEmail: string;
    phone: string;
    cpfCnpj: string;
    address: string;
    status: 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
    internalNotes?: string;
    createdAt: Date;
    updatedAt: Date;

    drivers: [{type: mongoose.Schema.Types.ObjectId, ref: "Driver"}]

}

const ClientSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    corporateEmail: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    cpfCnpj: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: 'Ativo',
        enum: ['Ativo', 'Inativo', 'Bloqueado', 'Suspenso']
    },
    internalNotes: { type: String },

    drivers: [{type: mongoose.Schema.Types.ObjectId, ref: "Driver"}]
}, {
    timestamps: true,
});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;