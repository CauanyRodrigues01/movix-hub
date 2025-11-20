import ActionsTable from '../../components/ActionsTable/ActionsTable';
import BadgeTable from '../../components/BadgeTable/BadgeTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import Table, { type ColumnDefinition } from '../../components/Table/Table';
import styles from './Promotions.module.css';

type PromotionStatus = 'Agendada' | 'Ativa' | 'Pausada' | 'Expirada' | 'Cancelada';
type DiscountType = 'Percentual' | 'Valor Fixo';

interface ChangeHistory {
    date: string;
    changedBy: string;
    field: string;
    oldValue: string | number;
    newValue: string | number;
}

interface Promotion {
    id: string | number;
    name: string;
    promoCode?: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    applicableServices: string[]; // IDs dos serviços
    startDate: string;
    endDate?: string | null;
    status: PromotionStatus;
    maxUses?: number;
    usedCount: number;
    autoApply: boolean;
    priority: number;
    eligibilityRule: string;
    createdAt: string;
    updatedAt: string;
    changeHistory: ChangeHistory[];
}

const discountTypeClasses: Record<DiscountType, string> = {
    'Percentual': styles.discountPercentage,
    'Valor Fixo': styles.discountFixedValue,
};

const statusClasses: Record<PromotionStatus, string> = {
    'Agendada': styles.statusScheduled,
    'Ativa': styles.statusActive,
    'Pausada': styles.statusPaused,
    'Expirada': styles.statusExpired,
    'Cancelada': styles.statusCancelled,
};

const mockPromotionsData: Promotion[] = [
    {
        id: 'PROMO-001',
        name: 'Desconto Primeira Viagem',
        promoCode: 'MOVIX10',
        description: '10% de desconto para novos clientes na primeira contratação.',
        discountType: 'Percentual',
        discountValue: 10,
        applicableServices: ['1', '3'],
        startDate: '2025-01-01T00:00:00',
        endDate: null,
        status: 'Ativa',
        maxUses: 1000,
        usedCount: 245,
        autoApply: false,
        priority: 1,
        eligibilityRule: 'Somente para novos clientes',
        createdAt: '2024-12-15T14:20:00',
        updatedAt: '2025-01-10T09:00:00',
        changeHistory: [
            {
                date: '2025-01-10T09:00:00',
                changedBy: 'Admin',
                field: 'discountValue',
                oldValue: 15,
                newValue: 10
            }
        ]
    },

    {
        id: 'PROMO-002',
        name: 'Frete Econômico',
        promoCode: 'FRETE20',
        description: 'R$20 de desconto para serviços do tipo Normal.',
        discountType: 'Valor Fixo',
        discountValue: 20,
        applicableServices: ['4'],
        startDate: '2025-02-01T00:00:00',
        endDate: '2025-03-01T23:59:59',
        status: 'Agendada',
        maxUses: 500,
        usedCount: 0,
        autoApply: true,
        priority: 2,
        eligibilityRule: 'Válido para todos os usuários',
        createdAt: '2025-01-20T11:00:00',
        updatedAt: '2025-01-20T11:00:00',
        changeHistory: []
    },

    {
        id: 'PROMO-003',
        name: 'Inverno Movix',
        promoCode: 'WINTER15',
        description: 'Desconto especial de inverno para cargas pesadas.',
        discountType: 'Percentual',
        discountValue: 15,
        applicableServices: ['2', '5'],
        startDate: '2024-06-01T00:00:00',
        endDate: '2024-08-30T23:59:59',
        status: 'Expirada',
        maxUses: 300,
        usedCount: 300,
        autoApply: true,
        priority: 3,
        eligibilityRule: 'Aplicável para qualquer cliente',
        createdAt: '2024-05-10T08:30:00',
        updatedAt: '2024-09-01T10:10:00',
        changeHistory: [
            {
                date: '2024-09-01T10:10:00',
                changedBy: 'Sistema',
                field: 'status',
                oldValue: 'Ativa',
                newValue: 'Expirada'
            }
        ]
    },

    // ➕ NOVAS PROMOÇÕES

    {
        id: 'PROMO-004',
        name: 'Black Movix',
        promoCode: 'BLACK30',
        description: '30% de desconto em qualquer serviço durante a Black Week.',
        discountType: 'Percentual',
        discountValue: 30,
        applicableServices: ['1', '2', '3', '4', '5'],
        startDate: '2025-11-20T00:00:00',
        endDate: '2025-11-30T23:59:59',
        status: 'Agendada',
        maxUses: 2000,
        usedCount: 0,
        autoApply: true,
        priority: 0,
        eligibilityRule: 'Válido para todos os usuários',
        createdAt: '2025-10-01T09:00:00',
        updatedAt: '2025-10-01T09:00:00',
        changeHistory: []
    },

    {
        id: 'PROMO-005',
        name: 'Cliente VIP',
        promoCode: 'VIP50',
        description: 'R$50 de desconto exclusivo para clientes premium.',
        discountType: 'Valor Fixo',
        discountValue: 50,
        applicableServices: ['3', '5'],
        startDate: '2024-12-01T00:00:00',
        endDate: null,
        status: 'Pausada',
        maxUses: 150,
        usedCount: 45,
        autoApply: false,
        priority: 1,
        eligibilityRule: 'Somente clientes com plano premium',
        createdAt: '2024-11-10T10:30:00',
        updatedAt: '2025-01-05T14:15:00',
        changeHistory: [
            {
                date: '2025-01-05T14:15:00',
                changedBy: 'Admin',
                field: 'status',
                oldValue: 'Ativa',
                newValue: 'Pausada'
            }
        ]
    },

    {
        id: 'PROMO-006',
        name: 'Promo Cancelada Teste',
        promoCode: 'TESTE00',
        description: 'Promoção cancelada para fins de auditoria interna.',
        discountType: 'Percentual',
        discountValue: 5,
        applicableServices: ['1'],
        startDate: '2024-03-01T00:00:00',
        endDate: '2024-03-10T23:59:59',
        status: 'Cancelada',
        maxUses: 50,
        usedCount: 3,
        autoApply: false,
        priority: 5,
        eligibilityRule: 'Promoção interna',
        createdAt: '2024-02-15T12:00:00',
        updatedAt: '2024-03-02T16:00:00',
        changeHistory: [
            {
                date: '2024-03-02T16:00:00',
                changedBy: 'Sistema',
                field: 'status',
                oldValue: 'Agendada',
                newValue: 'Cancelada'
            }
        ]
    }
];


// Definição das Colunas
const promotionsColumns: ColumnDefinition<Promotion>[] = [
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
        header: 'TIPO DE DESCONTO',
        type: 'fixed-short',
        render: (value) => {
            const type = value as DiscountType;
            const colorClass = discountTypeClasses[type] || '';
            return <BadgeTable value={type} colorClass={colorClass} />;
        }
    },
    {
        key: 'status',
        header: 'STATUS',
        type: 'fixed-short',
        render: (value) => {
            const status = value as PromotionStatus;
            const colorClass = statusClasses[status] || '';
            return <BadgeTable value={status} colorClass={colorClass} />;

        }
    },
    {
        key: 'startDate',
        header: 'INÍCIO',
        type: 'fixed-short'
    },
    {
        key: 'endDate',
        header: 'TÉRMINO',
        type: 'fixed-short',
        render: (_, row) => row.endDate ? row.endDate : <span className={styles.noEndDate}>-</span>
    },
    {
        key: 'usedCount',
        header: 'USOS',
        type: 'fixed-short',
        render: (value, row) => `${value} / ${row.maxUses ?? '∞'}`
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <ActionsTable itemId={row.id} />,
    }
]

function Promotions() {

    return (
        <div className={styles.promotionsContainer}>
            <PageHeader
                title="Acompanhar Promoções"
                description="Gerencie e acompanhe as promoções ativas e futuras."
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Nova Promoção"
                onButtonClick={() => alert('Clicou no botão!')}
            />
            <Table
                data={mockPromotionsData}
                columns={promotionsColumns}
            />
        </div>
    )
}

export default Promotions;