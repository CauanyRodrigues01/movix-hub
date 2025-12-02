import type { User } from "../../../types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export const userSchema: EntitySchema<User> = {
    entityName: 'Usuário',
    entityNamePlural: 'Usuários',
    fields: [
        {
            name: 'fullName',
            label: 'Nome Completo',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais'
        },
        {
            name: ' cpfCnpj',
            label: 'CPF',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '000.000.000-00',
            mask: '000.000.000-00'
        },
        {
            name: 'phone',
            label: 'Telefone',
            type: FieldType.Tel,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '(00) 00000-0000',
            mask: '(00) 00000-0000'
        },
        {
            name: 'email',
            label: 'E-mail Pessoal',
            type: FieldType.Email,
            required: true,
            section: 'Dados Pessoais'
        },
        {
            name: 'corporateEmail',
            label: 'E-mail Corporativo',
            type: FieldType.Email,
            required: true,
            section: 'Dados Pessoais'
        }, 
        {
            name: 'zipCode',
            label: 'CEP',
            type: FieldType.Text,
            required: true,
            section: 'Endereço',
            placeholder: '00000-000',
            mask: '00000-000'
        },
        {
            name: 'fullAddress',
            label: 'Endereço Completo',
            type: FieldType.Text,
            required: true,
            section: 'Endereço',
            placeholder: 'Rua, número, complemento'
        },
        {
            name: 'city',
            label: 'Cidade',
            type: FieldType.Text,
            required: true,
            section: 'Endereço'
        },
        {
            name: 'state',
            label: 'Estado',
            type: FieldType.Select,
            required: true,
            section: 'Endereço',
            options: [
                { value: 'AC', label: 'Acre' },
                { value: 'AL', label: 'Alagoas' },
                { value: 'AP', label: 'Amapá' },
                { value: 'AM', label: 'Amazonas' },
                { value: 'BA', label: 'Bahia' },
                { value: 'CE', label: 'Ceará' },
                { value: 'DF', label: 'Distrito Federal' },
                { value: 'ES', label: 'Espírito Santo' },
                { value: 'GO', label: 'Goiás' },
                { value: 'MA', label: 'Maranhão' },
                { value: 'MT', label: 'Mato Grosso' },
                { value: 'MS', label: 'Mato Grosso do Sul' },
                { value: 'MG', label: 'Minas Gerais' },
                { value: 'PA', label: 'Pará' },
                { value: 'PB', label: 'Paraíba' },
                { value: 'PR', label: 'Paraná' },
                { value: 'PE', label: 'Pernambuco' },
                { value: 'PI', label: 'Piauí' },
                { value: 'RJ', label: 'Rio de Janeiro' },
                { value: 'RN', label: 'Rio Grande do Norte' },
                { value: 'RS', label: 'Rio Grande do Sul' },
                { value: 'RO', label: 'Rondônia' },
                { value: 'RR', label: 'Roraima' },
                { value: 'SC', label: 'Santa Catarina' },
                { value: 'SP', label: 'São Paulo' },
                { value: 'SE', label: 'Sergipe' },
                { value: 'TO', label: 'Tocantins' }
            ]
        }, {
            name: 'department',
            label: 'Departamento',
            type: FieldType.Select,
            required: true,
            section: 'Dados Organizacionais',
            options: [
                { value: 'Logística', label: 'Logística' },
                { value: 'Financeiro', label: 'Financeiro' },
                { value: 'Comercial', label: 'Comercial' },
                { value: 'Operações', label: 'Operações' },
                { value: 'RH', label: 'Recursos Humanos' },
                { value: 'TI', label: 'Tecnologia da Informação' },
                { value: 'Suporte', label: 'Suporte ao Cliente' },
                { value: 'Administrativo', label: 'Administrativo' },
                { value: 'Diretoria', label: 'Diretoria' }
            ]
        },
        {
            name: 'position',
            label: 'Cargo',
            type: FieldType.Text,
            required: true,
            section: 'Dados Organizacionais',
            placeholder: 'Ex: Analista, Gerente, Coordenador'
        },
        {
            name: 'registrationDate',
            label: 'Data de Admissão',
            type: FieldType.Date,
            required: true,
            section: 'Dados Organizacionais'
        },
        {
            name: 'status',
            label: 'Status',
            type: FieldType.Select,
            required: true,
            section: 'Dados Organizacionais',
            defaultValue: 'Ativo',
            options: [
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Bloqueado', label: 'Bloqueado' },
                { value: 'Suspenso', label: 'Suspenso' }
            ]
        }, 
        {
            name: 'accessProfile',
            label: 'Perfil de Acesso',
            type: FieldType.Select,
            required: true,
            section: 'Permissões de Acesso',
            options: [
                { value: 'Administrador', label: 'Administrador - Acesso total' },
                { value: 'Supervisor', label: 'Supervisor - Gerenciar operações' },
                { value: 'Finanças', label: 'Finanças - Gestão financeira' },
                { value: 'Operador', label: 'Operador - Operações básicas' },
                { value: 'Visualizador', label: 'Visualizador - Somente leitura' }
            ]
        },
        {
            name: 'passwordHash',
            label: 'Senha',
            type: FieldType.Password,
            required: true,
            section: 'Segurança',
            showOnlyOnCreate: true,
            placeholder: 'Mínimo 8 caracteres'
        },
        {
            name: 'internalNotes',
            label: 'Notas Internas',
            type: FieldType.Textarea,
            section: 'Observações',
            rows: 4,
            maxLength: 500,
            placeholder: 'Observações internas sobre o usuário'
        }
    ],

    tableColumns: [
        {
            key: 'fullName',
            header: 'NOME',
            type: 'large-text',
            secondaryKey: 'corporateEmail'
        },
        {
            key: 'position',
            header: 'CARGO',
            type: 'large-text',
            secondaryKey: 'department'
        },
        {
            key: 'accessProfile',
            header: 'PERFIL DE ACESSO',
            type: 'fixed-short'
        },
    ] as ColumnDefinition<User>[],

    badgeVariants: {
        'Ativo': 'success',
        'Inativo': 'info',
        'Bloqueado': 'error',
        'Suspenso': 'warning'
    }

}