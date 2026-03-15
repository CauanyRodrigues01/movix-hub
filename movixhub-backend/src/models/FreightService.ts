import mongoose, { Schema, Document } from 'mongoose';

// FreightService define o catálogo de serviços de frete da plataforma.
// Não possui FKs diretas: a ligação com Driver é feita via `allowedVehicles`
// na camada de negócio, e com User apenas pelo nome em `createdBy` (auditoria).

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
    activePromotions: string[]; // IDs/códigos do módulo de promoções (ref. fraca, sem FK)
    createdBy: string;          // Nome do usuário — auditoria apenas, não é FK
    createdAt: Date;
    updatedAt: Date;
}

const FreightServiceSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },

        // Código único de identificação interna (ex.: "ENT-EXP-01"), máx. 10 chars
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

        // Ciclo de vida: 'Ativo' | 'Inativo' | 'Manutencao' | 'Indisponível'
        status: {
            type: String,
            required: true,
            default: 'Ativo',
            enum: ['Ativo', 'Inativo', 'Manutencao', 'Indisponível'],
        },

        // Um serviço pode cobrir múltiplos níveis geográficos
        coverage: {
            type: [String],
            required: true,
            enum: ['Municipal', 'Intermunicipal', 'Interestadual', 'Internacional'],
        },

        // Veículos aptos a operar este serviço.
        // Relacionamento indireto com Driver: compatibilidade verificada na lógica de negócio.
        allowedVehicles: {
            type: [String],
            required: true,
            enum: ['Motocicleta', 'Carro', 'Van', 'Caminhão 3/4', 'Caminhão Toco', 'Carreta'],
        },

        averageTime: { type: String, required: true },

        detailedCoverageArea: { type: String, default: '' },

        // Referência fraca ao módulo de promoções — sem ObjectId ref para evitar acoplamento
        activePromotions: { type: [String], default: [] },

        // Nome do criador para rastreabilidade — string pura, sem populate necessário
        createdBy: { type: String, required: true },
    },
    {
        timestamps: true, // injeta createdAt e updatedAt automaticamente
    }
);

const FreightService = mongoose.model<IFreightService>('FreightService', FreightServiceSchema);

export default FreightService;

