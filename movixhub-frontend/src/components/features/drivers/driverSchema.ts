
import type { Driver } from "../../../types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

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
            name: 'zipCode',
            label: 'CEP',
            type: FieldType.Text,
            required: true,
            section: 'Endereço',
            placeholder: '00000-000',
            mask: '00000-000'
        },
        {
            name: 'fullAddress',
            label: 'Endereço Completo',
            type: FieldType.Text,
            required: true,
            section: 'Endereço',
            placeholder: 'Rua, número, complemento'
        },
        {
            name: 'city',
            label: 'Cidade',
            type: FieldType.Text,
            required: true,
            section: 'Endereço'
        },
        {
            name: 'state',
            label: 'Estado',
            type: FieldType.Select,
            required: true,
            section: 'Endereço',
            options: [
                { value: 'AC', label: 'Acre' },
                { value: 'AL', label: 'Alagoas' },
                { value: 'AP', label: 'Amapá' },
                { value: 'AM', label: 'Amazonas' },
                { value: 'BA', label: 'Bahia' },
                { value: 'CE', label: 'Ceará' },
                { value: 'DF', label: 'Distrito Federal' },
                { value: 'ES', label: 'Espírito Santo' },
                { value: 'GO', label: 'Goiás' },
                { value: 'MA', label: 'Maranhão' },
                { value: 'MT', label: 'Mato Grosso' },
                { value: 'MS', label: 'Mato Grosso do Sul' },
                { value: 'MG', label: 'Minas Gerais' },
                { value: 'PA', label: 'Pará' },
                { value: 'PB', label: 'Paraíba' },
                { value: 'PR', label: 'Paraná' },
                { value: 'PE', label: 'Pernambuco' },
                { value: 'PI', label: 'Piauí' },
                { value: 'RJ', label: 'Rio de Janeiro' },
                { value: 'RN', label: 'Rio Grande do Norte' },
                { value: 'RS', label: 'Rio Grande do Sul' },
                { value: 'RO', label: 'Rondônia' },
                { value: 'RR', label: 'Roraima' },
                { value: 'SC', label: 'Santa Catarina' },
                { value: 'SP', label: 'São Paulo' },
                { value: 'SE', label: 'Sergipe' },
                { value: 'TO', label: 'Tocantins' }
            ]
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
                { value: 'A', label: 'A - Motocicletas' },
                { value: 'B', label: 'B - Automóveis' },
                { value: 'C', label: 'C - Caminhões pequenos' },
                { value: 'D', label: 'D - Ônibus e vans' },
                { value: 'E', label: 'E - Carretas e caminhões pesados' },
                { value: 'AB', label: 'AB - A + B' },
                { value: 'AC', label: 'AC - A + C' },
                { value: 'AD', label: 'AD - A + D' },
                { value: 'AE', label: 'AE - A + E' }
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
            name: 'registrationDate',
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
            name: 'linkedVehicleId',
            label: 'Veículo Vinculado',
            type: FieldType.Text,
            section: 'Vínculo Profissional',
            placeholder: 'ID do veículo (opcional)'
        },
        {
            name: 'internalNotes',
            label: 'Notas Internas',
            type: FieldType.Textarea,
            section: 'Observações',
            rows: 3,
            maxLength: 500,
            placeholder: 'Notas internas (não visíveis para o motorista)'
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