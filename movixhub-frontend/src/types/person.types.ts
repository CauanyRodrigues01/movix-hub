import type { BaseEntity, ChangeHistoryEntry } from "./base.types";

// Interface BASE para todas as PESSOAS
export interface BasePerson extends BaseEntity {
    // Dados pessoais obrigatórios
    fullName: string;
    cpf: string;
    phone: string;
    email: string;

    // Endereço básico
    fullAddress: string;
    zipCode: string;
    city: string;
    state: string;
    
    // Status (cada entidade terá seu próprio tipo)
    status: string; // UserStatus | DriverStatus | ClientStatus
    
    // Data de registro (cliente) / admissão (usuário e motorista)
    registrationDate: string;

    // Notas internas
    internalNotes?: string;
    
    // Metadados
    changeHistory?: ChangeHistoryEntry[];
}