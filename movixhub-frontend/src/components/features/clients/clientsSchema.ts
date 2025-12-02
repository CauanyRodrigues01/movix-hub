import type { Client } from "../../../types";
import { FieldType, type EntitySchema } from "../../common/EntityCRUD";
import type { ColumnDefinition } from "../../common/Table";

export const clientSchema: EntitySchema<Client> = {
    entityName: 'Cliente',
    entityNamePlural: 'Clientes',

    fields: [
        {
            name: 'fullName',
            label: 'Nome Completo',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais',
            placeholder: 'Nome Completo ou Razão Social'
        },
        {
            name: 'cpfCnpj',
            label: 'CPF / CNPJ do Contato',
            type: FieldType.Text,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '000.000.000-00 ou 00.000.000/0000-00',
            mask: '000.000.000-00'
        },
        {
            name: 'phone',
            label: 'Telefone Principal',
            type: FieldType.Tel,
            required: true,
            section: 'Dados Pessoais',
            placeholder: '(00) 00000-0000',
            mask: '(00) 00000-0000'
        },
        {
            name: 'email',
            label: 'E-mail',
            type: FieldType.Email,
            required: true,
            section: 'Dados Pessoais',
            placeholder: 'email@exemplo.com'
        },
        {
            name: 'clientType',
            label: 'Tipo de Cliente',
            type: FieldType.Select,
            required: true,
            section: 'Dados da Empresa',
            defaultValue: 'Pessoa Física',
            options: [
                { value: 'Pessoa Física', label: 'Pessoa Física' },
                { value: 'Pessoa Jurídica', label: 'Pessoa Jurídica' }
            ]
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
        },
        {
            name: 'classification',
            label: 'Classificação do Cliente',
            type: FieldType.Select,
            required: true,
            section: 'Informações Comerciais',
            defaultValue: 'Regular',
            options: [
                { value: 'Regular', label: 'Regular' },
                { value: 'Bronze', label: 'Bronze' },
                { value: 'Prata', label: 'Prata' },
                { value: 'Ouro', label: 'Ouro' }
            ]
        },
    ],

    tableColumns: [
        {
            key: 'fullName',
            header: 'CLIENTE',
            type: 'large-text',
            secondaryKey: 'cpfCnpj'
        },
        {
            key: 'clientType',
            header: 'TIPO',
            type: 'fixed-short'
        },
        {
            key: 'classification',
            header: 'CLASSIFICAÇÃO',
            type: 'fixed-short'
        },
        {
            key: 'city',
            header: 'CIDADE',
            type: 'fixed-medium'
        },
        {
            key: 'totalServices',
            header: 'SERVIÇOS',
            type: 'fixed-short',
            align: 'center'
        }
    ] as ColumnDefinition<Client>[],

    badgeVariants: {
        'Ativo': 'success',
        'Inativo': 'warning',
        'Bloqueado': 'error'
    }
}