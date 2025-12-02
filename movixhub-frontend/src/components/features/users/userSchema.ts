import { FieldType, type BaseEntity, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
export type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

export interface User extends BaseEntity {
    fullName: string;
    corporateEmail: string;
    cpf: string;
    phone?: string;
    position: string;
    department: string;
    accessProfile: AccessProfile;
    specificPermissions: string[];
    status: UserStatus;
    admissionDate: string;
    lastAccess: string;
    loginAttempts: number;
    passwordHash: string;
    profilePhoto?: string;
    createdBy: string;
    changeHistory?: Array<{
        date: string;
        changedBy: string;
        field: string;
        oldValue: string;
        newValue: string;
    }>;
}

export const userSchema: EntitySchema<User> = {
    entityName: 'Usuário',
    entityNamePlural: 'Usuários',
    fields: [
        {
            name: 'fullName',
            label: 'Nome Completo',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais'
        },
        {
            name: 'corporateEmail',
            label: 'E-mail Corporativo',
            type: FieldType.Email,
            required: true,
            section: 'Dados Pessoais'
        },
        {
            name: 'cpf',
            label: 'CPF',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '000.000.000-00',
            mask: '000.000.000-00'
        },
        {
            name: 'phone',
            label: 'Telefone',
            type: FieldType.Tel,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '(00) 00000-0000',
            mask: '(00) 00000-0000'
        },
        {
            name: 'department',
            label: 'Departamento',
            type: FieldType.Text,
            required: true,
            section: 'Dados Organizacionais'
        },
        {
            name: 'position',
            label: 'Cargo',
            type: FieldType.Text,
            required: true,
            section: 'Dados Organizacionais'
        },
        {
            name: 'admissionDate',
            label: 'Data de Admissão',
            type: FieldType.Date,
            required: true,
            section: 'Dados Organizacionais'
        },
        {
            name: 'status',
            label: 'Status',
            type: FieldType.Select,
            required: true,
            section: 'Dados Organizacionais',
            options: [
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Bloqueado', label: 'Bloqueado' },
                { value: 'Suspenso', label: 'Suspenso' }
            ]
        },
        {
            name: 'accessProfile',
            label: 'Perfil de Acesso',
            type: FieldType.Select,
            required: true,
            section: 'Dados Organizacionais',
            options: [
                { value: 'Administrador', label: 'Administrador' },
                { value: 'Operador', label: 'Operador' },
                { value: 'Supervisor', label: 'Supervisor' },
                { value: 'Finanças', label: 'Finanças' },
                { value: 'Visualizador', label: 'Visualizador' }
            ]
        },
        {
            name: 'passwordHash',
            label: 'Senha',
            type: FieldType.Password,
            required: true,
            section: 'Dados Organizacionais',
            showOnlyOnCreate: true
        }
    ],

    tableColumns: [
        {
            key: 'fullName',
            header: 'NOME',
            type: 'large-text',
            secondaryKey: 'corporateEmail'
        },
        {
            key: 'position',
            header: 'CARGO',
            type: 'large-text',
            secondaryKey: 'department'
        },
        {
            key: 'accessProfile',
            header: 'PERFIL DE ACESSO',
            type: 'fixed-short'
        },
    ] as ColumnDefinition<User>[],

    badgeVariants: {
        'Ativo': 'success',
        'Inativo': 'info',
        'Bloqueado': 'error',
        'Suspenso': 'warning'
    }

}