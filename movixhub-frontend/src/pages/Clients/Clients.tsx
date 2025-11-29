import TableActions from '../../components/common/Table/TableActions';
import BadgeTable from '../../components/common/Table/BadgeTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import type { ColumnDefinition } from '../../components/Table/Table';
import Table from '../../components/Table/Table';
import Styles from './Clients.module.css';

type ClientType = 'Pessoa Física' | 'Pessoa Jurídica';
type ClientClassification = 'Regular' | 'VIP' | 'Corporativo' | 'Novo' | 'Parceiro';
type ClientStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Em Análise';

const clientStatusClasses: Record<ClientStatus, string> = {
    'Ativo': Styles.statusActive,
    'Inativo': Styles.statusInactive,
    'Bloqueado': Styles.statusBlocked,
    'Em Análise': Styles.statusUnderReview
};

interface ChangeHistory {
  date: string;
  changedBy: string;
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
}

interface Client {
  id: string;
  fullNameOrCompany: string;
  clientType: ClientType;
  cpfCnpj: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  fullAddress: string;
  zipCode: string;
  city: string;
  state: string;
  classification: ClientClassification;
  status: ClientStatus;
  registrationDate: string;
  lastServiceDate?: string | null;
  totalServices: number;
  internalNotes?: string;
  lastUpdatedAt: string;
  changeHistory: ChangeHistory[];
}

const mockClientsData: Client[] = [
  {
    id: 'CLI-0001',
    fullNameOrCompany: 'Maria Eduarda Santos',
    clientType: 'Pessoa Física',
    cpfCnpj: '123.456.789-00',
    email: 'maria.santos@gmail.com',
    phone: '(83) 98877-4455',
    secondaryPhone: '(83) 99911-2233',
    fullAddress: 'Rua das Flores, 320, Centro',
    zipCode: '58400-123',
    city: 'Campina Grande',
    state: 'PB',
    classification: 'Regular',
    status: 'Ativo',
    registrationDate: '2024-08-10T09:30:00',
    lastServiceDate: '2025-01-15',
    totalServices: 5,
    internalNotes: 'Cliente pontual e costuma solicitar fretes pequenos.',
    lastUpdatedAt: '2025-01-15T10:20:00',
    changeHistory: [
      {
        date: '2025-01-15T10:20:00',
        changedBy: 'USER-002',
        field: 'totalServices',
        oldValue: 4,
        newValue: 5
      }
    ]
  },

  {
    id: 'CLI-0002',
    fullNameOrCompany: 'Construtora Horizonte LTDA',
    clientType: 'Pessoa Jurídica',
    cpfCnpj: '45.678.912/0001-90',
    email: 'contato@horizonte.com.br',
    phone: '(84) 3344-5566',
    fullAddress: 'Av. Principal, 1500, Distrito Industrial',
    zipCode: '59000-200',
    city: 'Natal',
    state: 'RN',
    classification: 'Corporativo',
    status: 'Ativo',
    registrationDate: '2024-05-02T14:00:00',
    lastServiceDate: '2025-02-01',
    totalServices: 22,
    internalNotes: 'Empresa com contratos mensais recorrentes para transporte de materiais.',
    lastUpdatedAt: '2025-02-01T16:45:00',
    changeHistory: [
      {
        date: '2024-12-10T11:00:00',
        changedBy: 'USER-001',
        field: 'classification',
        oldValue: 'Regular',
        newValue: 'Corporativo'
      }
    ]
  },

  {
    id: 'CLI-0003',
    fullNameOrCompany: 'João Pedro Azevedo',
    clientType: 'Pessoa Física',
    cpfCnpj: '987.654.321-00',
    email: 'joaopedro@gmail.com',
    phone: '(85) 97766-5544',
    fullAddress: 'Rua Projetada, 85, Bairro Novo',
    zipCode: '60000-340',
    city: 'Fortaleza',
    state: 'CE',
    classification: 'VIP',
    status: 'Em Análise',
    registrationDate: '2025-02-05T08:10:00',
    lastServiceDate: null,
    totalServices: 0,
    internalNotes: 'Cadastro recente, aguardando verificação de documentos.',
    lastUpdatedAt: '2025-02-05T08:10:00',
    changeHistory: []
  }
];

const clientsColumns: ColumnDefinition<Client>[] = [
    {
        key: 'fullNameOrCompany',
        header: 'NOME / RAZÃO SOCIAL',
        type: 'large-text',
        secondaryKey: 'email'
    },
    {
        key: 'phone',
        header: 'TELEFONE',
        type: 'medium-text'
    },
    {
        key: 'clientType',
        header: 'TIPO',
        type: 'medium-text'
    },
    {
        key: 'classification',
        header: 'CLASSIFICAÇÃO',
        type: 'fixed-short'
    },
    {
        key: 'status',
        header: 'STATUS',
        align: 'center',
        type: 'badge',
        render: (value) => {
            const status = value as ClientStatus;
            const colorClass = clientStatusClasses[status] || '';
            return <BadgeTable value={status} colorClass={colorClass} />;
        },
    },
    {
        key: 'totalServices',
        header: 'TOTAL DE SERVIÇOS',
        type: 'fixed-short',
    },
    {
        key: 'lastServiceDate',
        header: 'ÚLTIMO SERVIÇO',
        type: 'fixed-short',
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <TableActions itemId={row.id} />
    }
];


function Clients() {

    return (
        <div className={Styles.clientsContainer}>
            <PageHeader 
                title="Clientes Movix"
                description="Gerencie e acompanhe os clientes da Movix."
            />   
            <Table
                data={mockClientsData}
                columns={clientsColumns}
            />
        </div>
    )

}

export default Clients;