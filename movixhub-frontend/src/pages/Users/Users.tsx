import { useState, useEffect } from 'react';
import Styles from './Users.module.css';
import { Table, TableActions, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { UserPermissionsModal, userSchema } from '../../components/features/users';
import { Button } from '../../components/common/Button';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { User, UserStatus } from '../../types';
import { userService } from '../../services/userService';

const userStatusClasses: Record<UserStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Bloqueado': 'error',
  'Suspenso': 'warning',
};

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
      const permissions = value as string[] || [];
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
  // Inicializa com lista vazia
  const [users, setUsers] = useState<User[]>([]);

  const crud = useEntityCRUD<User>();
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [permissionsUser, setPermissionsUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      crud.setIsLoading(true);
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Falha ao carregar usuários:', error);
      } finally {
        crud.setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Handler do FORMULÁRIO (Create/Edit)
 const handleSubmit = async (data: Partial<User>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity) {
        const updatedUser = await userService.updateUser(crud.selectedEntity.id, data);
        
        setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
      } else {
        const newUser = await userService.createUser(data);
        
        setUsers(prevUsers => [...prevUsers, newUser]);
      }

      crud.setIsFormOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar os dados. Verifique os campos.'); // Um alerta simples ajuda a debugar
    } finally {
      crud.setIsLoading(false);
    }
  };

  // Handler de DELETE
  const handleDelete = async () => {
    if (!crud.selectedEntity) return;

    crud.setIsLoading(true);
    try {
      // DELETAR (DELETE) no backend
      await userService.deleteUser(crud.selectedEntity.id);

      // Remove da lista na tela
      setUsers(prevUsers => prevUsers.filter(u => u.id !== crud.selectedEntity!.id));
      
      crud.setIsDeleteOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Não foi possível deletar o usuário.');
    } finally {
      crud.setIsLoading(false);
    }
  };

  const handlePermissions = (user: User) => {
    setPermissionsUser(user);
    setIsPermissionsOpen(true);
  };

  const handleSavePermissions = async (permissions: string[]) => {
    if (!permissionsUser) return;
    crud.setIsLoading(true);
    try {
      // TODO: Implementar no próximo passo
      console.log('Salvando permissões:', { userId: permissionsUser.id, permissions });
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
            currentPermissions={permissionsUser.specificPermissions || []}
            onSave={handleSavePermissions}
            onCancel={() => {
              setIsPermissionsOpen(false);
              setPermissionsUser(null);
            }}
            isLoading={crud.isLoading}
          />
        )}
      </ModalForm>

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