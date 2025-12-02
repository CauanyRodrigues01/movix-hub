import { useState } from 'react';
import Styles from './Users.module.css';
import { Table, TableActions, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { UserPermissionsModal, userSchema } from '../../components/features/users';
import { Button } from '../../components/common/Button';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { User, UserStatus } from '../../types';

const userStatusClasses: Record<UserStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Bloqueado': 'error',
  'Suspenso': 'warning',
};

const mockUsersData: User[] = [
  {
    id: 'USER-001',
    // Dados pessoais (BasePerson)
    fullName: 'Lucas Andrade Moura Santos',
    cpfCnpj: '123.456.789-00',
    phone: '+55 83 99999-1234',
    email: 'lucas.santos@gmail.com',
    corporateEmail: 'lucas.andrade@movix.com',
    // Endereço (BasePerson)
    fullAddress: 'Rua Professor João Rique, 234, Catolé',
    zipCode: '58410-485',
    city: 'Campina Grande',
    state: 'PB',
    // Dados organizacionais (BasePerson)
    admissionDate: '2022-03-15',
    status: 'Ativo',
    // Dados específicos User
    position: 'Supervisor de Operações',
    department: 'Logística',
    accessProfile: 'Supervisor',
    specificPermissions: ['EDIT_SERVICE', 'VIEW_REPORTS'],
    lastAccess: '2025-02-10T09:45:00',
    loginAttempts: 0,
    passwordHash: 'hashed_password_001',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
    userName: 'lucas.santos',
    createdBy: 'USER-ADMIN',
    // Observações (BasePerson)
    internalNotes: 'Funcionário exemplar, com excelente desempenho.',
    // Metadados (BaseEntity)
    createdAt: '2022-03-10T10:00:00',
    updatedAt: '2025-01-20T11:30:00',
    changeHistory: []
  },
  {
    id: 'USER-002',
    // Dados pessoais (BasePerson)
    fullName: 'Mariana Silva Fernandes Lima',
    cpfCnpj: '987.654.321-00',
    phone: '+55 84 98888-4567',
    email: 'mariana.silva@hotmail.com',
    corporateEmail: 'mariana.silva@movix.com',
    // Endereço (BasePerson)
    fullAddress: 'Av. Senador Salgado Filho, 1234, Lagoa Nova',
    zipCode: '59075-000',
    city: 'Natal',
    state: 'RN',
    // Dados organizacionais (BasePerson)
    admissionDate: '2023-01-05',
    status: 'Ativo',
    // Dados específicos User
    position: 'Analista Financeiro',
    department: 'Financeiro',
    accessProfile: 'Finanças',
    specificPermissions: ['VIEW_INVOICES', 'EXPORT_REPORTS'],
    lastAccess: '2025-02-09T16:20:00',
    loginAttempts: 1,
    passwordHash: 'hashed_password_002',
    profilePhoto: 'https://i.pravatar.cc/150?img=32',
    userName: 'mariana.silva',
    createdBy: 'USER-ADMIN',
    // Observações (BasePerson)
    internalNotes: 'Responsável por análises de custos e relatórios.',
    // Metadados (BaseEntity)
    createdAt: '2023-01-05T14:00:00',
    updatedAt: '2024-12-18T09:10:00',
    changeHistory: []
  },
  {
    id: 'USER-003',
    // Dados pessoais (BasePerson)
    fullName: 'Rafael Costa da Silva Lopes',
    cpfCnpj: '456.789.123-00',
    phone: '+55 81 97777-0001',
    email: 'rafael.costa@outlook.com',
    corporateEmail: 'rafael.costa@movix.com',
    // Endereço (BasePerson)
    fullAddress: 'Rua do Príncipe, 567, Boa Vista',
    zipCode: '50050-900',
    city: 'Recife',
    state: 'PE',
    // Dados organizacionais (BasePerson)
    admissionDate: '2021-07-20',
    status: 'Inativo',
    // Dados específicos User
    position: 'Agente de Suporte ao Cliente',
    department: 'Suporte',
    accessProfile: 'Operador',
    specificPermissions: ['CREATE_TICKET', 'EDIT_TICKET'],
    lastAccess: '2024-12-15T13:05:00',
    loginAttempts: 0,
    passwordHash: 'hashed_password_003',
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
    userName: 'rafael.costa',
    createdBy: 'USER-ADMIN',
    // Observações (BasePerson)
    internalNotes: 'Desligado em dezembro de 2024.',
    // Metadados (BaseEntity)
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
    // Dados pessoais (BasePerson)
    fullName: 'Ana Beatriz Rocha Vieira',
    cpfCnpj: '321.654.987-00',
    phone: '+55 85 96666-7890',
    email: 'ana.rocha@gmail.com',
    corporateEmail: 'ana.rocha@movix.com',
    // Endereço (BasePerson)
    fullAddress: 'Av. Beira Mar, 890, Meireles',
    zipCode: '60165-121',
    city: 'Fortaleza',
    state: 'CE',
    // Dados organizacionais (BasePerson)
    admissionDate: '2020-02-01',
    status: 'Suspenso',
    // Dados específicos User
    position: 'Administradora de Sistemas',
    department: 'TI',
    accessProfile: 'Administrador',
    specificPermissions: ['FULL_ACCESS'],
    lastAccess: '2024-11-10T18:00:00',
    loginAttempts: 5,
    passwordHash: 'hashed_password_004',
    profilePhoto: 'https://i.pravatar.cc/150?img=44',
    userName: 'ana.rocha',
    createdBy: 'SYSTEM',
    // Observações (BasePerson)
    internalNotes: 'Conta suspensa por múltiplas tentativas de login falhadas.',
    // Metadados (BaseEntity)
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
interface GetUserColumnsParams {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onPermissions: (user: User) => void;
}

const getUsersColumns = ({
  onView,
  onEdit,
  onDelete,
  onPermissions
}: GetUserColumnsParams): ColumnDefinition<User>[] => [
    ...userSchema.tableColumns,
    {
    key: 'specificPermissions',
    header: 'PERMISSÕES',
    align: 'center',
    type: 'actions',
    render: (value: unknown, row: User) => {
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
    align: 'center',
    render: (value: unknown) => {
      const status = value as UserStatus;
      const variant = userStatusClasses[status] ?? 'default';
      return <TableBadge value={status} variant={variant} />;
    }
  },
  {
    key: 'lastAccess',
    header: 'ÚLTIMO ACESSO',
    type: 'fixed-short',
    render: (value: unknown) => {
      if (!value) return '-';
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
    render: (_: unknown, row: User) => (
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

  // Hook tipado com User
  const crud = useEntityCRUD<User>();

  // Estado do modal de permissões (separado porque é customizado)
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [permissionsUser, setPermissionsUser] = useState<User | null>(null);

  // Handler do FORMULÁRIO (Create/Edit)
  const handleSubmit = async (data: Partial<User>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity) {
        // TODO: Implementar chamada API
        // await updateUser(data);
        console.log('Atualizando usuário:', data);

        // Atualiza estado local
        setUsers(prevUsers => prevUsers.map(u =>
          u.id === crud.selectedEntity!.id
            ? { ...u, ...data, updatedAt: new Date().toISOString() } // ← CORRIGIDO: updatedAt
            : u
        ));
      } else {
        // TODO: Implementar chamada API
        // const newUser = await createUser(data);
        const newUser: User = {
          ...data,
          id: `USER-${Date.now()}`,
          specificPermissions: [],
          loginAttempts: 0,
          lastAccess: new Date().toISOString(),
          profilePhoto: undefined,
          userName: data.email?.split('@')[0] || 'new_user',
          status: 'Ativo',
          createdBy: 'CURRENT_USER',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          changeHistory: [],
          passwordHash: data.passwordHash || 'temp_hash'
        } as User;

        console.log('Criando novo usuário:', newUser);
        setUsers(prevUsers => [...prevUsers, newUser]);
      }

      crud.setIsFormOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  // Handler de DELETE
  const handleDelete = async () => {
    if (!crud.selectedEntity) return;

    crud.setIsLoading(true);
    try {
      // TODO: Implementar chamada API
      // await deleteUser(selectedUser.id);
      console.log('Deletando usuário:', crud.selectedEntity.id); // ← CORRIGIDO: typo

      // Atualiza estado local
      setUsers(prevUsers => prevUsers.filter(u => u.id !== crud.selectedEntity!.id));
      crud.setIsDeleteOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  // Handler para abrir modal de PERMISSÕES
  const handlePermissions = (user: User) => { // ← CORRIGIDO: recebe o user
    setPermissionsUser(user);
    setIsPermissionsOpen(true);
  };

  // Handler para SALVAR permissões
  const handleSavePermissions = async (permissions: string[]) => {
    if (!permissionsUser) return; // ← CORRIGIDO: usa permissionsUser

    crud.setIsLoading(true);
    try {
      // TODO: Implementar chamada API
      // await updateUserPermissions(permissionsUser.id, permissions);
      console.log('Salvando permissões:', {
        userId: permissionsUser.id,
        permissions
      });

      // Atualiza estado local
      setUsers(prevUsers => prevUsers.map(u =>
        u.id === permissionsUser.id
          ? { ...u, specificPermissions: permissions, updatedAt: new Date().toISOString() }
          : u
      ));

      setIsPermissionsOpen(false);
      setPermissionsUser(null);
    } catch (error) {
      console.error('Erro ao salvar permissões:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const usersColumns = getUsersColumns({
    onView: crud.handleView,
    onEdit: crud.handleEdit,
    onDelete: crud.handleDeleteClick,
    onPermissions: handlePermissions
  });

  return (
    <div className={Styles.usersContainer}>
      <PageHeader
        title="Equipe Interna"
        description="Gerencie os membros da equipe e suas permissões."
        buttonIcon={<i className="bi bi-plus-lg"></i>}
        buttonText="Adicionar Membro"
        onButtonClick={crud.handleCreate}
      />

      <Table data={users} columns={usersColumns} />

      {/* Modal de Formulário (Create/Edit) */}
      <ModalForm
        isOpen={crud.isFormOpen}
        onClose={() => {
          crud.setIsFormOpen(false);
          crud.setSelectedEntity(null);
        }}
        title={crud.isEdit ? 'Editar Usuário' : 'Novo Usuário'}
        subtitle={crud.isEdit ? crud.selectedEntity?.fullName : undefined}
        size="lg"
      >
        <EntityGenericForm<User>
          schema={userSchema}
          key={crud.selectedEntity?.id || 'new'}
          initialData={crud.selectedEntity}
          onSubmit={handleSubmit}
          onCancel={() => {
            crud.setIsFormOpen(false);
            crud.setSelectedEntity(null);
          }}
          isEdit={crud.isEdit}
          isLoading={crud.isLoading}
        />
      </ModalForm>

      {/* Modal de Detalhes (View) */}
      <ModalDetails
        isOpen={crud.isDetailsOpen}
        onClose={() => {
          crud.setIsDetailsOpen(false);
          crud.setSelectedEntity(null);
        }}
        title="Detalhes do Usuário"
        subtitle={crud.selectedEntity?.fullName}
        size="lg"
        onEdit={() => {
          crud.setIsDetailsOpen(false);
          if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
        }}
      >
        {crud.selectedEntity && (
          <EntityDetailsContent<User>
            schema={userSchema}
            entity={crud.selectedEntity}
          />
        )}
      </ModalDetails>

      {/* Modal de Permissões (Customizado) */}
      <ModalForm
        isOpen={isPermissionsOpen}
        onClose={() => {
          setIsPermissionsOpen(false);
          setPermissionsUser(null);
        }}
        title="Gerenciar Permissões"
        subtitle={permissionsUser?.fullName}
        size="lg"
      >
        {permissionsUser && (
          <UserPermissionsModal
            userName={permissionsUser.fullName}
            currentPermissions={permissionsUser.specificPermissions}
            onSave={handleSavePermissions}
            onCancel={() => {
              setIsPermissionsOpen(false);
              setPermissionsUser(null);
            }}
            isLoading={crud.isLoading}
          />
        )}
      </ModalForm>

      {/* Modal de Confirmação (Delete) */}
      <ModalConfirm
        isOpen={crud.isDeleteOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          crud.setIsDeleteOpen(false);
          crud.setSelectedEntity(null);
        }}
        title="Deletar Usuário"
        message={`Tem certeza que deseja deletar o usuário "${crud.selectedEntity?.fullName}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, deletar"
        cancelLabel="Cancelar"
        variant="danger"
        isLoading={crud.isLoading}
      />
    </div>
  );
};