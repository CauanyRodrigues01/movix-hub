import ActionsTable from '../../components/ActionsTable/ActionsTable';
import BadgeTable from '../../components/BadgeTable/BadgeTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import Table, { type ColumnDefinition } from '../../components/Table/Table';
import styles from './Users.module.css';

type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

interface ChangeHistory {
  date: string;
  changedBy: string;
  field: string;
  oldValue: string | number | boolean;
  newValue: string | number | boolean;
}

interface User {
  id: string;
  fullName: string;
  corporateEmail: string;
  phone?: string;
  position: string;
  department: string;
  accessProfile: AccessProfile;
  specificPermissions: string[];
  status: UserStatus;
  admissionDate: string;
  lastAccess: string;
  loginAttempts: number;
  passwordHash: string;
  profilePhoto?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  changeHistory: ChangeHistory[];
}

const userStatusClasses: Record<UserStatus, string> = {
    'Ativo': styles.statusActive,
    'Inativo': styles.statusInactive,
    'Bloqueado': styles.statusBlocked,
    'Suspenso': styles.statusSuspended,
};

const mockUsersData: User[] = [
  {
    id: 'USER-001',
    fullName: 'Lucas Andrade Moura Santos',
    corporateEmail: 'lucas.andrade@movix.com',
    phone: '+55 83 99999-1234',
    position: 'Supervisor de Operações',
    department: 'Logística',
    accessProfile: 'Supervisor',
    specificPermissions: ['EDIT_SERVICE', 'VIEW_REPORTS'],
    status: 'Ativo',
    admissionDate: '2022-03-15',
    lastAccess: '2025-02-10T09:45:00',
    loginAttempts: 0,
    passwordHash: 'hashed_password_001',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
    createdBy: 'USER-ADMIN',
    createdAt: '2022-03-10T10:00:00',
    updatedAt: '2025-01-20T11:30:00',
    changeHistory: []
  },

  {
    id: 'USER-002',
    fullName: 'Mariana Silva Fernandes Lima',
    corporateEmail: 'mariana.silva@movix.com',
    phone: '+55 84 98888-4567',
    position: 'Analista Financeiro',
    department: 'Financeiro',
    accessProfile: 'Finanças',
    specificPermissions: ['VIEW_INVOICES', 'EXPORT_REPORTS'],
    status: 'Ativo',
    admissionDate: '2023-01-05',
    lastAccess: '2025-02-09T16:20:00',
    loginAttempts: 1,
    passwordHash: 'hashed_password_002',
    profilePhoto: 'https://i.pravatar.cc/150?img=32',
    createdBy: 'USER-ADMIN',
    createdAt: '2023-01-05T14:00:00',
    updatedAt: '2024-12-18T09:10:00',
    changeHistory: []
  },

  {
    id: 'USER-003',
    fullName: 'Rafael Costa da Silva Lopes',
    corporateEmail: 'rafael.costa@movix.com',
    phone: '+55 81 97777-0001',
    position: 'Agente de Suporte ao Cliente',
    department: 'Suporte',
    accessProfile: 'Operador',
    specificPermissions: ['CREATE_TICKET', 'EDIT_TICKET'],
    status: 'Inativo',
    admissionDate: '2021-07-20',
    lastAccess: '2024-12-15T13:05:00',
    loginAttempts: 0,
    passwordHash: 'hashed_password_003',
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
    createdBy: 'USER-ADMIN',
    createdAt: '2021-07-18T09:00:00',
    updatedAt: '2025-01-02T08:30:00',
    changeHistory: [
      {
        date: '2025-01-02T08:30:00',
        changedBy: 'HR_MANAGER',
        field: 'status',
        oldValue: 'Ativo',
        newValue: 'Inativo'
      }
    ]
  },

  {
    id: 'USER-004',
    fullName: 'Ana Beatriz Rocha Vieira',
    corporateEmail: 'ana.rocha@movix.com',
    phone: '+55 85 96666-7890',
    position: 'Administrador de Sistemas',
    department: 'TI',
    accessProfile: 'Administrador',
    specificPermissions: ['FULL_ACCESS'],
    status: 'Suspenso',
    admissionDate: '2020-02-01',
    lastAccess: '2024-11-10T18:00:00',
    loginAttempts: 5,
    passwordHash: 'hashed_password_004',
    profilePhoto: 'https://i.pravatar.cc/150?img=44',
    createdBy: 'SYSTEM',
    createdAt: '2020-02-01T10:00:00',
    updatedAt: '2025-02-01T12:00:00',
    changeHistory: [
      {
        date: '2025-02-01T12:00:00',
        changedBy: 'SECURITY_SYSTEM',
        field: 'status',
        oldValue: 'Ativo',
        newValue: 'Suspenso'
      }
    ]
  }
];

const usersColumns: ColumnDefinition<User>[] = [
    {
        key: 'fullName',
        header: 'NOME',
        type: 'large-text',
        secondaryKey: 'corporateEmail'
    },
    {
        key: 'position',
        header: 'CARGO',
        type: 'large-text'
    },
    {
        key: 'accessProfile',
        header: 'PERFIL DE ACESSO',
        type: 'fixed-short'
    },
    {
        key: 'status',
        header: 'STATUS',
        type: 'badge',
        render: (value) => {
            const status = value as UserStatus;
            const colorClass = userStatusClasses[status] || '';
            return <BadgeTable value={status} colorClass={colorClass} />;
        }
    },
    {
        key: 'lastAccess',
        header: 'ÚLTIMO ACESSO',
        type: 'fixed-short',
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <ActionsTable itemId={row.id} />
    }
]


function Users() {
    return (
        <div className={styles.usersContainer}>
            <PageHeader 
                title="Equipe Interna"
                description="Gerencie os membros da equipe e suas permissões."
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Adicionar Membro"
                onButtonClick={() => alert('Clicou no botão!')}
            />
            <Table
                data={mockUsersData}
                columns={usersColumns}
            />
        </div>
    )
}

export default Users;