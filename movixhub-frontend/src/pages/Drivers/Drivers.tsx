import { useState } from 'react';
import Styles from './Drivers.module.css';
import { driverSchema, type Driver, type DriverStatus } from '../../components/features/drivers';
import { Table, TableActions, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';


const driverStatusClasses: Record<DriverStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Férias': 'warning',
  'Suspenso': 'error',
};

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
    status: 'Ativo',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
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
    driverLinkType: 'Parceiro',
    status: 'Ativo',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
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
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
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
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
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

interface GetDriverColumnsParams {
  onView: (driver: Driver) => void;
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
}

const getDriverColumns = ({ onView, onEdit, onDelete }: GetDriverColumnsParams): ColumnDefinition<Driver>[] => [
  ...driverSchema.tableColumns,
  {
    key: 'status',
    header: 'STATUS',
    align: 'center',
    type: 'badge',
    render: (value: unknown) => {
      const status = value as DriverStatus;
      const variant = driverStatusClasses[status] ?? 'default';
      return <TableBadge value={status} variant={variant} />;
    }
  } as ColumnDefinition<Driver>,
  {
    key: 'averageRating',
    header: 'AVALIAÇÃO',
    type: 'fixed-short',
    render: (_: unknown, row: Driver) => {
      return <span>{row.averageRating} <i className="bi bi-star"></i></span>
    }
  } as ColumnDefinition<Driver>,
  {
    key: 'custom',
    header: 'AÇÕES',
    align: 'center',
    type: 'actions',
    render: (_: unknown, row: Driver) => (
      <TableActions
        onView={() => onView(row)}
        onEdit={() => onEdit(row)}
        onDelete={() => onDelete(row)}
      />
    )
  } as ColumnDefinition<Driver>
];

export const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDriversData);

  // Hook tipado com Driver
  const crud = useEntityCRUD<Driver>();

  const handleSubmit = async (data: Partial<Driver>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit) {
        // TODO: Implementar chamada API
        // await updateDriver(data);

        console.log('Atualizando motorista:', data);

        // Atualiza estado local
        setDrivers(prev => prev.map(d =>
          d.id === data.id 
          ? { ...d, ...data, updatedAt: new Date().toISOString() } 
          : d
        ));
      } else {
        const newDriver: Driver = {
          id: `DRV-${Date.now()}`,
          ...data,
          averageRating: 0,
          totalDeliveries: 0,
          internalScore: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Driver;
        console.log('Criando motorista:', newDriver);
        setDrivers(prev => [...prev, newDriver]);
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
      setDrivers(prev => prev.filter(d => d.id !== crud.selectedEntity!.id));
      crud.setIsDeleteOpen(false);
    } catch (error) {
      console.error('Erro ao deletar Motorista:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const columns = getDriverColumns({
    onView: crud.handleView,
    onEdit: crud.handleEdit,
    onDelete: crud.handleDeleteClick
  });

  return (
    <div className={Styles.driversContainer}>
      <PageHeader
        title="Motoristas"
        description="Gerencie os motoristas cadastrados"
        buttonIcon={<i className="bi bi-plus-lg"></i>}
        buttonText="Novo Motorista"
        onButtonClick={crud.handleCreate}
      />

      <Table data={drivers} columns={columns} />

      {/* Modal de Formulário (Create/Edit) */}
      <ModalForm
        isOpen={crud.isFormOpen}
        onClose={() => crud.setIsFormOpen(false)}
        title={crud.isEdit ? 'Editar Motorista' : 'Novo Motorista'}
        subtitle={crud.isEdit ? crud.selectedEntity?.fullName : undefined}
        size="lg"
      >
        <EntityGenericForm<Driver>
          schema={driverSchema}
          key={crud.selectedEntity?.id || 'new'}
          initialData={crud.selectedEntity}
          onSubmit={handleSubmit}
          onCancel={() => crud.setIsFormOpen(false)}
          isEdit={crud.isEdit}
          isLoading={crud.isLoading}
        />
      </ModalForm>

      {/* Modal de Detalhes */}
      <ModalDetails
        isOpen={crud.isDetailsOpen}
        onClose={() => crud.setIsDetailsOpen(false)}
        title="Detalhes do Motorista"
        subtitle={crud.selectedEntity?.fullName}
        onEdit={() => {
          crud.setIsDetailsOpen(false);
          if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
        }}
      >
        {crud.selectedEntity && (
          <EntityDetailsContent<Driver>
            schema={driverSchema}
            entity={crud.selectedEntity}
          />
        )}
      </ModalDetails>

      {/* Modal de Confirmação */}
      <ModalConfirm
        isOpen={crud.isDeleteOpen}
        onConfirm={handleDelete}
        onCancel={() => crud.setIsDeleteOpen(false)}
        title="Deletar Motorista"
        message={`Tem certeza que deseja deletar "${crud.selectedEntity?.fullName}"?`}
        variant="danger"
        isLoading={crud.isLoading}
      />
    </div>
  );
};