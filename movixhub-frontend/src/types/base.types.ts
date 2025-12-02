// Interface base para todas as entidades
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string; 
    changeHistory?: ChangeHistoryEntry[];
    
    // Status (cada entidade terá seu próprio tipo)
    status: string; // UserStatus | DriverStatus | ClientStatus | PromotionStatus | FreightStatus
}

// Interface para histórico de mudanças
export interface ChangeHistoryEntry {
    date: string;
    changedBy: string;
    field: string;
    oldValue: string | number | boolean;
    newValue: string | number | boolean;
}