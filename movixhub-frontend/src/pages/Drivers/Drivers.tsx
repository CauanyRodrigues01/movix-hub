/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Styles from './Drivers.module.css';
import { Table, TableActions, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import {  ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import {  EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { Driver, DriverService } from '../../types/driver.types';
import { driverSchema } from '../../components/features/drivers/driverSchema';
import { driverServiceAPI } from '../../services/driverService';

const driverStatusClasses: Record<string, TableBadgeProps["variant"]> = {
  'Active': 'success',
  'Inactive': 'info',
  'Suspended': 'warning',
  'Blocked': 'error',
};

export const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const crud = useEntityCRUD<Driver>();

  // Carregamento inicial via API
  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await driverServiceAPI.getAll();
      setDrivers(data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  const handleSubmit = async (data: Partial<Driver>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity?._id) {
        await driverServiceAPI.update(crud.selectedEntity._id, data);
      } else {
        await driverServiceAPI.create(data);
      }
      await loadDrivers(); // Recarrega do banco para garantir sincronia
      crud.setIsFormOpen(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = async () => {
    if (!crud.selectedEntity?._id) return;
    crud.setIsLoading(true);
    try {
      await driverServiceAPI.remove(crud.selectedEntity._id);
      setDrivers(prev => prev.filter(d => d._id !== crud.selectedEntity!._id));
      crud.setIsDeleteOpen(false);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const columns: ColumnDefinition<Driver>[] = [
    ...driverSchema.tableColumns,
    {
      key: 'status',
      header: 'STATUS',
      align: 'center',
      type: 'badge',
      render: (value: any) => (
        <TableBadge value={value} variant={driverStatusClasses[value] || 'default'} />
      )
    },
    {
      key: 'rating',
      header: 'AVALIAÇÃO',
      type: 'fixed-short',
      align: 'center',
      render: (value: any) => (
        <span>{Number(value || 0).toFixed(1)} <i className="bi bi-star-fill"></i></span>
      )
    },
    {
      key: 'custom',
      header: 'AÇÕES',
      align: 'center',
      type: 'actions',
      render: (_: any, row: Driver) => (
        <TableActions
          onView={() => crud.handleView(row)}
          onEdit={() => crud.handleEdit(row)}
          onDelete={() => crud.handleDeleteClick(row)}
        />
      )
    }
  ];

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

      <ModalForm
        isOpen={crud.isFormOpen}
        onClose={() => crud.setIsFormOpen(false)}
        title={crud.isEdit ? 'Editar Motorista' : 'Novo Motorista'}
        subtitle={crud.isEdit ? crud.selectedEntity?.fullName : undefined}
        size="lg"
      >
        <EntityGenericForm<Driver>
          schema={driverSchema}
          initialData={crud.selectedEntity}
          onSubmit={handleSubmit}
          onCancel={() => crud.setIsFormOpen(false)}
          isEdit={crud.isEdit}
          isLoading={crud.isLoading}
        />
      </ModalForm>

      {/* Modal de Formulário (Create/Edit) */}
            <ModalForm
              isOpen={crud.isFormOpen}
              onClose={() => {
                crud.setIsFormOpen(false);
                crud.setSelectedEntity(null);
              }}
              title={crud.isEdit ? 'Editar Motorista' : 'Novo Motorista'}
              subtitle={crud.isEdit ? crud.selectedEntity?.name : undefined}
              size="lg"
            >
              <EntityGenericForm<DriverService>
                schema={driverSchema}
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
              title="Detalhes do Motorista"
              subtitle={crud.selectedEntity?.name}
              size="lg"
              onEdit={() => {
                crud.setIsDetailsOpen(false);
                if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
              }}
            >
              {crud.selectedEntity && (
                <EntityDetailsContent<DriverService>
                  schema={driverSchema}
                  entity={crud.selectedEntity}
                />
              )}
            </ModalDetails>
      
            {/* Modal de Confirmação (Delete) */}
            <ModalConfirm
              isOpen={crud.isDeleteOpen}
              onConfirm={handleDelete}
              onCancel={() => {
                crud.setIsDeleteOpen(false);
                crud.setSelectedEntity(null);
              }}
              title="Deletar Motorista"
              message={`Tem certeza que deseja deletar o motorista "${crud.selectedEntity?.name}" (Código: ${crud.selectedEntity?.internalCode})? Esta ação não pode ser desfeita.`}
              confirmLabel="Sim, deletar"
              cancelLabel="Cancelar"
              variant="danger"
              isLoading={crud.isLoading}
            />
    </div>
  );
};