import type { Promotion, PromotionStatus, DiscountType, PromotionType, PromotionTarget } from "../../../types/promotion.types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export const promotionSchema: EntitySchema<Promotion> = {
    entityName: 'Promoção',
    entityNamePlural: 'Promoções',
    fields: [
        {
            name: 'name',
            label: 'Nome da Promoção',
            type: FieldType.Text,
            required: true,
            section: 'Identificação',
            placeholder: 'Ex: Desconto de Verão'
        },
        {
            name: 'internalCode', 
            label: 'Código Interno',
            type: FieldType.Text,
            required: false,
            section: 'Identificação',
            placeholder: 'Opcional: ID de rastreio'
        },
        {
            name: 'promotionType',
            label: 'Tipo de Uso',
            type: FieldType.Radio,
            required: true,
            section: 'Identificação',
            defaultValue: 'Cupom',
            options: [
                { value: 'Cupom', label: 'Cupom (Requer Código)' },
                { value: 'Sem Cupom', label: 'Automática (Sem Código)' },
            ] as { value: PromotionType, label: string }[]
        },
        {
            name: 'promoCode',
            label: 'Código Promocional',
            type: FieldType.Text,
            required: false, // Requerido condicionalmente se promotionType for 'Cupom'
            section: 'Identificação',
            placeholder: 'Ex: PROMO10'
        },
        {
            name: 'description',
            label: 'Descrição Curta',
            type: FieldType.Textarea,
            required: true,
            section: 'Detalhes',
            rows: 2,
            placeholder: 'Breve descrição da oferta (Ex: 10% OFF no frete expresso).'
        },

        // --- Configuração de Desconto ---
        {
            name: 'discountType',
            label: 'Formato do Desconto',
            type: FieldType.Select,
            required: true,
            section: 'Configuração',
            defaultValue: 'Percentual',
            options: [
                { value: 'Percentual', label: 'Percentual (%)' },
                { value: 'Valor Fixo', label: 'Valor Fixo (R$)' },
            ] as { value: DiscountType, label: string }[]
        },
        {
            name: 'discountValue',
            label: 'Valor do Desconto',
            type: FieldType.Number,
            required: true,
            section: 'Configuração',
            placeholder: 'Ex: 10 (para 10%) ou 25 (para R$25)',
            step: 0.01,
            min: 0.01
        },
        {
            name: 'maxDiscountAmount',
            label: 'Valor Máximo de Desconto (R$)',
            type: FieldType.Number,
            required: false,
            section: 'Configuração',
            placeholder: 'Opcional: Teto máximo para %',
            step: 0.01,
            min: 0.01
        },
        {
            name: 'minOrderValue',
            label: 'Valor Mínimo do Pedido (R$)',
            type: FieldType.Number,
            required: false,
            section: 'Configuração',
            placeholder: 'Opcional: Valor mínimo para ativação',
            step: 0.01,
            min: 0
        },
        
        // --- Aplicação ---
        {
            name: 'applicableServices',
            label: 'Serviços Aplicáveis (IDs)',
            type: FieldType.MultiSelect,
            required: true,
            section: 'Aplicação',
            options: [
                { value: '1', label: 'Serviço Express' },
                { value: '2', label: 'Serviço Padrão' },
                { value: '3', label: 'Serviço Econômico' },
                { value: '4', label: 'Carga Pesada' },
                { value: '5', label: 'Inter-regional' },
            ],
            placeholder: 'Selecione os serviços que recebem o desconto'
        },
        {
            name: 'target',
            label: 'Público Alvo',
            type: FieldType.Select,
            required: true,
            section: 'Aplicação',
            defaultValue: 'Todos',
            options: [
                { value: 'Todos', label: 'Todos os Clientes' },
                { value: 'Novos Clientes', label: 'Apenas Novos Clientes' },
                // Adicionar outros, como 'Clientes VIP'
            ] as { value: PromotionTarget, label: string }[]
        },
        {
            name: 'eligibilityRule',
            label: 'Regra de Elegibilidade Detalhada',
            type: FieldType.Text,
            required: false,
            section: 'Aplicação',
            placeholder: 'Detalhes da regra (Ex: Primeiros 5 pedidos do mês)'
        },
        
        // --- Datas e Status ---
        {
            name: 'startDate',
            label: 'Data de Início',
            type: FieldType.Date,
            required: true,
            section: 'Cronograma e Uso',
        },
        {
            name: 'endDate',
            label: 'Data de Término (Opcional)',
            type: FieldType.Date,
            required: false,
            section: 'Cronograma e Uso',
        },
        {
            name: 'status',
            label: 'Status',
            type: FieldType.Select,
            required: true,
            section: 'Cronograma e Uso',
            defaultValue: 'Agendada',
            options: [
                { value: 'Agendada', label: 'Agendada' },
                { value: 'Ativa', label: 'Ativa' },
                { value: 'Pausada', label: 'Pausada' },
                { value: 'Expirada', label: 'Expirada' },
                { value: 'Cancelada', label: 'Cancelada' },
            ] as { value: PromotionStatus, label: string }[]
        },
        {
            name: 'maxUses',
            label: 'Usos Máximos Totais',
            type: FieldType.Number,
            required: false,
            section: 'Cronograma e Uso',
            placeholder: 'Deixe vazio para ilimitado',
            min: 1
        },
        {
            name: 'autoApply',
            label: 'Aplicação Automática',
            type: FieldType.Checkbox,
            required: false,
            section: 'Configuração',
        },
        {
            name: 'isStackable',
            label: 'Pode Ser Acumulável',
            type: FieldType.Checkbox,
            required: false,
            section: 'Configuração',
        },
    ],

    tableColumns: [
        {
            key: 'name',
            header: 'PROMOÇÃO',
            type: 'large-text',
            secondaryKey: 'description',
        },
        {
            key: 'promoCode',
            header: 'CÓDIGO',
            type: 'fixed-short'
        },
        {
            key: 'discountType',
            header: 'DESCONTO',
            type: 'fixed-short',
            render: (_, row) => {
                const value = row.discountValue;
                const type = row.discountType;
                return type === 'Percentual' ? `${value}%` : `R$ ${value.toFixed(2).replace('.', ',')}`;
            }
        },
        {
            key: 'target',
            header: 'PÚBLICO',
            type: 'fixed-short'
        },
        {
            key: 'usedCount',
            header: 'USOS',
            type: 'fixed-short',
            render: (value, row) => `${value} / ${row.maxUses ?? '∞'}`
        },
    ] as ColumnDefinition<Promotion>[],

    badgeVariants: {
        'Agendada': 'default',
        'Ativa': 'success',
        'Pausada': 'warning',
        'Expirada': 'info',
        'Cancelada': 'error',
    }
}