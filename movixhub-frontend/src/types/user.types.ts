import type { BasePerson } from "./person.types";

export type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
export type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

export interface User extends BasePerson {
    // Override de tipos
    status: UserStatus;
    
    corporateEmail: string;
    position: string;
    department: string;
    accessProfile: AccessProfile;
    specificPermissions: string[];
    lastAccess: string; 
    loginAttempts: number;
    passwordHash: string;
    profilePhoto?: string;
    createdBy: string;
}
