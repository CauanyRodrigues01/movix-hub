import Styles from './Clients.module.css';
import {
  Table,
  TableBadge,
  TableActions,
  type ColumnDefinition,
  type TableBadgeProps
} from '../../components/common/Table';

import { PageHeader } from '../../components/common/Layout';
import type { ClientStatus, Client } from '../../types';
import { clientSchema } from '../../components/features/clients';
import { useState } from 'react';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';

const clientStatusClasses: Record<ClientStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'warning',
  'Bloqueado': 'error'
};

const mockClientsData: Client[] = [
  {
    id: 'CLI-0001',
    createdAt: '2024-08-10T09:30:00',
    updatedAt: '2025-01-15T10:20:00',

    fullName: 'Maria Eduarda Santos',
    cpfCnpj: '123.456.789-00',
    phone: '(83) 98877-4455',
    email: 'maria.santos@gmail.com',

    // Endereço
    fullAddress: 'Rua das Flores, 320, Centro',
    zipCode: '58400-123',
    city: 'Campina Grande',
    state: 'PB',

    // Status (CLIENTE)
    status: 'Ativo',

    // Data de registro
    registrationDate: '2024-08-10T09:30:00',

    // Notas
    internalNotes: 'Cliente pontual e costuma solicitar fretes pequenos.',

    // Campos específicos de CLIENT
    clientType: 'Pessoa Física',

    classification: 'Regular',
    lastServiceDate: '2025-01-15',
    totalServices: 5,

    changeHistory: [
      {
        date: '2025-01-15T10:20:00',
        changedBy: 'USER-002',
        field: 'totalServices',
        oldValue: 4,
        newValue: 5,
      }
    ]
  },

  {
    id: 'CLI-0002',
    createdAt: '2024-05-02T14:00:00',
    updatedAt: '2025-02-01T16:45:00',

    fullName: 'Construtora Horizonte LTDA',
    cpfCnpj: '45.678.912/0001-90',
    phone: '(84) 3344-5566',
    email: 'contato@horizonte.com.br',

    // Endereço
    fullAddress: 'Av. Principal, 1500, Distrito Industrial',
    zipCode: '59000-200',
    city: 'Natal',
    state: 'RN',

    status: 'Ativo',
    registrationDate: '2024-05-02T14:00:00',

    internalNotes: 'Empresa com contratos mensais recorrentes para transporte de materiais.',

    // Campos específicos
    clientType: 'Pessoa Jurídica',

    classification: 'Bronze',
    lastServiceDate: '2025-02-01',
    totalServices: 22,

    changeHistory: [
      {
        date: '2024-12-10T11:00:00',
        changedBy: 'USER-001',
        field: 'classification',
        oldValue: 'Regular',
        newValue: 'Bronze'
      }
    ]
  },

  {
    id: 'CLI-0003',
    createdAt: '2025-02-05T08:10:00',
    updatedAt: '2025-02-05T08:10:00',

    fullName: 'João Pedro Azevedo',
    cpfCnpj: '987.654.321-00',
    phone: '(85) 97766-5544',
    email: 'joaopedro@gmail.com',

    fullAddress: 'Rua Projetada, 85, Bairro Novo',
    zipCode: '60000-340',
    city: 'Fortaleza',
    state: 'CE',

    status: 'Inativo',
    registrationDate: '2025-02-05T08:10:00',

    internalNotes: 'Cadastro recente, aguardando verificação de documentos.',

    clientType: 'Pessoa Física',

    classification: 'Ouro',
    lastServiceDate: null,
    totalServices: 0,

    changeHistory: []
  }
];

interface GetClientColumnsParams {
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

const getClientColumns = ({ onView, onEdit, onDelete }: GetClientColumnsParams): ColumnDefinition<Client>[] => [
  ...clientSchema.tableColumns,
  {
    key: 'status',
    header: 'STATUS',
    align: 'center',
    type: 'badge',
    render: (value) => {
      const status = value as ClientStatus;
      const variant = clientStatusClasses[status] ?? 'default';
      return <TableBadge value={status} variant={variant} />;
    }
  } as ColumnDefinition<Client>,
  {
    key: 'custom',
    header: 'AÇÕES',
    align: 'center',
    type: 'actions',
    render: (_: unknown, row: Client) => <TableActions
        onView={() => onView(row)}
        onEdit={() => onEdit(row)}
        onDelete={() => onDelete(row)}
    />
  }
];


export const Clients = () => {
  const [clients, setClients] = useState<Client[]>(mockClientsData);

  // Hook tipado com Client
  const crud = useEntityCRUD<Client>();

  const handleSubmit = async (data: Partial<Client>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity) {
        // TODO: Implementar chamada API
        // await updateClient(data);

        console.log('Atualizando motorista:', data);

        // Atualiza estado local
        setClients(prev => prev.map(d =>
          d.id === crud.selectedEntity!.id
            ? { ...d, ...data, updatedAt: new Date().toISOString() }
            : d
        ));
      } else {
        const newClient: Client = {
          ...data,
          id: `CLT-${Date.now()}`,
          changeHistory: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Client;
        console.log('Criando motorista:', newClient);
        setClients(prev => [...prev, newClient]);
      }
      crud.setIsFormOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao salvar Motorista:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!crud.selectedEntity) return;
    crud.setIsLoading(true);
    try {
      console.log('Deletando motorista:', crud.selectedEntity.id);
      setClients(prev => prev.filter(d => d.id !== crud.selectedEntity!.id));
      crud.setIsDeleteOpen(false);
      crud.setSelectedEntity(null);
    } catch (error) {
      console.error('Erro ao deletar Motorista:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const columns = getClientColumns({
    onView: crud.handleView,
    onEdit: crud.handleEdit,
    onDelete: crud.handleDeleteClick
  });

  return (
    <div className={Styles.clientsContainer}>
      <PageHeader
        title="Clientes Movix"
        description="Gerencie e acompanhe os clientes da Movix."
      />

      <Table data={clients} columns={columns} />

      {/* Modal de Formulário */}
      <ModalForm
        isOpen={crud.isFormOpen}
        onClose={() => {
          crud.setIsFormOpen(false);
          crud.setSelectedEntity(null);
        }}
        title={crud.isEdit ? 'Editar Motorista' : 'Novo Motorista'}
        subtitle={crud.isEdit ? crud.selectedEntity?.fullName : undefined}
        size="lg"
      >
        <EntityGenericForm<Client>
          schema={clientSchema}
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

      {/* Modal de Detalhes */}
      <ModalDetails
        isOpen={crud.isDetailsOpen}
        onClose={() => {
          crud.setIsDetailsOpen(false);
          crud.setSelectedEntity(null);
        }}
        title="Detalhes do Motorista"
        subtitle={crud.selectedEntity?.fullName}
        onEdit={() => {
          crud.setIsDetailsOpen(false);
          if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
        }}
      >
        {crud.selectedEntity && (
          <EntityDetailsContent<Client>
            schema={clientSchema}
            entity={crud.selectedEntity}
          />
        )}
      </ModalDetails>

      {/* Modal de Confirmação */}
      <ModalConfirm
        isOpen={crud.isDeleteOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          crud.setIsDeleteOpen(false);
          crud.setSelectedEntity(null);
        }}
        title="Deletar Motorista"
        message={`Tem certeza que deseja deletar "${crud.selectedEntity?.fullName}"?`}
        variant="danger"
        isLoading={crud.isLoading}
      />
    </div>
  );
};