// Interface base para todas as entidades
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string; 
}

// Interface para histórico de mudanças
export interface ChangeHistoryEntry {
    date: string;
    changedBy: string;
    field: string;
    oldValue: string | number | boolean;
    newValue: string | number | boolean;
}