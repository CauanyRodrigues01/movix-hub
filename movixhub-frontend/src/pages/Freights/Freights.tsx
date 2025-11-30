import Styles from './Freights.module.css';
import { 
    Table, 
    TableBadge,
    TableActions,
    TableArrayRenderer,
    type ColumnDefinition,
    type TableBadgeProps
} from '../../components/common/Table';

import { PageHeader } from '../../components/common/Layout';

type ServiceInternalStatus = 'Ativo' | 'Inativo' | 'Manutencao' | 'Indisponível';
type CoverageArea = 'Municipal' | 'Intermunicipal' | 'Interestadual' | 'Internacional';
type AllowedVehicle = 'Motocicleta' | 'Carro' | 'Van' | 'Caminhão' | 'Caminhão Pesado';

// Mapeamentos de Status 
const freightsStatusClasses: Record<ServiceInternalStatus, TableBadgeProps["variant"]> = {
    'Ativo': 'success',
    'Manutencao': 'warning',
    'Inativo': 'info',
    'Indisponível': 'error',
};

interface ChangeHistory {
  date: string;
  changedBy: string;
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
}

interface Service {
    id: string | number;
    name: string;
    internalCode: string
    description: string;
    averagePrice: number;
    status: ServiceInternalStatus;
    coverage: CoverageArea[];
    allowedVehicles: AllowedVehicle[];
    averageTime: string;
    detailedCoverageArea: string;
    activePromotions: string[];
    createdAt: string;
    updatedAt: string;
    changeHistory: ChangeHistory[];
}

// Mock de Serviços de Fretes do Movix
const mockServiceData: Service[] = [
    {
        id: '1',
        name: 'Expresso',
        internalCode: 'EX-001',
        description: 'Cargas leves e urgentes, foco em tempo. Ideal para documentos e pequenos volumes.',
        averagePrice: 45.0,
        status: 'Ativo',
        coverage: ['Municipal', 'Intermunicipal', 'Interestadual'],
        allowedVehicles: ['Motocicleta', 'Carro'],
        averageTime: '1-3 horas',
        activePromotions: ['PROMO-VERAO'],
        detailedCoverageArea: 'Atendimento prioritário em áreas urbanas e polos comerciais.',
        createdAt: '2025-01-10T10:30:00Z',
        updatedAt: '2025-03-02T14:20:00Z',
        changeHistory: [
            { 
                date: '2025-03-02', 
                changedBy: 'admin01', 
                field: 'averagePrice',
                oldValue: 40,
                newValue: 45
            }
        ]
    },
    {
        id: '2',
        name: 'Pesado',
        internalCode: 'PS-002',
        description: 'Transporte de cargas volumosas ou acima de 500kg.',
        averagePrice: 180.0,
        status: 'Manutencao',
        coverage: ['Municipal', 'Intermunicipal'],
        allowedVehicles: ['Caminhão Pesado'],
        averageTime: '3-5 dias',
        activePromotions: [],
        detailedCoverageArea: 'Restrito à região metropolitana devido à limitação estrutural.',
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-02-28T11:10:00Z',
        changeHistory: [
            { 
                date: '2025-02-28', 
                changedBy: 'admin02', 
                field: 'status',
                oldValue: 'Ativo',
                newValue: 'Manutencao'
            }
        ]
    },
    {
        id: '3',
        name: 'Frágil',
        internalCode: 'FR-003',
        description: 'Requer manuseio especial e embalagem reforçada. Ideal para vidros e eletrônicos.',
        averagePrice: 75.0,
        status: 'Ativo',
        coverage: ['Municipal', 'Intermunicipal', 'Interestadual'],
        allowedVehicles: ['Van', 'Caminhão'],
        averageTime: '24-48 horas',
        activePromotions: [],
        detailedCoverageArea: 'Cobertura limitada em regiões com vias pavimentadas.',
        createdAt: '2025-01-20T13:00:00Z',
        updatedAt: '2025-03-01T16:45:00Z',
        changeHistory: [
            { 
                date: '2025-03-01', 
                changedBy: 'admin03', 
                field: 'averageTime',
                oldValue: '48-72 horas',
                newValue: '24-48 horas'
            }
        ]
    },
    {
        id: '4',
        name: 'Normal',
        internalCode: 'NR-004',
        description: 'Solução mais econômica e padrão para entregas não urgentes.',
        averagePrice: 22.5,
        status: 'Inativo',
        coverage: ['Municipal', 'Intermunicipal', 'Interestadual', 'Internacional'],
        allowedVehicles: ['Carro', 'Van'],
        averageTime: '3-6 horas',
        activePromotions: ['PROMO-VERAO', 'PROMO-INVERNO'],
        detailedCoverageArea: 'Disponível em todo território nacional.',
        createdAt: '2025-01-05T08:00:00Z',
        updatedAt: '2025-02-15T17:30:00Z',
        changeHistory: [
            { 
                date: '2025-02-15', 
                changedBy: 'admin01', 
                field: 'status',
                oldValue: 'Ativo',
                newValue: 'Inativo'
            }
        ]
    },
    {
        id: '5',
        name: 'Veículo',
        internalCode: 'VE-005',
        description: 'Serviço dedicado para transporte de veículos e máquinas de médio porte.',
        averagePrice: 999.0,
        status: 'Indisponível',
        coverage: ['Municipal', 'Intermunicipal'],
        allowedVehicles: ['Caminhão Pesado'],
        averageTime: '7-15 dias',
        activePromotions: ['PROMO-INVERNO'],
        detailedCoverageArea: 'Operação restrita a centros logísticos especializados.',
        createdAt: '2025-01-25T10:15:00Z',
        updatedAt: '2025-03-05T09:50:00Z',
        changeHistory: [
            { 
                date: '2025-03-05', 
                changedBy: 'admin04',
                field: 'status',
                oldValue: 'Ativo',
                newValue: 'Indisponível'
            }
        ]
    }
];

// Definição das Colunas
const serviceColumns: ColumnDefinition<Service>[] = [
    {
        key: 'name',
        header: 'SERVIÇO',
        type: 'large-text',
        secondaryKey: 'description',
    },
    {
        key: 'internalCode',
        header: 'CÓDIGO',
        type: 'fixed-short',
    },
    {
        key: 'status',
        header: 'STATUS',
        type: 'badge',
        render: (value) => {
            const status = value as ServiceInternalStatus;
            const variant = freightsStatusClasses[status] ?? 'default';
            return <TableBadge value={status} variant={variant} />;
        },
    },
    {
        key: 'activePromotions',
        header: 'PROMOÇÕES',
        type: 'medium-text',
        render: (_, row) => {
            if (row.activePromotions.length === 0) return <span className={Styles.noPromotions}>-</span>
            return (
                <TableArrayRenderer
                    items={row.activePromotions}
                />
            )
        }
    },
    {
        key: 'coverage',
        header: 'COBERTURA',
        type: 'medium-text',
        render: (value) => (
            <TableArrayRenderer
                items={value as CoverageArea[]}
                variant='custom'
                className={Styles.coverages}
            />
        )
    },
    {
        key: 'allowedVehicles',
        header: 'VEÍCULOS',
        type: 'medium-text',
        render: (value) => (
            <TableArrayRenderer
                items={value as AllowedVehicle[]}
                variant='custom'
                className={Styles.vehicles}
            />
        )
    },
    {
        key: 'averageTime',
        header: 'TEMPO MÉDIO',
        type: 'fixed-short',
        render: (_, row) => {
            if (!row.averageTime) return <span>-</span>;
            return <span>{row.averageTime}</span>;
        }
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <TableActions
          onView={() => alert("ver mais " + row.id)}
          onEdit={() => alert("Editando " + row.id)}
          onDelete={() => alert("Deletando " + row.id)}
        />
    },
];

function Freights() {

    return (
        <div className={Styles.freightsContainer}>
            <PageHeader
                title="Serviços de Frete"
                description="Gerencie todos os serviços de frete da Movix"
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Novo Serviço"
                onButtonClick={() => alert('Clicou no botão!')}
            />
            <Table
                data={mockServiceData}
                columns={serviceColumns}
            />
        </div>
    )
}

export default Freights;