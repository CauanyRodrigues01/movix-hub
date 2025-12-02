import type { FreightService, ServiceInternalStatus } from "../../../types/freight.types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export const freightServiceSchema: EntitySchema<FreightService> = {
    entityName: 'Serviço de Frete',
    entityNamePlural: 'Serviços de Frete',
    fields: [
        {
            name: 'name',
            label: 'Nome do Serviço',
            type: FieldType.Text,
            required: true,
            section: 'Dados Básicos',
            placeholder: 'Ex: SEDEX, Transportadora Express'
        },
        {
            name: 'internalCode',
            label: 'Código Interno',
            type: FieldType.Text,
            required: true,
            section: 'Dados Básicos',
            placeholder: 'Ex: F-SEDEX, TEX-100',
            maxLength: 10
        },
        {
            name: 'averagePrice',
            label: 'Preço Médio Estimado (R$)',
            type: FieldType.Number,
            required: true,
            section: 'Dados Básicos',
            placeholder: 'Ex: 45.90',
            mask: 'R$ #.##0,00',
            step: 0.01,
            min: 0.01
        },
        {
            name: 'averageTime',
            label: 'Tempo Médio de Entrega',
            type: FieldType.Text,
            required: true,
            section: 'Dados Básicos',
            placeholder: 'Ex: 24-48 horas, 3 dias úteis'
        },
        {
            name: 'status',
            label: 'Status Operacional',
            type: FieldType.Select,
            required: true,
            section: 'Dados Operacionais',
            defaultValue: 'Ativo',
            options: [
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Manutencao', label: 'Em Manutenção' },
                { value: 'Indisponível', label: 'Indisponível Temporariamente' }
            ] as { value: ServiceInternalStatus, label: string }[]
        },
        {
            name: 'coverage',
            label: 'Abrangência',
            type: FieldType.MultiSelect,
            required: true,
            section: 'Dados Operacionais',
            options: [
                { value: 'Municipal', label: 'Municipal' },
                { value: 'Intermunicipal', label: 'Intermunicipal' },
                { value: 'Interestadual', label: 'Interestadual' },
                { value: 'Internacional', label: 'Internacional' }
            ]
        },
        {
            name: 'allowedVehicles',
            label: 'Veículos Permitidos',
            type: FieldType.MultiSelect,
            required: true,
            section: 'Dados Operacionais',
            options: [
                { value: 'Motocicleta', label: 'Motocicleta' },
                { value: 'Carro', label: 'Carro' },
                { value: 'Van', label: 'Van' },
                { value: 'Caminhão 3/4', label: 'Caminhão 3/4' },
                { value: 'Caminhão Toco', label: 'Caminhão Toco' },
                { value: 'Carreta', label: 'Carreta' }
            ]
        },
        {
            name: 'detailedCoverageArea',
            label: 'Descrição Detalhada da Área',
            type: FieldType.Text,
            section: 'Dados Operacionais',
            placeholder: 'Ex: Somente Capitais do Sul e Sudeste'
        },
        {
            name: 'description',
            label: 'Descrição do Serviço',
            type: FieldType.Textarea,
            required: true,
            section: 'Detalhes',
            rows: 3,
            maxLength: 500,
            placeholder: 'Descreva os principais benefícios e restrições deste serviço de frete.'
        },
        {
            name: 'activePromotions',
            label: 'Promoções Ativas (IDs)',
            type: FieldType.MultiSelect, // Usando MultiSelect para IDs de promoções
            section: 'Integrações',
            options: [], // Seria preenchido dinamicamente com as promoções disponíveis
            placeholder: 'Selecione as promoções aplicáveis'
        }
    ],

    tableColumns: [
        {
            key: 'name',
            header: 'SERVIÇO',
            type: 'large-text',
            secondaryKey: 'internalCode'
        },
        {
            key: 'internalCode',
            header: 'CÓDIGO',
            type: 'fixed-short',
        },
    ] as ColumnDefinition<FreightService>[],

    badgeVariants: {
        'Ativo': 'success',
        'Inativo': 'info',
        'Manutencao': 'warning',
        'Indisponível': 'error'
    }

}