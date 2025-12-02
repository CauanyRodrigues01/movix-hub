import type { BaseEntity } from "./base.types";

export type ServiceInternalStatus = 'Ativo' | 'Inativo' | 'Manutencao' | 'Indisponível';
export type CoverageArea = 'Municipal' | 'Intermunicipal' | 'Interestadual' | 'Internacional';
export type AllowedVehicle = 'Motocicleta' | 'Carro' | 'Van' | 'Caminhão 3/4' | 'Caminhão Toco' | 'Carreta';

export interface FreightService extends BaseEntity {
    name: string;
    internalCode: string; // Código interno/abreviação
    description: string;
    averagePrice: number; // Preço médio para referência
    status: ServiceInternalStatus; // Extende BaseEntity, mas tipado
    coverage: CoverageArea[]; // Array de áreas de cobertura
    allowedVehicles: AllowedVehicle[]; // Array de veículos permitidos
    averageTime: string; // Tempo médio de entrega (Ex: '24-48h', '4 dias úteis')
    detailedCoverageArea: string; // Detalhes da área (Ex: 'Capitais Nordeste')
    activePromotions: string[]; // Lista de IDs/Nomes de promoções ativas
    createdBy: string; // Adicionado para consistência
}