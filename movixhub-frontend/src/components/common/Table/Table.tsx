import type { ReactNode } from 'react';
import Styles from './Table.module.css';

type ColumnContentType = 'large-text' | 'medium-text' | 'fixed-short' | 'badge' | 'actions';

export interface ColumnDefinition<TData> {
    // Chave para identificar a coluna no objeto de dados (TData)
    // ou 'custom' para colunas que contêm JSX, badges ou botões (como a coluna 'AÇÕES').
    key: keyof TData | 'custom';
    // Chave opcional para renderizar um texto secundário na célula (linha de baixo)
    secondaryKey?: keyof TData;
    // Texto do cabeçalho da coluna
    header: string;
    // Define a natureza do dado para regras automáticas de largura
    type: ColumnContentType;
    // Função opcional para renderizar o conteúdo cutomizado da célula (JSX, Badges, Ícones)
    render?: (value: TData[keyof TData] | undefined, row: TData) => ReactNode;
    // Alinhamento do texto da célula
    align?: 'left' | 'center' | 'right';
    // Classe customizada para a coluna (ex> largura)
    className?: string;
};

export interface TableProps<TData> {
    data: TData[];
    columns: ColumnDefinition<TData>[];
    title?: string;
    minWidth?: string;
    emptyMessage?: string;
    isLoading?: boolean;
}

export const Table = <TData extends { id: string | number }>({
    data,
    columns,
    title,
    minWidth = '900px',
    emptyMessage = 'Nenhum registro encontrado',
    isLoading = false
}: TableProps<TData>) => {

    // Mapeia os tipos de coluna para a classe CSS de largura/quebra de linha
    const getContentTypeClass = (type: ColumnContentType) => {
        switch (type) {
            case 'large-text': return Styles.typeLargeText; // Texto longo, alta prioridade de espaço
            case 'medium-text': return Styles.typeMediumText; // Texto secundário, min-width médio
            case 'fixed-short': return Styles.typeFixedShort; // Inclui IDs, datas, números curtos
            case 'badge': return Styles.typeFixedBadge; // Compacto, nowrap
            case 'actions': return Styles.typeActions; // Fixo para botões
            default: return Styles.typeMediumText; // Fallback seguro
        }
    }

    // Função para obter a classe de alinhamento com base na propriedade 'align'
    const getAlignClass = (align: 'left' | 'right' | 'center' = 'left') => {
        switch (align) {
            case 'right': return Styles.tdRight;
            case 'left': return Styles.tdLeft;
            default: return Styles.tdCenter;
        }
    };

    const renderCellContent = (column: ColumnDefinition<TData>, row: TData) => {
        // Obtém o valor da célula, a menos que seja uma coluna 'custom'
        const value = column.key !== 'custom' ? row[column.key as keyof TData] : undefined;
        const secondaryValue = column.secondaryKey ? row[column.secondaryKey as keyof TData] : undefined;

        // Prioridade 1: Renderização customizada
        if (column.render) {
            // Renderiza o conteúdo da célula
            return column.render(value, row);
        }

        // Prioridade 2: Texto duplo (main + secondary)
        if (column.secondaryKey && secondaryValue && value) {
            return (
                <div className={Styles.cellDual}>
                    <div className={Styles.mainText}>{value as ReactNode}</div>
                    <div className={Styles.secondaryText}>{secondaryValue as ReactNode}</div>
                </div>
            );
        }

        // Prioridade 3: Valor simples
        // Se não houver renderização customizada, exibe o valor diretamente com tipos de dados suportados (string ou number)
        if (value !== undefined && (typeof value === 'string' || typeof value === 'number')) {
            return value;
        }

        return null;
    };

    return (
        <div className={Styles.tableCard}>
            {title && (
                <div className={Styles.header}>
                    <h2 className={Styles.title}>{title}</h2>
                </div>
            )}

            <div className={Styles.tableContainer}>
                <table className={Styles.table} style={{ minWidth }}>
                    <thead className={Styles.tableHead}>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`
                                        ${Styles.th}
                                        ${getAlignClass(column.align)}
                                        ${getContentTypeClass(column.type)}
                                        ${column.className || ''}
                                    `}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className={Styles.emptyState}>
                                    <div className={Styles.loading}>Carregando...</div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className={Styles.emptyState}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr key={row.id} className={Styles.tableRow}>
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`
                                                ${Styles.td}
                                                ${getAlignClass(column.align)}
                                                ${column.className || ''}
                                            `}
                                        >
                                            {renderCellContent(column, row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};