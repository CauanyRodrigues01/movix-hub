import { TableBadge } from '../../common/Table';
import Styles from './Users.module.css';

type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

interface User {
    id: string;
    fullName: string;
    corporateEmail: string;
    cpf: string;
    phone?: string;
    position: string;
    department: string;
    accessProfile: AccessProfile;
    specificPermissions: string[];
    status: UserStatus;
    admissionDate: string;
    lastAccess: string;
    profilePhoto?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDetailsContentProps {
    user: User;
}

const statusVariants = {
    'Ativo': 'success',
    'Inativo': 'info',
    'Bloqueado': 'error',
    'Suspenso': 'warning'
} as const;

export const UserDetailsContent = ({ user }: UserDetailsContentProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <div className={Styles.detailsContainer}>
            {/* Seção: Dados Pessoais */}
            <section className={Styles.section}>
                <h3 className={Styles.sectionTitle}>Dados Pessoais</h3>
                <div className={Styles.detailsGrid}>
                    <div className={Styles.detailItem}>
                        <label>Nome Completo</label>
                        <span>{user.fullName}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>E-mail Corporativo</label>
                        <span>{user.corporateEmail}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>CPF</label>
                        <span>{user.cpf}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Telefone</label>
                        <span>{user.phone || '-'}</span>
                    </div>
                </div>
            </section>

            {/* Seção: Dados Organizacionais */}
            <section className={Styles.section}>
                <h3 className={Styles.sectionTitle}>Dados Organizacionais</h3>
                <div className={Styles.detailsGrid}>
                    <div className={Styles.detailItem}>
                        <label>Departamento</label>
                        <span>{user.department}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Cargo</label>
                        <span>{user.position}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Perfil de Acesso</label>
                        <span>{user.accessProfile}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Data de Admissão</label>
                        <span>{formatDate(user.admissionDate)}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Status</label>
                        <div>
                            <TableBadge
                                value={user.status}
                                variant={statusVariants[user.status]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção: Permissões */}
            <section className={Styles.section}>
                <h3 className={Styles.sectionTitle}>Permissões Específicas</h3>
                {user.specificPermissions.length > 0 ? (
                    <div className={Styles.permissionsList}>
                        {user.specificPermissions.map((permission, index) => (
                            <TableBadge
                                key={index}
                                value={permission}
                                variant="default"
                            />
                        ))}
                    </div>
                ) : (
                    <p className={Styles.emptyText}>Nenhuma permissão específica atribuída</p>
                )}
            </section>

            {/* Seção: Informações de Sistema */}
            <section className={Styles.section}>
                <h3 className={Styles.sectionTitle}>Informações do Sistema</h3>
                <div className={Styles.detailsGrid}>
                    <div className={Styles.detailItem}>
                        <label>ID do Usuário</label>
                        <span className={Styles.monospace}>{user.id}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Último Acesso</label>
                        <span>{formatDateTime(user.lastAccess)}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Criado em</label>
                        <span>{formatDateTime(user.createdAt)}</span>
                    </div>
                    <div className={Styles.detailItem}>
                        <label>Última Atualização</label>
                        <span>{formatDateTime(user.updatedAt)}</span>
                    </div>
                </div>
            </section>
        </div>
    );
};