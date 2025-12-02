import type { BasePerson } from "./person.types";

export type ClientType = 'Pessoa Física' | 'Pessoa Jurídica';
export type ClientClassification = 'Bronze' | 'Prata' | 'Ouro' | 'Platinum';
export type ClientStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';

export interface Client extends BasePerson {
    // Override de tipos
    status: ClientStatus;
    
    // Dados de identificação
    fullNameOrCompany: string; // Nome completo ou razão social (pode ser diferente de fullName)
    clientType: ClientType;
    cpfCnpj: string; // CPF ou CNPJ (complementa o cpf base)
    secondaryPhone?: string;
    
    // Informações comerciais
    classification: ClientClassification;
    lastServiceDate?: string | null; // última vez que usou serviço
    totalServices: number;
}