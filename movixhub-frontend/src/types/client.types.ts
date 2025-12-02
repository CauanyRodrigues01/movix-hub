import type { BasePerson } from "./person.types";

export type ClientType = 'Pessoa Física' | 'Pessoa Jurídica';
export type ClientClassification = 'Novo Cliente' | 'Regular' | 'Bronze' | 'Prata' | 'Ouro';
export type ClientStatus = 'Ativo' | 'Inativo' | 'Bloqueado';

export interface Client extends BasePerson {
    // Override de tipos
    status: ClientStatus;
    
    // Dados de identificação
    clientType: ClientType;
    
    // Informações comerciais
    classification: ClientClassification;
    lastServiceDate?: string | null; // última vez que usou serviço
    totalServices: number;
}