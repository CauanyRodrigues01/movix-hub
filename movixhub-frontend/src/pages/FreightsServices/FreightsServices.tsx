import { useState } from 'react';
import Styles from './FreightServices.module.css';
import { Table, TableActions, TableArrayRenderer, TableBadge, type ColumnDefinition, type TableBadgeProps } from '../../components/common/Table';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { AllowedVehicle, CoverageArea, FreightService, ServiceInternalStatus } from '../../types/freight.types'; 
import { freightServiceSchema } from '../../components/features/freightService';

// Mapeamento de status para variantes de badge
const freightStatusClasses: Record<ServiceInternalStatus, TableBadgeProps["variant"]> = {
  'Ativo': 'success',
  'Inativo': 'info',
  'Manutencao': 'warning',
  'Indisponível': 'error',
};

// Dados Mock
const mockFreightServicesData: FreightService[] = [
  {
    id: 'FSERVICE-001',
    name: 'Entrega Rápida Local',
    internalCode: 'RPL-LOC',
    description: 'Serviço de entrega prioritária para o perímetro municipal.',
    averagePrice: 25.50,
    status: 'Ativo',
    coverage: ['Municipal'],
    allowedVehicles: ['Motocicleta', 'Carro'],
    averageTime: '3 horas',
    detailedCoverageArea: 'Todas as Zonas Urbanas',
    activePromotions: ['PROMO-VERAO'],
    createdBy: 'USER-ADMIN',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2025-01-20T11:30:00',
    changeHistory: []
  },
  {
    id: 'FSERVICE-002',
    name: 'Transporte Inter-regional',
    internalCode: 'TRI-REG',
    description: 'Transporte de cargas médias entre estados vizinhos.',
    averagePrice: 180.00,
    status: 'Manutencao',
    coverage: ['Interestadual'],
    allowedVehicles: ['Van', 'Caminhão Toco'],
    averageTime: '4 dias úteis',
    detailedCoverageArea: 'Regiões Sul e Sudeste',
    activePromotions: [],
    createdBy: 'USER-ADMIN',
    createdAt: '2023-05-15T14:00:00',
    updatedAt: '2025-02-18T09:10:00',
    changeHistory: [
        { date: '2025-02-18T09:10:00', changedBy: 'OP_MANAGER', field: 'status', oldValue: 'Ativo', newValue: 'Manutencao' }
    ]
  },
];

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
  // Estado dos dados
  const [freights, setFreights] = useState<FreightService[]>(mockFreightServicesData);

  // Hook tipado com FreightService
  const crud = useEntityCRUD<FreightService>();

  // Handler do FORMULÁRIO (Create/Edit)
  const handleSubmit = async (data: Partial<FreightService>) => {
    crud.setIsLoading(true);
    try {
      if (crud.isEdit && crud.selectedEntity) {
        // Lógica de Atualização (Update)
        console.log('Atualizando Serviço de Frete:', data);

        setFreights(prevFreights => prevFreights.map(f =>
          f.id === crud.selectedEntity!.id
            ? { ...f, ...data, updatedAt: new Date().toISOString() }
            : f
        ));
      } else {
        // Lógica de Criação (Create)
        const newFreight: FreightService = {
          ...data,
          id: `FSERVICE-${Date.now()}`,
          status: data.status as ServiceInternalStatus || 'Ativo',
          coverage: (data.coverage as string[] || []) as FreightService['coverage'],
          allowedVehicles: (data.allowedVehicles as string[] || []) as FreightService['allowedVehicles'],
          activePromotions: (data.activePromotions as string[] || []),
          internalCode: data.internalCode || 'N/A',
          averagePrice: data.averagePrice || 0,
          averageTime: data.averageTime || 'A definir',
          detailedCoverageArea: data.detailedCoverageArea || 'N/A',
          createdBy: 'CURRENT_USER',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          changeHistory: [],
        } as FreightService;

        console.log('Criando novo Serviço de Frete:', newFreight);
        setFreights(prevFreights => [...prevFreights, newFreight]);
      }

      crud.setIsFormOpen(false);
      crud.setSelectedEntity(null);
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
      // Lógica de Deleção (Delete)
      console.log('Deletando Serviço de Frete:', crud.selectedEntity.id);

      setFreights(prevFreights => prevFreights.filter(f => f.id !== crud.selectedEntity!.id));
      crud.setIsDeleteOpen(false);
      crud.setSelectedEntity(null);
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

      <Table data={freights} columns={columns} />

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