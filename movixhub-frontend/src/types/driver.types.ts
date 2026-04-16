import type { BaseEntity } from "./base.types";

export type DriverStatus = 'Ativo' | 'Inativo' | 'Suspenso' | 'Férias';

export interface DriverService extends BaseEntity {
    _id?: string; 
    id?: string;  
    fullName: string;
    cnh: string; 
    employment_relationship: string; 
    total_deliveries: number;
    rating: number;
    status: 'Active' | 'Inactive' | 'Blocked' | 'Suspended';
    createdAt?: string;
    updatedAt?: string;
}