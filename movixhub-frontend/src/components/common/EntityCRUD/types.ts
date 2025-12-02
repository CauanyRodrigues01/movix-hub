import type { ReactNode } from "react";
import type { ColumnDefinition } from "../Table";

// Objeto congelado (as const) que define todos os tipos de campos que um formulário pode ter.
// Funciona como um enum
export const FieldType = {
    Text: 'text',
    Email: 'email',
    Tel: 'tel',
    Password: 'password',
    Date: 'date',
    Number: 'number',
    Select: 'select',
    MultiSelect: 'multiselect',
    Textarea: 'textarea',
    Checkbox: 'checkbox',
    Radio: 'radio'
} as const;

// Cria um tipo baseado nas valores do objeto FieldType
export type FieldType = typeof FieldType[keyof typeof FieldType];

// Campos usado nos campos tipo select, multiselect, radio
export interface FormFieldOption {
    value: string;
    label: string;
    disabled?: boolean;
}

// Representa um campo do formulário.
export interface FormFieldDefinition {
    name: string; // Nome do campo (usado como chave)
    label: string; // Rótulo exibido para o campo
    type: FieldType; // Tipo do campo (baseado em FieldType)
    required?: boolean;
    section?: string; // Define uma categoria ou seção para organizar os campos na UI
    placeholder?: string;
    mask?: string; // Mascara de entrada para formatação automática ex.: (telefone, cpf, etc)
    options?: FormFieldOption[];
    showOnlyOnCreate?: boolean; // Se verdadeiro, o campo só aparece ao criar uma nova entidade
    showOnlyOnEdit?: boolean; // Se verdadeiro, o campo só aparece ao editar uma entidade existente
    min?: string | number;
    max?: string | number;
    step?: string | number; // Intervalo de incremento em campos numéricos.
    rows?: number;
    maxLength?: number;
    defaultValue?: unknown; // Valor inicial do campo quando o formulário é carregado.
}

// Tipo base que todas as entidades devem estender
export type BaseEntity = Record<string, unknown> & {
    id: string | number;
    createdAt?: string;
    updatedAt?: string;
};

// Representa o esquema de uma entidade, incluindo seus campos e colunas da tabela.
export interface EntitySchema<T extends BaseEntity = BaseEntity> {
    entityName: string; // Nome singular da entidade (ex.: "Usuário")
    entityNamePlural: string; // Nome plural da entidade (ex.: "Usuários")
    fields: FormFieldDefinition[]; // Lista completa dos campos do formulário da entidade.
    tableColumns: ColumnDefinition<T>[]; // Define as colunas da tabela (listagem) da entidade.
    badgeVariants?: Record<string, string | number>; // Mapeamento opcional para variantes de badges usadas na tabela.
}

// Define as props necessárias para montar uma página CRUD dinâmica baseada em schema
export interface EntityCRUDPageProps<T extends BaseEntity> {
    schema: EntitySchema<T>; // Schema que descreve toda a entidade
    data: T[]; // Lista de registros da entidade
    pageTitle: string;
    pageDescription?: string;
    buttonText?: string;
    buttonIcon?: ReactNode;
    extraTableActions?: (row: T) => ReactNode;
    onCreate?: (data: Partial<T>) => Promise<void>; // Função chamada ao criar um novo item
    onUpdate?: (data: Partial<T>) => Promise<void>; // Função chamada ao atualizar um item
    onDelete?: (id: string | number) => Promise<void>; // Função chamada ao deletar um item
    customModals?: ReactNode;
}

// Props para o formulário genérico
export interface EntityFormProps<T extends BaseEntity = BaseEntity> {
    schema: EntitySchema<T>;
    initialData?: Partial<T> | null;
    onSubmit: (data: Partial<T>) => Promise<void> | void;
    onCancel: () => void;
    isEdit?: boolean;
    isLoading?: boolean;
}

// Props para o componente de detalhes
export interface EntityDetailsProps<T extends BaseEntity = BaseEntity> {
    schema: EntitySchema<T>;
    entity: T;
}

// Estado do hook useEntityCRUD
export interface EntityCRUDState<T extends BaseEntity = BaseEntity> {
    isFormOpen: boolean;
    isDetailsOpen: boolean;
    isDeleteOpen: boolean;
    selectedEntity: T | null;
    isEdit: boolean;
    isLoading: boolean;
}

// Ações do hook useEntityCRUD
export interface EntityCRUDActions<T extends BaseEntity = BaseEntity> {
    setIsFormOpen: (value: boolean) => void;
    setIsDetailsOpen: (value: boolean) => void;
    setIsDeleteOpen: (value: boolean) => void;
    setSelectedEntity: (entity: T | null) => void;
    setIsEdit: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    handleCreate: () => void;
    handleView: (entity: T) => void;
    handleEdit: (entity: T) => void;
    handleDeleteClick: (entity: T) => void;
    closeAll: () => void; // ← NOVA FUNÇÃO
}

// Retorno completo do hook useEntityCRUD
export type UseEntityCRUDReturn<T extends BaseEntity = BaseEntity> = 
    EntityCRUDState<T> & EntityCRUDActions<T>;