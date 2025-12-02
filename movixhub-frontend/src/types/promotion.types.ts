import type { BaseEntity } from "./base.types";

export type PromotionStatus = 'Agendada' | 'Ativa' | 'Pausada' | 'Expirada' | 'Cancelada';
export type DiscountType = 'Percentual' | 'Valor Fixo';
export type PromotionType = 'Sem Cupom' | 'Cupom';
export type PromotionTarget = 'Todos' | 'Novos Clientes';

export interface Promotion extends BaseEntity {
    name: string;
    promoCode?: string;
    description: string;
    promotionType: PromotionType;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountAmount?: number; // Valor máximo de desconto (para percentuais)
    minOrderValue?: number; // Valor mínimo do pedido para aplicar promoção
    applicableServices: string[]; // IDs dos serviços
    target: PromotionTarget;
    startDate: string;
    endDate?: string | null;
    status: PromotionStatus;
    maxUses?: number;
    usedCount: number;
    autoApply: boolean; // Se a promoção é aplicada automaticamente
    priority: number; // Prioridade na aplicação
    eligibilityRule: string;
    createdBy: string;
    isStackable: boolean; // Se pode ser combinada com outras promoções
}