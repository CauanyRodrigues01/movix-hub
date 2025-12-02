// Hook que centraliza e gerencia toda a lógica de CRUD (criar, editar, visualizar e deletar) de uma página, controlando estados e modais de forma reutilizável.

import { useState } from 'react';

export interface UseEntityCRUDReturn<T> {
    // Estados dos modals
    isFormOpen: boolean;
    isDeleteOpen: boolean;
    isDetailsOpen: boolean;
    
    // Estados auxiliares
    selectedEntity: T | null;
    isEdit: boolean;
    isLoading: boolean;
    
    // Setters
    setIsFormOpen: (value: boolean) => void;
    setIsDeleteOpen: (value: boolean) => void;
    setIsDetailsOpen: (value: boolean) => void;
    setSelectedEntity: (entity: T | null) => void;
    setIsLoading: (value: boolean) => void;
    
    // Handlers
    handleCreate: () => void;
    handleEdit: (entity: T) => void;
    handleView: (entity: T) => void;
    handleDeleteClick: (entity: T) => void;
    closeAll: () => void;
}

export function useEntityCRUD<T>(): UseEntityCRUDReturn<T> {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    
    const [selectedEntity, setSelectedEntity] = useState<T | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = () => {
        setSelectedEntity(null);
        setIsEdit(false);
        setIsFormOpen(true);
    };

    const handleEdit = (entity: T) => {
        setSelectedEntity(entity);
        setIsEdit(true);
        setIsFormOpen(true);
    };

    const handleView = (entity: T) => {
        setSelectedEntity(entity);
        setIsDetailsOpen(true);
    };

    const handleDeleteClick = (entity: T) => {
        setSelectedEntity(entity);
        setIsDeleteOpen(true);
    };

    const closeAll = () => {
        setIsFormOpen(false);
        setIsDeleteOpen(false);
        setIsDetailsOpen(false);
        setSelectedEntity(null);
        setIsEdit(false);
    };

    return {
        isFormOpen,
        isDeleteOpen,
        isDetailsOpen,
        selectedEntity,
        isEdit,
        isLoading,
        setIsFormOpen,
        setIsDeleteOpen,
        setIsDetailsOpen,
        setSelectedEntity,
        setIsLoading,
        handleCreate,
        handleEdit,
        handleView,
        handleDeleteClick,
        closeAll
    };
}