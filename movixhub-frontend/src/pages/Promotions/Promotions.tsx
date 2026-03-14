import { useState, useEffect } from 'react';
import Styles from './Promotions.module.css'; // Ajuste o nome do arquivo CSS
import {
    Table,
    TableBadge,
    TableActions,
    type ColumnDefinition,
    type TableBadgeProps
} from '../../components/common/Table';
import { useEntityCRUD } from '../../hooks/useEntityCRUD';
import { PageHeader } from '../../components/common/Layout';
import { ModalConfirm, ModalDetails, ModalForm } from '../../components/common/Modal';
import { EntityDetailsContent, EntityGenericForm } from '../../components/common/EntityCRUD';
import type { Promotion, PromotionStatus } from '../../types/promotion.types';
import { promotionSchema } from '../../components/features/promotions/promotionSchema';
import * as promotionService from '../../services/promotionService';

const promotionsStatusClasses: Record<PromotionStatus, TableBadgeProps["variant"]> = {
    'Agendada': 'default',
    'Ativa': 'success',
    'Pausada': 'warning',
    'Expirada': 'info',
    'Cancelada': 'error',
};

// Função auxiliar para criar colunas
interface GetPromotionColumnsParams {
    onView: (promotion: Promotion) => void;
    onEdit: (promotion: Promotion) => void;
    onDelete: (promotion: Promotion) => void;
}

const getPromotionColumns = ({
    onView,
    onEdit,
    onDelete
}: GetPromotionColumnsParams): ColumnDefinition<Promotion>[] => [
    ...promotionSchema.tableColumns,
    {
        key: 'status',
        header: 'STATUS',
        type: 'badge',
        align: 'center',
        render: (value: unknown) => {
            const status = value as PromotionStatus;
            const variant = promotionsStatusClasses[status] ?? 'default';
            return <TableBadge value={status} variant={variant} />;
        }
    },
    {
        key: 'startDate',
        header: 'INÍCIO',
        type: 'fixed-short',
        render: (value: unknown) => {
            if (!value) return '-';
            return new Date(value as string).toLocaleDateString('pt-BR');
        }
    },
    {
        key: 'endDate',
        header: 'TÉRMINO',
        type: 'fixed-short',
        render: (value: unknown) => {
            if (!value) return <span className={Styles.noEndDate}>Sem Término</span>;
            return new Date(value as string).toLocaleDateString('pt-BR');
        }
    },
    {
        key: 'custom',
        header: 'AÇÕES',
        align: 'center',
        type: 'actions',
        render: (_: unknown, row: Promotion) => (
            <TableActions
                onView={() => onView(row)}
                onEdit={() => onEdit(row)}
                onDelete={() => onDelete(row)}
            />
        )
    }
];

export const Promotions = () => {
    // Estado dos dados
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    // Carrega promoções do backend
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await promotionService.getPromotions();
                if (mounted) setPromotions(data);
            } catch (error) {
                console.error('Erro ao buscar promoções:', error);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    // Hook tipado com Promotion
    const crud = useEntityCRUD<Promotion>();

    // Handler do FORMULÁRIO (Create/Edit)
    const handleSubmit = async (data: Partial<Promotion>) => {
        crud.setIsLoading(true);
        try {
            if (crud.isEdit && crud.selectedEntity) {
                // Lógica de Atualização (Update)
                const updated = await promotionService.updatePromotion(crud.selectedEntity.id, data);
                setPromotions(prevPromotions => prevPromotions.map(p => p.id === updated.id ? updated : p));
            } else {
                // Lógica de Criação (Create)
                const created = await promotionService.createPromotion(data);
                setPromotions(prevPromotions => [...prevPromotions, created]);
            }

            crud.setIsFormOpen(false);
            crud.setSelectedEntity(null);
        } catch (error) {
            console.error('Erro ao salvar Promoção:', error);
        } finally {
            crud.setIsLoading(false);
        }
    };

    // Handler de DELETE
    const handleDelete = async () => {
        if (!crud.selectedEntity) return;

        crud.setIsLoading(true);
        try {
            const id = crud.selectedEntity.id;
            await promotionService.deletePromotion(id);
            setPromotions(prevPromotions => prevPromotions.filter(p => p.id !== id));
            crud.setIsDeleteOpen(false);
            crud.setSelectedEntity(null);
        } catch (error) {
            console.error('Erro ao deletar Promoção:', error);
        } finally {
            crud.setIsLoading(false);
        }
    };


    const columns = getPromotionColumns({
        onView: crud.handleView,
        onEdit: crud.handleEdit,
        onDelete: crud.handleDeleteClick,
    });

    return (
        <div className={Styles.promotionsContainer}>
            <PageHeader
                title="Promoções"
                description="Gerencie e acompanhe as promoções ativas e futuras."
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Nova Promoção"
                onButtonClick={crud.handleCreate}
            />

            <Table data={promotions} columns={columns} />

            {/* Modal de Formulário (Create/Edit) */}
            <ModalForm
                isOpen={crud.isFormOpen}
                onClose={() => {
                    crud.setIsFormOpen(false);
                    crud.setSelectedEntity(null);
                }}
                title={crud.isEdit ? 'Editar Promoção' : 'Nova Promoção'}
                subtitle={crud.isEdit ? crud.selectedEntity?.name : undefined}
                size="lg"
            >
                <EntityGenericForm<Promotion>
                    schema={promotionSchema}
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
                title="Detalhes da Promoção"
                subtitle={crud.selectedEntity?.name}
                size="lg"
                onEdit={() => {
                    crud.setIsDetailsOpen(false);
                    if (crud.selectedEntity) crud.handleEdit(crud.selectedEntity);
                }}
            >
                {crud.selectedEntity && (
                    <EntityDetailsContent<Promotion>
                        schema={promotionSchema}
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
                title="Deletar Promoção"
                message={`Tem certeza que deseja deletar a promoção "${crud.selectedEntity?.name}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Sim, deletar"
                cancelLabel="Cancelar"
                variant="danger"
                isLoading={crud.isLoading}
            />
        </div>
    );
};