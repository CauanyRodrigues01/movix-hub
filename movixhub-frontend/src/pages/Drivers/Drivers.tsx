// Tipo de Motorista
// Motorista de Cargas
// Motorista Leve
// Motoboy
// Motorista Urban
// Carreteiro
// Pranchista
// etc.

// Disponibilidade Programada
// Férias
// Folga
// Ausente
// Horário de Trabalho

// Score de Segurança
// Histórico de ocorrências
// Reclamações
// Notas negativas
// Pontos críticos

import TableActions from '../../components/common/Table/TableActions';
import BadgeTable from '../../components/common/Table/BadgeTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import Table, { type ColumnDefinition } from '../../components/Table/Table';
import Styles from './Drivers.module.css';

type DriverStatus = 'Disponível' | 'Em Rota' | 'Inativo' | 'Suspenso';
type DriverLinkType = 'Interno' | 'Terceirizado' | 'Parceiro';
type CnhCategory = 'A' | 'B' | 'C' | 'D' | 'E';

const driverStatusClasses: Record<DriverStatus, string> = {
  'Disponível': Styles.statusAvailable,
  'Em Rota': Styles.statusInRoute,
  'Inativo': Styles.statusInactive,
  'Suspenso': Styles.statusSuspended,
};

interface ChangeHistory {
  date: string;
  changedBy: string;
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
}

interface Driver {
  id: string;
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
  createdAt: string;
  updatedAt: string;
  changeHistory: ChangeHistory[];
}

const mockDriversData: Driver[] = [
  {
    id: 'MOT-001',
    fullName: 'João Carlos Ferreira',
    cpf: '123.456.789-00',
    cnhNumber: '98765432100',
    cnhCategory: 'D',
    cnhValidity: '2026-08-15',
    phone: '+55 83 98888-1111',
    email: 'joao.ferreira@gmail.com',
    driverLinkType: 'Parceiro',
    status: 'Disponível',
    linkedVehicleId: 'VEI-001',
    averageRating: 4.8,
    totalDeliveries: 152,
    baseCity: 'Campina Grande',
    admissionDate: '2023-05-10',
    internalScore: 92,
    observations: 'Motorista pontual e bem avaliado pelos clientes.',
    createdAt: '2023-05-10T09:30:00',
    updatedAt: '2025-01-18T14:20:00',
    changeHistory: []
  },

  {
    id: 'MOT-002',
    fullName: 'André Luiz Nascimento',
    cpf: '987.654.321-99',
    cnhNumber: '12345678911',
    cnhCategory: 'C',
    cnhValidity: '2025-03-20',
    phone: '+55 84 97777-2222',
    email: 'andre.nascimento@gmail.com',
    driverLinkType: 'Interno',
    status: 'Em Rota',
    linkedVehicleId: 'VEI-003',
    averageRating: 4.5,
    totalDeliveries: 310,
    baseCity: 'Natal',
    admissionDate: '2021-11-02',
    internalScore: 88,
    observations: 'Motorista experiente em rotas intermunicipais.',
    createdAt: '2021-11-02T08:10:00',
    updatedAt: '2025-02-02T10:45:00',
    changeHistory: [
      {
        date: '2025-02-02T10:45:00',
        changedBy: 'SYSTEM',
        field: 'status',
        oldValue: 'Disponível',
        newValue: 'Em Rota'
      }
    ]
  },

  {
    id: 'MOT-003',
    fullName: 'Rogério Batista da Silva',
    cpf: '321.654.987-55',
    cnhNumber: '55667788990',
    cnhCategory: 'E',
    cnhValidity: '2024-12-10',
    phone: '+55 81 96666-3333',
    email: 'rogerio.silva@gmail.com',
    driverLinkType: 'Terceirizado',
    status: 'Inativo',
    linkedVehicleId: 'VEI-005',
    averageRating: 3.9,
    totalDeliveries: 89,
    baseCity: 'Recife',
    admissionDate: '2022-06-18',
    internalScore: 67,
    observations: 'Necessita reciclagem em atendimento ao cliente.',
    createdAt: '2022-06-18T11:00:00',
    updatedAt: '2024-12-20T09:15:00',
    changeHistory: [
      {
        date: '2024-12-20T09:15:00',
        changedBy: 'ADMIN',
        field: 'status',
        oldValue: 'Disponível',
        newValue: 'Inativo'
      }
    ]
  },

  {
    id: 'MOT-004',
    fullName: 'Carlos Eduardo Pimenta',
    cpf: '741.852.963-77',
    cnhNumber: '99887766554',
    cnhCategory: 'B',
    cnhValidity: '2027-05-30',
    phone: '+55 85 95555-4444',
    email: 'carlos.pimenta@gmail.com',
    driverLinkType: 'Parceiro',
    status: 'Suspenso',
    linkedVehicleId: 'VEI-007',
    averageRating: 2.8,
    totalDeliveries: 45,
    baseCity: 'Fortaleza',
    admissionDate: '2024-02-01',
    internalScore: 42,
    observations: 'Suspenso por múltiplas reclamações.',
    createdAt: '2024-02-01T10:00:00',
    updatedAt: '2025-01-25T13:00:00',
    changeHistory: [
      {
        date: '2025-01-25T13:00:00',
        changedBy: 'SUPERVISOR',
        field: 'status',
        oldValue: 'Inativo',
        newValue: 'Suspenso'
      }
    ]
  }
];

const driversColumns: ColumnDefinition<Driver>[] = [
    {
        key: 'fullName',
        header: 'NOME',
        type: 'large-text',
        secondaryKey: 'email'
    }, 
    {
        key: 'status',
        header: 'STATUS',
        align: 'center',
        type: 'badge',
        render: (value) => {
            const status = value as DriverStatus;
            const colorClass = driverStatusClasses[status];
            return <BadgeTable value={status} colorClass={colorClass} />;
        }
    },
    {
        key: 'driverLinkType',
        header: 'VÍNCULO',
        type: 'fixed-short'
    },
    {
        key: 'averageRating',
        header: 'AVALIAÇÃO',
        type: 'fixed-short',
        render: (_, row) => {
            return <span>{row.averageRating} <i className="bi bi-star"></i></span>
        } 
    },
    {
        key: 'baseCity',
        header: 'CIDADE BASE',
        type: 'medium-text'
    },
    {
        key: 'totalDeliveries',
        header: 'TOTAL ENTREGAS',
        type: 'fixed-short'
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <TableActions itemId={row.id} />
    }
]

function Drivers() {
    return (
        <div className={Styles.driversContainer}>
            <PageHeader 
                title="Motoristas"
                description="Gerencie os motoristas cadastrados no Movix."
            />
            <Table
                data={mockDriversData}
                columns={driversColumns}
            />
        </div>
        
    )
}

export default Drivers;