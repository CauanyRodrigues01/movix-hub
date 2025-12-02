import { FieldType, type BaseEntity, type EntitySchema } from "../../common/EntityCRUD/types";
import type { ColumnDefinition } from "../../common/Table";

export type CnhCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'AD' | 'AE';
export type DriverLinkType = 'CLT' | 'PJ' | 'Terceirizado' | 'Parceiro';
export type DriverStatus = 'Ativo' | 'Inativo' | 'Suspenso' | 'Férias';

export interface Driver extends BaseEntity {
    fullName: string;
    cpf: string;
    cnhNumber: string;
    cnhCategory: CnhCategory;
    cnhValidity: string;
    phone: string;
    email: string;
    driverLinkType: DriverLinkType;
    status: DriverStatus;
    linkedVehicleId?: string;
    averageRating: number;
    totalDeliveries: number;
    baseCity: string;
    admissionDate: string;
    internalScore: number;
    observations?: string;
    changeHistory?: Array<{
        date: string;
        changedBy: string;
        field: string;
        oldValue: string;
        newValue: string;
    }>;
}

export const driverSchema: EntitySchema<Driver> = {
    entityName: 'Motorista',
    entityNamePlural: 'Motoristas',
    fields: [
        {
            name: 'fullName',
            label: 'Nome Completo',
            type: FieldType.Text,
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
            name: 'email',
            label: 'E-mail',
            type: FieldType.Email,
            required: true,
            section: 'Dados Pessoais'
        },
        {
            name: 'cnhNumber',
            label: 'Número da CNH',
            type: FieldType.Text,
            required: true,
            section: 'Habilitação'
        },
        {
            name: 'cnhCategory',
            label: 'Categoria da CNH',
            type: FieldType.Select,
            required: true,
            section: 'Habilitação',
            options: [
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
                { value: 'E', label: 'E' }
            ]
        },
        {
            name: 'cnhValidity',
            label: 'Validade da CNH',
            type: FieldType.Date,
            required: true,
            section: 'Habilitação'
        },
        {
            name: 'driverLinkType',
            label: 'Tipo de Vínculo',
            type: FieldType.Select,
            required: true,
            section: 'Vínculo Profissional',
            options: [
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' },
                { value: 'Terceirizado', label: 'Terceirizado' },
                { value: 'Parceiro', label: 'Parceiro' }
            ]
        },
        {
            name: 'baseCity',
            label: 'Cidade Base',
            type: FieldType.Text,
            required: true,
            section: 'Vínculo Profissional'
        },
        {
            name: 'admissionDate',
            label: 'Data de Admissão',
            type: FieldType.Date,
            required: true,
            section: 'Vínculo Profissional'
        },
        {
            name: 'status',
            label: 'Status',
            type: FieldType.Select,
            required: true,
            section: 'Vínculo Profissional',
            defaultValue: 'Ativo',
            options: [
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Suspenso', label: 'Suspenso' },
                { value: 'Férias', label: 'Férias' }
            ]
        },
        {
            name: 'observations',
            label: 'Observações',
            type: FieldType.Textarea,
            section: 'Informações Adicionais',
            rows: 4,
            maxLength: 500
        }
    ],

    tableColumns: [
        {
            key: 'fullName',
            header: 'MOTORISTA',
            type: 'large-text',
            secondaryKey: 'phone'
        },
        {
            key: 'cnhCategory',
            header: 'CNH',
            type: 'fixed-short'
        },
        {
            key: 'driverLinkType',
            header: 'VÍNCULO',
            type: 'fixed-short'
        },
        {
            key: 'totalDeliveries',
            header: 'TOTAL ENTREGAS',
            type: 'fixed-short'
        }
    ] as ColumnDefinition<Driver>[],

    badgeVariants: {
        'Ativo': 'success',
        'Inativo': 'error',
        'Suspenso': 'warning',
        'Férias': 'info'
    }
};