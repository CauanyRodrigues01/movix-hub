// Exibe os detalhes completos de uma entidade usando o schema configurado.

import type { BaseEntity } from '../../../types';
import Styles from './EntityCRUD.module.css';
import type { EntitySchema, FormFieldDefinition } from './types';

export interface EntityDetailsContentProps<T extends BaseEntity> {
    schema: EntitySchema<T>;
    entity: T;
}

export function EntityDetailsContent<T extends BaseEntity>({
    schema,
    entity
}: EntityDetailsContentProps<T>) {
    const formatValue = (field: FormFieldDefinition, value: unknown) => {
        if (value === null || value === undefined || value === '') return '-';

        if (field.type === 'date') {
            try {
                return new Date(value as string).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } catch {
                return String(value);
            }
        }

        if (field.type === 'checkbox') {
            return value ? 'Sim' : 'Não';
        }

        if (Array.isArray(value)) {
            return value.length > 0 ? value.join(', ') : '-';
        }

        // Handle objects (but not dates)
        if (typeof value === 'object' && !(value instanceof Date)) {
            return JSON.stringify(value, null, 2);
        }

        return String(value);
    };

    // Agrupar campos por seção
    const sections = schema.fields.reduce((acc, field) => {
        if (field.showOnlyOnCreate) return acc; // Não mostrar em detalhes

        const section = field.section || 'Geral';
        if (!acc[section]) acc[section] = [];
        acc[section].push(field);
        return acc;
    }, {} as Record<string, FormFieldDefinition[]>);

    // Cast entity para Record para acessar propriedades dinamicamente
    const entityRecord = entity as Record<string, unknown>;

    return (
        <div className={Styles.detailsContainer}>
            {Object.entries(sections).map(([sectionName, fields]) => (
                <section key={sectionName} className={Styles.section}>
                    <h3 className={Styles.sectionTitle}>{sectionName}</h3>
                    <div className={Styles.detailsGrid}>
                        {fields.map(field => (
                            <div key={field.name} className={Styles.detailItem}>
                                <label>{field.label}</label>
                                <span>{formatValue(field, entityRecord[field.name])}</span>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* Seção de informações do sistema (opcional) */}
            {(entity.createdAt || entity.updatedAt) && (
                <section className={Styles.section}>
                    <h3 className={Styles.sectionTitle}>Informações do Sistema</h3>
                    <div className={Styles.detailsGrid}>
                        {entity.createdAt && (
                            <div className={Styles.detailItem}>
                                <label>Criado em</label>
                                <span>
                                    {new Date(entity.createdAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        )}
                        {entity.updatedAt && (
                            <div className={Styles.detailItem}>
                                <label>Atualizado em</label>
                                <span>
                                    {new Date(entity.updatedAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}