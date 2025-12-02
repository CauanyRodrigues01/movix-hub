import type { BaseEntity } from "./base.types";

// Interface BASE para todas as PESSOAS
export interface BasePerson extends BaseEntity {
    // Dados pessoais obrigatórios
    fullName: string;
    cpfCnpj: string;
    phone: string;
    email: string;

    // Endereço básico
    fullAddress: string;
    zipCode: string;
    city: string;
    state: string;

    lastAccess: string; 
    loginAttempts: number;
    passwordHash: string;
    profilePhoto?: string;
    userName: string;

    // Notas internas
    internalNotes?: string;
}