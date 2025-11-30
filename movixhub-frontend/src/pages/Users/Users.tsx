import Styles from './Users.module.css';
import {
  Table,
  TableBadge,
  TableActions,
  type ColumnDefinition,
  type TableBadgeProps
} from '../../components/common/Table';

import { PageHeader } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { useState } from 'react';
import { UserForm, UserPermissionsModal, type UserFormData } from '../../components/features/users';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { UserDetailsContent } from '../../components/features/users/UserDetailsContent';

type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

const userStatusClasses: Record<UserStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Bloqueado': 'error',
  'Suspenso': 'warning',
};

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
  cpf: string;
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

const mockUsersData: User[] = [
  {
    id: 'USER-001',
    fullName: 'Lucas Andrade Moura Santos',
    corporateEmail: 'lucas.andrade@movix.com',
    cpf: '123.456.789-00',
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
    cpf: '987.654.321-00',
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
    cpf: '456.789.123-00',
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
    cpf: '321.654.987-00',
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

// Função auxiliar para criar colunas
interface GetColumnsParams {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onPermissions: (user: User) => void;
}

const getUsersColumns = ({ onView, onEdit, onDelete, onPermissions }: GetColumnsParams): ColumnDefinition<User>[] => [
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
    key: 'specificPermissions',
    header: 'PERMISSÕES',
    align: 'center',
    type: 'actions',
    render: (value, row) => {
      const permissions = value as string[];
      const countPermissions = permissions.length;
      return (
        <Button
          onClick={() => onPermissions(row)}
          className={countPermissions > 0 ? Styles.permissionsActive : Styles.permissionsEmpty}
          title="Gerenciar Permissões"
          size='small'
        >
          <i className="bi bi-shield-lock"></i>
          {countPermissions > 0 && ` ${countPermissions}`}
        </Button>
      );
    }
  },
  {
    key: 'status',
    header: 'STATUS',
    type: 'badge',
    render: (value) => {
      const status = value as UserStatus;
      const variant = userStatusClasses[status] ?? 'default';
      return <TableBadge value={status} variant={variant} />;
    }
  },
  {
    key: 'lastAccess',
    header: 'ÚLTIMO ACESSO',
    type: 'fixed-short',
    render: (value) => {
      const date = new Date(value as string);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  {
    key: 'custom',
    header: 'AÇÕES',
    align: 'center',
    type: 'actions',
    render: (_, row) => (
      <TableActions
        onView={() => onView(row)}
        onEdit={() => onEdit(row)}
        onDelete={() => onDelete(row)}
      />
    )
  }
];

export const Users = () => {

  // Estado dos dados
  const [users, setUsers] = useState<User[]>(mockUsersData);

  // Estados do modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  // Estados auxiliares
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers para CRIAR
  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  // Handlers para EDITAR
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  // Handlers para VER DETALHES
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  // Handlers para DELETAR
  const handleDeleteUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      // TODO: Implementar chamada API
      // await deleteUser(selectedUser.id);
      console.log('Deltando usuáiro:', selectedUser.id);

      // Atualiza estado local
      setUsers(prevUsers => prevUsers.filter(u => u.id !== selectedUser.id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers para PERMISSÕES
  const handlePermissions = (user: User) => {
    setSelectedUser(user);
    setIsPermissionsOpen(true);
  };

  const handleSavePermissions = async (permissions: string[]) => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      // TODO: Implementar chamada API
      // await updateUserPermissions(selectedUser.id, permissions);

      console.log('Salvando permissões para usuário:', { userId: selectedUser.id, permissions });
      // Atualiza estado local
      setUsers(prevUsers => prevUsers.map(u =>
        u.id === selectedUser.id
          ? { ...u, specificPermissions: permissions }
          : u
      ));

      setIsPermissionsOpen(false);
      setSelectedUser(null);

    } catch (error) {
      console.error('Erro ao salvar permissões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler do FORMULÁRIO (Create/Edit)
  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      if (isEdit) {
        // TODO: Implementar chamada API
        // await updateUser(data);

        console.log('Atualizando usuário:', data);

        // Atualiza estado local
        setUsers(prevUsers => prevUsers.map(u =>
          u.id === data.id
            ? { ...u, ...data, updateAt: new Date().toISOString() }
            : u
        ));
      } else {
        // TODO: Implementar chamada API
        // const newUser = await createUser(data);

        const newUser: User = {
          id: `USER-${Date.now()}`,
          ...data,
          specificPermissions: [],
          loginAttempts: 0,
          lastAccess: new Date().toISOString(),
          profilePhoto: undefined,
          createdBy: 'CURRENT_USER',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          changeHistory: [],
          passwordHash: data.passwordHash || ''
        };

        console.log('Criando novo usuário:', newUser);

        setUsers(prevUsers => [...prevUsers, newUser]);
      }

      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const usersColumns: ColumnDefinition<User>[] = getUsersColumns({
    onView: handleViewUser,
    onEdit: handleEditUser,
    onDelete: handleDeleteUserClick,
    onPermissions: handlePermissions
  });

  return (
    <div className={Styles.usersContainer}>
      <PageHeader
        title="Equipe Interna"
        description="Gerencie os membros da equipe e suas permissões."
        buttonIcon={<i className="bi bi-plus-lg"></i>}
        buttonText="Adicionar Membro"
        onButtonClick={handleCreateUser}
      />
      <Table
        data={users}
        columns={usersColumns}
      />

      {/* Modal de Formulário (Create/Edit) */}
      <ModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEdit ? 'Editar Usuário' : 'Novo Usuário'}
        subtitle={isEdit ? selectedUser?.fullName : undefined}
        size="lg"
      >
        <UserForm
          key={selectedUser?.id || 'new'}
          initialData={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isEdit={isEdit}
          isLoading={isLoading}
        />
      </ModalForm>

      {/* Modal de Detalhes (View) */}
      <ModalDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Detalhes do Usuário"
        subtitle={selectedUser?.fullName}
        size="lg"
        onEdit={() => {
                    setIsDetailsOpen(false);
                    if (selectedUser) handleEditUser(selectedUser);
                }}
      >
        {selectedUser && <UserDetailsContent user={selectedUser} />}
      </ModalDetails>

      {/* Modal de Permissões */}
      <ModalForm
        isOpen={isPermissionsOpen}
        onClose={() => setIsPermissionsOpen(false)}
        title="Gerenciar Permissões"
        subtitle={selectedUser?.fullName}
        size="lg"
      >
        {selectedUser && (
          <UserPermissionsModal
            userName={selectedUser.fullName}
            currentPermissions={selectedUser.specificPermissions}
            onSave={handleSavePermissions}
            onCancel={() => setIsPermissionsOpen(false)}
            isLoading={isLoading}
          />
        )}
      </ModalForm>

      {/* Modal de Confirmação (Delete) */}
      <ModalConfirm
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteUser}
        onCancel={() => setIsDeleteOpen(false)}
        title="Deletar Usuário"
        message={`Tem certeza que deseja deletar o usuário "${selectedUser?.fullName}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, deletar"
        cancelLabel="Cancelar"
        variant="danger"
        isLoading={isLoading}
      />
    </div>
  );
};