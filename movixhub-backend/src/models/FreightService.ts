import mongoose, { Schema, Document } from 'mongoose';

export type ServiceInternalStatus = 'Ativo' | 'Inativo' | 'Manutencao' | 'Indisponível';
export type CoverageArea = 'Municipal' | 'Intermunicipal' | 'Interestadual' | 'Internacional';
export type AllowedVehicle = 'Motocicleta' | 'Carro' | 'Van' | 'Caminhão 3/4' | 'Caminhão Toco' | 'Carreta';

export interface IFreightService extends Document {
    name: string;
    internalCode: string;
    description: string;
    averagePrice: number;
    status: ServiceInternalStatus;
    coverage: CoverageArea[];
    allowedVehicles: AllowedVehicle[];
    averageTime: string;
    detailedCoverageArea: string;
    activePromotions: string[];
    createdBy: string;

    // Metadata (BaseEntity)
    createdAt: Date;
    updatedAt: Date;
}

const FreightServiceSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },

        internalCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
            maxlength: 10,
        },

        description: { type: String, required: true },

        averagePrice: {
            type: Number,
            required: true,
            min: [0, 'O preço médio não pode ser negativo.'],
        },

        status: {
            type: String,
            required: true,
            default: 'Ativo',
            enum: ['Ativo', 'Inativo', 'Manutencao', 'Indisponível'],
        },

        coverage: {
            type: [String],
            required: true,
            enum: ['Municipal', 'Intermunicipal', 'Interestadual', 'Internacional'],
        },

        allowedVehicles: {
            type: [String],
            required: true,
            enum: ['Motocicleta', 'Carro', 'Van', 'Caminhão 3/4', 'Caminhão Toco', 'Carreta'],
        },

        averageTime: { type: String, required: true },

        detailedCoverageArea: { type: String, default: '' },

        // Array de IDs/códigos de promoções ativas vinculadas a este serviço
        activePromotions: { type: [String], default: [] },

        createdBy: { type: String, required: true },
    },
    {
        // Mongoose gerencia createdAt e updatedAt automaticamente
        timestamps: true,
    }
);

const FreightService = mongoose.model<IFreightService>('FreightService', FreightServiceSchema);

export default FreightService;
