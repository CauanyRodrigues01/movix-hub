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
    render?: (value: TData[keyof TData] | undefined, row: TData) => React.ReactNode;
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
}

const Table = <TData extends { id: string | number }>
    ({ data, columns, title, minWidth }: TableProps<TData>) => {

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

    // Funçã para obter a classe de alinhamento com base na propriedade 'align'
    const getAlignClass = (align: 'left' | 'right' | 'center' = 'left') => {
        switch (align) {
            case 'right': return Styles.tdRight;
            case 'left': return Styles.tdLeft;
            default: return Styles.tdCenter;
        }
    };

    // Estilo inline para garantir largura mínima da tabela
    const tableStyles = { minWidth: minWidth };

    return (

        <div className={Styles.tableCard}>

            {title && (
                <h2 className={Styles.title}>
                    {title}
                </h2>
            )}

            <div className={Styles.tableContainer}>
                <table className={Styles.table} style={tableStyles}>
                    {/* Cabeçalho */}
                    <thead className={Styles.tableHeader}>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`
                                            ${Styles.th}
                                            ${getAlignClass(column.align)}
                                            ${getContentTypeClass(column.type)}
                                            ${column.className || ''}
                                            `}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Corpo */}
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className={Styles.tableRow}>
                                {columns.map((column, colIndex) => {
                                    // Obtém o valor da célula, a menos que seja uma coluna 'custom'
                                    const value = column.key !== "custom" ? row[column.key as keyof TData] : undefined;
                                    const secondaryValue = column.secondaryKey ? row[column.secondaryKey as keyof TData] : undefined;

                                    // Variável para armazenar o conteúdo da célula, priorizando renderização customizada
                                    let content: React.ReactNode;

                                    if (column.render) {
                                        // Renderiza o conteúdo da célula
                                        content = column.render(value, row);
                                    } else if (column.secondaryKey && secondaryValue && value) {
                                        // Renderiza a estrutura de duas linhas (mainText + secondaryText)
                                        content = (
                                            <div>
                                                <div className={Styles.mainText}>{value as React.ReactNode}</div>
                                                <div className={Styles.secondaryText}>{secondaryValue as React.ReactNode}</div>
                                            </div>
                                        );
                                    }
                                    // Se não houver renderização customizada, exibe o valor diretamente com tipos de dados suportados (string ou number)
                                    else if (value !== undefined && (typeof value == 'string' || typeof value === 'number')) {
                                        content = value;
                                        console.log(content)
                                    } else {
                                        content = null; // Célula vazia
                                    }

                                    return (
                                        <td
                                            key={colIndex}
                                            className={`
                                                ${Styles.td}
                                                ${getAlignClass(column.align)}
                                                ${column.className || ''}
                                            `}>
                                            {content}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;