import type { BasePerson } from "./person.types";

export type CnhCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'AD' | 'AE';
export type DriverLinkType = 'CLT' | 'PJ' | 'Terceirizado' | 'Parceiro';
export type DriverStatus = 'Ativo' | 'Inativo' | 'Suspenso' | 'Férias';

export interface Driver extends BasePerson {
    
    // Override de tipos
    status: DriverStatus;
    
    // Campos específicos de Driver
    cnhNumber: string;
    cnhCategory: CnhCategory;
    cnhValidity: string;
    driverLinkType: DriverLinkType;
    linkedVehicleId?: string;
    averageRating: number;
    totalDeliveries: number;
    baseCity: string;
    internalScore: number;
}