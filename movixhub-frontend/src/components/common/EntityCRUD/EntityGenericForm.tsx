// Formulário genérico que gera automaticamente os campos de criação/edição de uma entidade com base no schema configurado.

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FormActions, FormCheckbox, FormContainer, FormError, FormField, FormGrid, FormSection, FormSelect, FormTextarea } from "../Form";
import type { BaseEntity } from "../../../types";
import type { EntitySchema, FormFieldDefinition } from "./types";
import FormStyles from '../Form/Form.module.css';

export interface EntityGenericFormProps<T extends BaseEntity> {
    schema: EntitySchema<T>;
    initialData?: Partial<T> | null;
    onSubmit: (data: Partial<T>) => void | Promise<void>;
    onCancel?: () => void;
    isLoading: boolean;
    isEdit: boolean;
}

export function EntityGenericForm<T extends BaseEntity>({
    schema,
    initialData,
    onSubmit,
    onCancel,
    isLoading,
    isEdit
}: EntityGenericFormProps<T>) {

    // O estado local gerencia os inputs
    const [error, setError] = useState<string | null>(null);

    const normalizeDate = (date: string | undefined | null): string => {
        if (!date) return "";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().substring(0, 10);
    };

    // Estado do formulário
    const [formData, setFormData] = useState<Partial<T>>(() => {
        // Lógica de inicialização 

        // Se for edição, retorna os dados carregados (formatando datas)
        if (isEdit && initialData) {
            const normalized = { ...initialData };
            const n = normalized as Record<string, unknown>;

            schema.fields.forEach(field => {
                // Formata campos do tipo data
                if (field.type === 'date' && n[field.name]) {
                    n[field.name] = normalizeDate(n[field.name] as string);
                }
                // Nunca carrega campos que só aparecem na criação
                if (field.showOnlyOnCreate) {
                    n[field.name] = '';
                }
            });
            return normalized;
        }

        // Se for criação, inicializa com valores padrão do schema
        const initial: Partial<T> = {} as Partial<T>;
        const n = initial as Record<string, unknown>;

        schema.fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                n[field.name] = field.defaultValue;
            } else if (field.type === 'date') {
                n[field.name] = new Date().toISOString().substring(0, 10);
            } else if (field.type === 'checkbox') {
                n[field.name] = false;
            } else if (field.type === 'multiselect') {
                n[field.name] = [];
            } else {
                n[field.name] = '';
            }
        });
        return initial;
    });

    // Manipulador genérico para campos de input, select e textarea
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // Extrai nome, valor e tipo do campo
        const { name, value, type } = e.target;
        // Ajusta valor para checkbox
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        // Atualiza o estado formData, alterando apenas um campo, sem perder o resto dos dados
        setFormData(prev => {
            const updated = { ...prev } as Record<string, unknown>;
            updated[name] = newValue;
            return updated as Partial<T>;
        });
        setError(null);
    };

    // Manipulador de submissão do formulário
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validação de campos obrigatórios
        const requiredFields = schema.fields.filter(f =>
            f.required &&  // É obrigatório
            !(f.showOnlyOnCreate && isEdit) && // Não está oculto na edição e é edição
            !(f.showOnlyOnEdit && !isEdit) // Não está oculto na criação e é criação
        );

        const formDataRecord = formData as Record<string, unknown>;

        for (const field of requiredFields) {
            // Se o campo obrigatório estiver vazio, exibe erro
            if (!formDataRecord[field.name]) {
                return setError(`O campo "${field.label}" é obrigatório.`);
            }
        }

        await onSubmit(formData);
    };

    // Agrupar campos por seção
    const sections = schema.fields.reduce((acc, field) => {
        const section = field.section || 'Geral';
        if (!acc[section]) acc[section] = [];
        acc[section].push(field);
        return acc;
    }, {} as Record<string, FormFieldDefinition[]>);

    // Renderizador de campo baseado no tipo
    const renderField = (field: FormFieldDefinition) => {
        // Ocultar campos baseado em condições
        if (field.showOnlyOnCreate && isEdit) return null;
        if (field.showOnlyOnEdit && !isEdit) return null;

        const formDataRecord = formData as Record<string, unknown>;
        const value = formDataRecord[field.name] ?? '';

        switch (field.type) {
            case 'select':
                return (
                    <FormSelect
                        key={field.name}
                        label={field.label}
                        id={field.name}
                        name={field.name}
                        value={String(value)}
                        onChange={handleChange}
                        options={field.options || []}
                        required={field.required}
                        placeholder={field.placeholder}
                    />
                );

            case 'textarea':
                return (
                    <FormTextarea
                        key={field.name}
                        label={field.label}
                        id={field.name}
                        name={field.name}
                        value={String(value)}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={field.rows}
                        maxLength={field.maxLength}
                    />
                );

            case 'multiselect': {
                const currentValues = (Array.isArray(formDataRecord[field.name]) ? formDataRecord[field.name] : []) as string[];
                return (
                    <div key={field.name} className={FormStyles.formGroup}>
                        <label>
                            {field.label}
                            {field.required && <span className={FormStyles.required}>*</span>}
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.2rem' }}>
                            {field.options?.length ? field.options.map(opt => (
                                <FormCheckbox
                                    key={opt.value}
                                    id={`${field.name}-${opt.value}`}
                                    name={field.name}
                                    label={opt.label}
                                    checked={currentValues.includes(opt.value)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setFormData(prev => {
                                            const updated = { ...prev } as Record<string, unknown>;
                                            const arr = (Array.isArray(updated[field.name]) ? updated[field.name] : []) as string[];
                                            if (isChecked) {
                                                updated[field.name] = [...arr, opt.value];
                                            } else {
                                                updated[field.name] = arr.filter(v => v !== opt.value);
                                            }
                                            return updated as Partial<T>;
                                        });
                                        setError(null);
                                    }}
                                    disabled={opt.disabled}
                                />
                            )) : (
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Nenhuma opção disponível</span>
                            )}
                        </div>
                    </div>
                );
            }

            case 'checkbox':
                return (
                    <FormCheckbox
                        key={field.name}
                        label={field.label}
                        id={field.name}
                        name={field.name}
                        checked={Boolean(value)}
                        onChange={handleChange}
                    />
                );

            default:
                return (
                    <FormField
                        key={field.name}
                        label={field.label}
                        id={field.name}
                        name={field.name}
                        type={field.type as 'text' | 'email' | 'password' | 'date' | 'tel' | 'number'}
                        value={String(value)}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                    />
                );
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormError message={error} />

            {Object.entries(sections).map(([sectionName, fields]) => (
                <FormSection key={sectionName} title={sectionName}>
                    <FormGrid columns={2}>
                        {fields.map(renderField)}
                    </FormGrid>
                </FormSection>
            ))}

            <FormActions
                onCancel={onCancel}
                submitLabel={isEdit ? `Atualizar ${schema.entityName}` : `Criar ${schema.entityName}`}
                isLoading={isLoading}
            />
        </FormContainer>
    );
}