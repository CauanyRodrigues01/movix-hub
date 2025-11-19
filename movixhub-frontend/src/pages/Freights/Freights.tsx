import Table, { type ColumnDefinition } from '../../components/Table/Table';
import Styles from './Freights.module.css';
import ActionsTable from '../../components/ActionsTable/ActionsTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import BadgeTable from '../../components/BadgeTable/BadgeTable';

// --- Tipos Específicos para o Exemplo de Serviço ---
type ServiceType = 'Urbano' | 'Regional' | 'Expresso';
type ServiceStatus = 'Ativo' | 'Manutencao' | 'Inativo' | 'Indisponível';

interface Service {
    id: string | number;
    name: string;
    description: string;
    type: ServiceType;
    routeDetails: string;
    routeSpecs: string;
    priceMedio: number;
    estimatedTime: string;
    status: ServiceStatus;
}

const mockServiceData: Service[] = [
    { id: '1', name: 'Frete Urbano Centro', description: 'Serviço de frete para região central da cidade', type: 'Urbano', routeDetails: 'Centro → Zona Sul', routeSpecs: 'Van • Até 50kg', priceMedio: 25.90, estimatedTime: '2-4 horas', status: 'Indisponível' },
    { id: '2', name: 'Frete Regional SP-RJ', description: 'Frete regional entre capitais', type: 'Regional', routeDetails: 'São Paulo → Rio de Janeiro', routeSpecs: 'Caminhão • Até 200kg', priceMedio: 180.00, estimatedTime: '6-8 horas', status: 'Inativo' },
    { id: '3', name: 'Expresso Aeroporto', description: 'Serviço expresso para aeroporto', type: 'Expresso', routeDetails: 'Centro → Aeroporto', routeSpecs: 'Carro • Até 30kg', priceMedio: 45.00, estimatedTime: '1-2 horas', status: 'Ativo' },
    { id: '4', name: 'Frete Zona Norte', description: 'Frete para região norte da cidade', type: 'Urbano', routeDetails: 'Centro → Zona Norte', routeSpecs: 'Van • Até 40kg', priceMedio: 22.50, estimatedTime: '2-3 horas', status: 'Manutencao' },
    { id: '5', name: 'Regional Interior', description: 'Serviço para cidades do interior', type: 'Regional', routeDetails: 'Capital → Interior', routeSpecs: 'Caminhão • Até 150kg', priceMedio: 120.00, estimatedTime: '4-6 horas', status: 'Ativo' },
];

// Formatação de Moeda
const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Mapeamentos de Classes (Para a demonstração)
const typeClasses: Record<ServiceType, string> = {
    'Urbano': Styles.typeUrbano,
    'Regional': Styles.typeRegional,
    'Expresso': Styles.typeExpresso,
};

const statusClasses: Record<ServiceStatus, string> = {
    'Ativo': Styles.statusActive,
    'Manutencao': Styles.statusMaintenance,
    'Inativo': Styles.statusInactive,
    'Indisponível': Styles.statusUnavailable,
};

// Definição das Colunas
const serviceColumns: ColumnDefinition<Service>[] = [
    {
        key: 'name',
        header: 'SERVIÇO',
        type: 'large-text',
        secondaryKey: 'description',
    },
    {
        key: 'type',
        header: 'TIPO',
        type: 'badge',
        render: (value) => {
            const status = value as ServiceType;
            const colorClass = typeClasses[status] || '';
            return <BadgeTable value={status} colorClass={colorClass} />;
        },
    },
    {
        key: 'priceMedio',
        header: 'PREÇO MÉDIO',
        align: 'center',
        type: 'fixed-short',
        render: (value) => formatCurrency(value as number),
    },
    {
        key: 'status',
        header: 'STATUS',
        type: 'badge',
        render: (value) => {
            const status = value as ServiceStatus;
            const colorClass = statusClasses[status] || '';
            return <BadgeTable value={status} colorClass={colorClass} />;
        },
    },
    {
        key: 'routeDetails',
        header: 'ROTA',
        type: 'medium-text',
        secondaryKey: 'routeSpecs',
    },
    {
        key: 'estimatedTime',
        header: 'TEMPO ESTIMADO',
        align: 'center',
        type: 'fixed-short',
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: () => <ActionsTable />,
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