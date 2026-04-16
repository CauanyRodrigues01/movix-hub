import type { Driver} from "../../../types/driver.types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export const driverSchema: EntitySchema<Driver> = {
    entityName: 'Motorista',
    entityNamePlural: 'Motoristas',
    fields: [
        { name: 'fullName', label: 'Nome Completo', type: FieldType.Text, required: true, section: 'Dados Pessoais' },
        { name: 'cnh', label: 'Número da CNH', type: FieldType.Text, required: true, section: 'Habilitação' },
        { 
            name: 'employment_relationship', 
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
            name: 'status', 
            label: 'Status', 
            type: FieldType.Select, 
            required: true, 
            section: 'Vínculo Profissional',
            defaultValue: 'Active',
            options: [
                { value: 'Active', label: 'Ativo' },
                { value: 'Inactive', label: 'Inativo' },
                { value: 'Blocked', label: 'Bloqueado' },
                { value: 'Suspended', label: 'Suspenso' }
            ]
        }
    ],

    tableColumns: [
        { key: 'fullName', header: 'MOTORISTA', type: 'large-text' },
        { key: 'cnh', header: 'CNH', type: 'fixed-short' },
        { key: 'employment_relationship', header: 'VÍNCULO', type: 'fixed-short' },
        { key: 'total_deliveries', header: 'TOTAL ENTREGAS', type: 'fixed-short' }
    ] as ColumnDefinition<Driver>[],

    badgeVariants: {
        'Active': 'success',
        'Inactive': 'info',
        'Suspended': 'warning',
        'Blocked': 'error'
    }
};