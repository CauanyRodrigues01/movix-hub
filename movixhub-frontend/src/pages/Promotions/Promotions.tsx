import { useState } from 'react';
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
import type { DiscountType, Promotion, PromotionStatus, PromotionTarget, PromotionType } from '../../types/promotion.types';
import { promotionSchema } from '../../components/features/promotions/promotionSchema';

const promotionsStatusClasses: Record<PromotionStatus, TableBadgeProps["variant"]> = {
    'Agendada': 'default',
    'Ativa': 'success',
    'Pausada': 'warning',
    'Expirada': 'info',
    'Cancelada': 'error',
};

const mockPromotionsData: Promotion[] = [
    {
        id: 'PROMO-001',
        name: 'Desconto Primeira Viagem',
        promoCode: 'MOVIX10',
        description: '10% de desconto para novos clientes na primeira contratação.',
        promotionType: 'Cupom',
        discountType: 'Percentual',
        discountValue: 10,
        applicableServices: ['1', '3'],
        target: 'Novos Clientes', 
        startDate: '2025-01-01T00:00:00',
        endDate: null,
        status: 'Ativa',
        maxUses: 1000,
        usedCount: 245,
        autoApply: false,
        priority: 1,
        eligibilityRule: 'Somente para novos clientes',
        createdBy: 'Admin', 
        isStackable: false, 
        createdAt: '2024-12-15T14:20:00',
        updatedAt: '2025-01-10T09:00:00',
        changeHistory: []
    },
    {
        id: 'PROMO-002',
        name: 'Frete Econômico',
        promoCode: 'FRETE20',
        description: 'R$20 de desconto para serviços do tipo Normal.',
        promotionType: 'Cupom', 
        discountType: 'Valor Fixo',
        discountValue: 20,
        applicableServices: ['4'],
        target: 'Todos', 
        startDate: '2025-02-01T00:00:00',
        endDate: '2025-03-01T23:59:59',
        status: 'Agendada',
        maxUses: 500,
        usedCount: 0,
        autoApply: true,
        priority: 2,
        eligibilityRule: 'Válido para todos os usuários',
        createdBy: 'Admin', 
        isStackable: false,
        createdAt: '2025-01-20T11:00:00',
        updatedAt: '2025-01-20T11:00:00',
        changeHistory: []
    },
    {
        id: 'PROMO-003',
        name: 'Inverno Movix',
        promoCode: 'WINTER15',
        description: 'Desconto especial de inverno para cargas pesadas.',
        promotionType: 'Sem Cupom', 
        discountType: 'Percentual',
        discountValue: 15,
        applicableServices: ['2', '5'],
        target: 'Todos', 
        startDate: '2024-06-01T00:00:00',
        endDate: '2024-08-30T23:59:59',
        status: 'Expirada',
        maxUses: 300,
        usedCount: 300,
        autoApply: true,
        priority: 3,
        eligibilityRule: 'Aplicável para qualquer cliente',
        createdBy: 'Admin', 
        isStackable: true, 
        createdAt: '2024-05-10T08:30:00',
        updatedAt: '2024-09-01T10:10:00',
        changeHistory: []
    },
];


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
    const [promotions, setPromotions] = useState<Promotion[]>(mockPromotionsData);

    // Hook tipado com Promotion
    const crud = useEntityCRUD<Promotion>();

    // Handler do FORMULÁRIO (Create/Edit)
    const handleSubmit = async (data: Partial<Promotion>) => {
        crud.setIsLoading(true);
        try {
            if (crud.isEdit && crud.selectedEntity) {
                // Lógica de Atualização (Update)
                console.log('Atualizando Promoção:', data);

                setPromotions(prevPromotions => prevPromotions.map(p =>
                    p.id === crud.selectedEntity!.id
                        ? { ...p, ...data, updatedAt: new Date().toISOString() }
                        : p
                ));
            } else {
                // Lógica de Criação (Create)
                const newPromotion: Promotion = {
                    ...data,
                    id: `PROMO-${Date.now()}`,
                    status: data.status as PromotionStatus || 'Agendada',
                    discountValue: data.discountValue || 0,
                    promotionType: data.promotionType as PromotionType || 'Cupom',
                    discountType: data.discountType as DiscountType || 'Percentual',
                    target: data.target as PromotionTarget || 'Todos',
                    startDate: data.startDate || new Date().toISOString(),
                    applicableServices: data.applicableServices as string[] || [],
                    usedCount: 0,
                    autoApply: data.autoApply ?? false,
                    isStackable: data.isStackable ?? false,
                    priority: data.priority ?? 10,
                    eligibilityRule: data.eligibilityRule || 'Nenhuma regra especificada',
                    createdBy: 'CURRENT_USER',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    changeHistory: [],
                } as Promotion;

                console.log('Criando nova Promoção:', newPromotion);
                setPromotions(prevPromotions => [...prevPromotions, newPromotion]);
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
            // Lógica de Deleção (Delete)
            console.log('Deletando Promoção:', crud.selectedEntity.id);

            setPromotions(prevPromotions => prevPromotions.filter(p => p.id !== crud.selectedEntity!.id));
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