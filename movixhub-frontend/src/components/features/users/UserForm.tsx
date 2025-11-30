import { useState, type ChangeEvent, type FormEvent } from "react";
import { 
    FormActions, 
    FormContainer, 
    FormError, 
    FormField, 
    FormGrid, 
    FormSection, 
    FormSelect } from "../../common/Form";
import type { FormSelectOption } from "../../common/Form/FormSelect";

type UserStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Suspenso';
type AccessProfile = 'Administrador' | 'Operador' | 'Supervisor' | 'Finanças' | 'Visualizador';

// Interface de dados mínima para o formulário (campos editáveis/criáveis)
export interface UserFormData {
    id?: string; // Presente apenas em edição
    fullName: string;
    corporateEmail: string;
    cpf: string;
    phone?: string;
    position: string;
    department: string;
    accessProfile: AccessProfile;
    status: UserStatus;
    admissionDate: string;
    passwordHash?: string; // Usado apenas na criação ou mudança de senha
};

export interface UserFormProps {
    initialData?: UserFormData | null;
    onSubmit: (data: UserFormData) => void;
    onCancel?: () => void;
    isLoading: boolean; // Indica se o formulário está em estado de carregamento
    isEdit: boolean; // True para edição, False para criação
};

export const UserForm = ({ initialData, onSubmit, onCancel, isLoading, isEdit }: UserFormProps) => {

    // O estado local gerencia os inputs
    const [error, setError] = useState<string | null>(null);

    const normalizeDate = (date: string | undefined | null): string => {
        if (!date) return "";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().substring(0, 10);
    };

    // Estado do formulário
    const [formData, setFormData] = useState<UserFormData>(() => {
        // Lógica de inicialização 
        if (isEdit && initialData) {
            // Se for edição, retorna os dados carregados (formatando a data)
            return {
                ...initialData, // Carrega todos os dados editáveis
                admissionDate: normalizeDate(initialData.admissionDate), // Garantir que a data esteja no formato YYYY-MM-DD para o input type="date"
                passwordHash: '' // Nunca carrega a senha em edição
            }
        }
        // Caso contrário (criação), retorna o estado inicial padrão
        return {
            fullName: '',
            corporateEmail: '',
            cpf: '',
            phone: '',
            position: '',
            department: '',
            accessProfile: 'Operador',
            status: 'Ativo',
            admissionDate: new Date().toISOString().substring(0, 10),
            passwordHash: ''
        };
    });

    // Manipulador genérico para campos de input e select
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev, // Mantém os dados anteriores
            [name]: value // Atualiza o campo específico
        }));
        setError(null);
    };

    // Manipulador de submissão do formulário
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Validação obrigatória de senha apenas se for CRIAÇÃO
        if (!isEdit && !formData.passwordHash) {
            return setError('A senha é obrigatória para criar um novo usuário.');
        }

        // Chamada da função onSubmit passada pelo Modal
        onSubmit(formData);
    }

    const accessProfileOptions: FormSelectOption[] = [
        { value: 'Operador', label: 'Operador' },
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Finanças', label: 'Finanças' },
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Visualizador', label: 'Visualizador' }
    ];

    const statusOptions: FormSelectOption[] = [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' },
        { value: 'Suspenso', label: 'Suspenso' },
        { value: 'Bloqueado', label: 'Bloqueado' }
    ];

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormError message={error} />

            <FormSection title="Dados Pessoais">
                <FormGrid columns={2}>
                    <FormField
                        label="Nome Completo"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <FormField
                        label="E-mail Corporativo"
                        id="corporateEmail"
                        name="corporateEmail"
                        type="email"
                        value={formData.corporateEmail}
                        onChange={handleChange}
                        required
                    />

                    <FormField
                        label="CPF"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        placeholder="000.000.000-00"
                    />

                    <FormField
                        label="Telefone"
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Dados Organizacionais">
                <FormGrid columns={2}>
                    <FormField
                        label="Departamento"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />

                    <FormField
                        label="Cargo/Posição"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />

                    <FormField
                        label="Data de Admissão"
                        id="admissionDate"
                        name="admissionDate"
                        type="date"
                        value={formData.admissionDate}
                        onChange={handleChange}
                        required
                    />

                    <FormSelect
                        label="Status"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={statusOptions}
                        required
                    />
                </FormGrid>

                <FormSelect
                    label="Perfil de Acesso"
                    id="accessProfile"
                    name="accessProfile"
                    value={formData.accessProfile}
                    onChange={handleChange}
                    options={accessProfileOptions}
                    required
                />
            </FormSection>

            {!isEdit && (
                <FormSection title="Segurança">
                    <FormField
                        label="Senha"
                        id="passwordHash"
                        name="passwordHash"
                        type="password"
                        value={formData.passwordHash || ''}
                        onChange={handleChange}
                        required
                        placeholder="Mínimo 8 caracteres"
                    />
                </FormSection>
            )}

            <FormActions
                onCancel={onCancel}
                submitLabel={isEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
                isLoading={isLoading}
            />
        </FormContainer>
    );
};