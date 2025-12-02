import { useState } from "react";
import Styles from './UserPermissions.module.css';
import { Button } from "../../common/Button";
import { FormCheckbox } from "../../common/Form";

interface Permission {
    id: string;
    name: string;
    description: string;
    category: string;
};

const availablePermissions: Permission[] = [
    { id: 'VIEW_DASHBOARD', name: 'Visualizar Dashboard', description: 'Ver painéis e estatísticas', category: 'Visualização' },
    { id: 'VIEW_REPORTS', name: 'Visualizar Relatórios', description: 'Acessar relatórios do sistema', category: 'Visualização' },
    { id: 'EXPORT_REPORTS', name: 'Exportar Relatórios', description: 'Baixar relatórios em PDF/Excel', category: 'Visualização' },
    { id: 'CREATE_USER', name: 'Criar Usuário', description: 'Adicionar novos usuários', category: 'Gerenciamento' },
    { id: 'EDIT_USER', name: 'Editar Usuário', description: 'Modificar dados de usuários', category: 'Gerenciamento' },
    { id: 'DELETE_USER', name: 'Deletar Usuário', description: 'Remover usuários do sistema', category: 'Gerenciamento' },
    { id: 'CREATE_SERVICE', name: 'Criar Serviço', description: 'Adicionar novos serviços', category: 'Serviços' },
    { id: 'EDIT_SERVICE', name: 'Editar Serviço', description: 'Modificar serviços existentes', category: 'Serviços' },
    { id: 'DELETE_SERVICE', name: 'Deletar Serviço', description: 'Remover serviços', category: 'Serviços' },
    { id: 'VIEW_INVOICES', name: 'Visualizar Faturas', description: 'Acessar dados financeiros', category: 'Financeiro' },
    { id: 'APPROVE_PAYMENTS', name: 'Aprovar Pagamentos', description: 'Autorizar transações', category: 'Financeiro' },
];

export interface UserPermissionsModalProps {
    userName: string;
    currentPermissions: string[];
    onSave: (permissions: string[]) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const UserPermissionsModal = ({
    userName,
    currentPermissions,
    onSave,
    onCancel,
    isLoading = false
}: UserPermissionsModalProps) => {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(currentPermissions);

    const handleTogglePermission = (permissionId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSelectAll = () => {
        setSelectedPermissions(availablePermissions.map(p => p.id));
    };

    const handleClearAll = () => {
        setSelectedPermissions([]);
    };

    const handleSubmit = () => {
        onSave(selectedPermissions);
    };

    // Agrupar permissões por categoria
    const groupedPermissions = availablePermissions.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    return (
        <div className={Styles.permissionsContainer}>
            <div className={Styles.header}>
                <div>
                    <p className={Styles.userInfo}>
                        Gerenciando permissões de: <strong>{userName}</strong>
                    </p>
                    <p className={Styles.permissionCount}>
                        {selectedPermissions.length} de {availablePermissions.length} permissões selecionadas
                    </p>
                </div>
                <div className={Styles.bulkActions}>
                    <Button
                        type="button"
                        variant="ghost"
                        size="small"
                        onClick={handleSelectAll}
                        disabled={isLoading}
                    >
                        Selecionar Todas
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="small"
                        onClick={handleClearAll}
                        disabled={isLoading}
                    >
                        Limpar Todas
                    </Button>
                </div>
            </div>

            <div className={Styles.permissionsGrid}>
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className={Styles.category}>
                        <h4 className={Styles.categoryTitle}>{category}</h4>
                        <div className={Styles.permissionsList}>
                            {permissions.map(permission => (
                                <div key={permission.id} className={Styles.permissionItem}>
                                    <FormCheckbox
                                        id={permission.id}
                                        name={permission.id}
                                        label={permission.name}
                                        checked={selectedPermissions.includes(permission.id)}
                                        onChange={() => handleTogglePermission(permission.id)}
                                        disabled={isLoading}
                                    />
                                    <p className={Styles.permissionDescription}>
                                        {permission.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={Styles.footer}>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Salvando...' : 'Salvar Permissões'}
                </Button>
            </div>
        </div>
    );
};