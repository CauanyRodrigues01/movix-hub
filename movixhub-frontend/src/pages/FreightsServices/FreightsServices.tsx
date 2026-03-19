import { useState, useEffect } from 'react';
import Styles from './FreightServices.module.css';
import { Table, TableActions, TableArrayRenderer, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { AllowedVehicle, CoverageArea, FreightService, ServiceInternalStatus } from '../../types/freight.types';
import { freightServiceSchema } from '../../components/features/freightService';
import { freightServiceAPI } from '../../services/freightService';

// Mapeamento de status para variantes de badge
const freightStatusClasses: Record<ServiceInternalStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Manutencao': 'warning',
  'Indisponível': 'error',
};

// Função auxiliar para criar colunas
interface GetFreightServiceColumnsParams {
  onView: (service: FreightService) => void;
  onEdit: (service: FreightService) => void;
  onDelete: (service: FreightService) => void;
}

const getFreightServiceColumns = ({
  onView,
  onEdit,
  onDelete
}: GetFreightServiceColumnsParams): ColumnDefinition<FreightService>[] => [
    ...freightServiceSchema.tableColumns,
    {
        key: 'status',
        header: 'STATUS',
        type: 'badge',
        render: (value) => {
            const status = value as ServiceInternalStatus;
            const variant = freightStatusClasses[status] ?? 'default';
            return <TableBadge value={status} variant={variant} />;
        },
    },
    {
        key: 'activePromotions',
        header: 'PROMOÇÕES',
        type: 'medium-text',
        render: (_, row) => {
            if (row.activePromotions.length === 0) return <span className={Styles.noPromotions}>-</span>
            return (
                <TableArrayRenderer
                    items={row.activePromotions}
                />
            )
        }
    },
    {
        key: 'coverage',
        header: 'COBERTURA',
        type: 'medium-text',
        render: (value) => (
            <TableArrayRenderer
                items={value as CoverageArea[]}
                className={Styles.coverages}
            />
        )
    },
    {
        key: 'allowedVehicles',
        header: 'VEÍCULOS',
        type: 'medium-text',
        render: (value) => (
            <TableArrayRenderer
                items={value as AllowedVehicle[]}
                className={Styles.vehicles}
            />
        )
    },
    {
        key: 'averageTime',
        header: 'TEMPO MÉDIO',
        type: 'fixed-short',
        render: (_, row) => {
            if (!row.averageTime) return <span>-</span>;
            return <span>{row.averageTime}</span>;
        }
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_, row) => <TableActions
        onView={() => onView(row)}
        onEdit={() => onEdit(row)}
        onDelete={() => onDelete(row)}
      />
    },
];

export const FreightServices = () => {
  // Estado dos dados e loading da listagem
  const [freights, setFreights] = useState<FreightService[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Hook tipado com FreightService
  const crud = useEntityCRUD<FreightService>();

  // Busca os dados do backend ao montar o componente
  useEffect(() => {
    const fetchFreights = async () => {
      setIsFetchLoading(true);
      setFetchError(null);
      try {
        const data = await freightServiceAPI.getAll();
        setFreights(data);
      } catch (error) {
        console.error('Erro ao carregar serviços de frete:', error);
        setFetchError('Não foi possível carregar os serviços de frete. Verifique a conexão com o servidor.');
      } finally {
        setIsFetchLoading(false);
      }
    };

    fetchFreights();
  }, []);

  // Handler do FORMULÁRIO (Create/Edit)
  const handleSubmit = async (data: Partial<FreightService>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity) {
        // Atualiza via API
        const updated = await freightServiceAPI.update(crud.selectedEntity.id, data);
        setFreights(prev => prev.map(f => f.id === updated.id ? updated : f));
      } else {
        // Cria via API
        const created = await freightServiceAPI.create(data as Parameters<typeof freightServiceAPI.create>[0]);
        setFreights(prev => [...prev, created]);
      }

      crud.closeAll();
    } catch (error) {
      console.error('Erro ao salvar Serviço de Frete:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  // Handler de DELETE
  const handleDelete = async () => {
    if (!crud.selectedEntity) return;

    crud.setIsLoading(true);
    try {
      await freightServiceAPI.remove(crud.selectedEntity.id);
      setFreights(prev => prev.filter(f => f.id !== crud.selectedEntity!.id));
      crud.closeAll();
    } catch (error) {
      console.error('Erro ao deletar Serviço de Frete:', error);
    } finally {
      crud.setIsLoading(false);
    }
  };

  const columns = getFreightServiceColumns({
    onView: crud.handleView,
    onEdit: crud.handleEdit,
    onDelete: crud.handleDeleteClick,
  });

  return (
    <div className={Styles.freightsContainer}>
      <PageHeader
        title="Serviços de Frete"
        description="Gerencie os tipos de serviço de frete oferecidos pela plataforma."
        buttonIcon={<i className="bi bi-plus-lg"></i>}
        buttonText="Novo Serviço"
        onButtonClick={crud.handleCreate}
      />

      {/* Feedback de erro de carregamento */}
      {fetchError && (
        <p className={Styles.errorMessage}>{fetchError}</p>
      )}

      <Table
        data={freights}
        columns={columns}
        isLoading={isFetchLoading}
      />

      {/* Modal de Formulário (Create/Edit) */}
      <ModalForm
        isOpen={crud.isFormOpen}
        onClose={() => {
          crud.setIsFormOpen(false);
          crud.setSelectedEntity(null);
        }}
        title={crud.isEdit ? 'Editar Serviço' : 'Novo Serviço'}
        subtitle={crud.isEdit ? crud.selectedEntity?.name : undefined}
        size="lg"
      >
        <EntityGenericForm<FreightService>
          schema={freightServiceSchema}
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
        title="Detalhes do Serviço"
        subtitle={crud.selectedEntity?.name}
        size="lg"
        onEdit={() => {
          crud.setIsDetailsOpen(false);
          if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
        }}
      >
        {crud.selectedEntity && (
          <EntityDetailsContent<FreightService>
            schema={freightServiceSchema}
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
        title="Deletar Serviço"
        message={`Tem certeza que deseja deletar o serviço "${crud.selectedEntity?.name}" (Código: ${crud.selectedEntity?.internalCode})? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, deletar"
        cancelLabel="Cancelar"
        variant="danger"
        isLoading={crud.isLoading}
      />
    </div>
  );
};