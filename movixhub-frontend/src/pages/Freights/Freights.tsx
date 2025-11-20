import Table, { type ColumnDefinition } from '../../components/Table/Table';
import Styles from './Freights.module.css';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import BadgeTable from '../../components/BadgeTable/BadgeTable';
import ArrayRendererTable from '../../components/ArrayRendererTable/ArrayRenderer';

type ServiceInternalStatus = 'Ativo' | 'Inativo' |'Manutencao' | 'Indisponível';
type CoverageArea = 'Municipal' | 'Intermunicipal' | 'Interestadual' | 'Internacional';
type AllowedVehicle = 'Motocicleta' | 'Carro' | 'Van' | 'Caminhão' | 'Caminhão Pesado';

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
    activePromotions: string[];
}

// Mock de Serviços de Fretes do Movix
const mockServiceData: Service[] = [
    { id: '1', name: 'Expresso', internalCode: 'EX-001', description: 'Cargas leves e urgentes, foco em tempo. Ideal para documentos e pequenos volumes.', averagePrice: 45.00, status: 'Ativo', coverage: ['Municipal', 'Intermunicipal', 'Interestadual'], allowedVehicles: ['Motocicleta', 'Carro'], averageTime: '1-3 horas', activePromotions: ['PROMO-VERAO'] },
    { id: '2', name: 'Pesado', internalCode: 'PS-002', description: 'Transporte de cargas volumosas ou acima de 500kg.', averagePrice: 180.00, status: 'Manutencao', coverage: ['Municipal', 'Intermunicipal'], allowedVehicles: ['Caminhão Pesado'], averageTime: '3-5 dias', activePromotions: [] },
    { id: '3', name: 'Frágil', internalCode: 'FR-003', description: 'Requer manuseio especial e embalagem reforçada. Ideal para vidros e eletrônicos.', averagePrice: 75.00, status: 'Ativo', coverage: ['Municipal', 'Intermunicipal', 'Interestadual'], allowedVehicles: ['Van', 'Caminhão'], averageTime: '24-48 horas', activePromotions: [] },
    { id: '4', name: 'Normal', internalCode: 'NR-004', description: 'Solução mais econômica e padrão para entregas não urgentes.', averagePrice: 22.50, status: 'Inativo', coverage: ['Municipal', 'Intermunicipal', 'Interestadual', 'Internacional'], allowedVehicles: ['Carro', 'Van'], averageTime: '3-6 horas', activePromotions: ['PROMO-VERAO', 'PROMO-INVERNO'] },
    { id: '5', name: 'Veículo', internalCode: 'VE-005', description: 'Serviço dedicado para transporte de veículos e máquinas de médio porte.', averagePrice: 999.00, status: 'Indisponível', coverage: ['Municipal', 'Intermunicipal'], allowedVehicles: ['Caminhão Pesado'], averageTime: '7-15 dias', activePromotions: ['PROMO-INVERNO'] },
];

// Formatação de Moeda
// const formatCurrency = (value: number) =>
//     new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Mapeamentos de Status 
const statusClasses: Record<ServiceInternalStatus, string> = {
    'Ativo': Styles.statusActive,
    'Manutencao': Styles.statusMaintenance,
    'Inativo': Styles.statusInactive,
    'Indisponível': Styles.statusUnavailable,
};


const arrayBadgeColumns: Record<string, string> = {
    'Promotions': Styles.promotions,
    'Coverages': Styles.coverages,
    'Vehicles': Styles.vehicles,
}

// Mapeamento de Promoções 
// const promotionClasses = {
//     'PROMO-VERAO': Styles.promoVerao,
//     'PROMO-INVERNO': Styles.promoInverno,
// };

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
            const colorClass = statusClasses[status] || Styles.statusInactive;
            return <BadgeTable value={status} colorClass={colorClass} />;
        },
    },
    {
        key: 'activePromotions', 
        header: 'PROMOÇÕES',
        type: 'medium-text', 
        render: (_, row) => {
            if (row.activePromotions.length === 0) return <span className={Styles.noPromotions}>-</span>
            return (
                <ArrayRendererTable
                    items={row.activePromotions}
                    categoryClass={arrayBadgeColumns['Promotions']}
                />
            )
        }
    },
    {
        key: 'coverage', 
        header: 'COBERTURA',
        type: 'medium-text',
        render: (value) => ( 
            <ArrayRendererTable
                items={value as CoverageArea[]}
                categoryClass={arrayBadgeColumns['Coverages']}
            />
        )
    },
    {
        key: 'allowedVehicles', 
        header: 'VEÍCULOS',
        type: 'medium-text',
        render: (value) => ( 
            <ArrayRendererTable
                items={value as AllowedVehicle[]}
                categoryClass={arrayBadgeColumns['Vehicles']}
            />
        )
    },
    {
        key: 'averageTime',
        header: 'TEMPO MÉDIO',
        type: 'fixed-short',
        render: (value) => <span>{value}</span>, 
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <ActionsTable itemId={row.id} />,
        className: Styles.colActions
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