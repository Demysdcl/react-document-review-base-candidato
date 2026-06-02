import type { CustomerDocument } from '../types';
import { formatDate } from '../utils/date';
import { StatusBadge } from './StatusBadge';

type DocumentTableProps = {
    documents: CustomerDocument[];
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onSelectDocument: (document: CustomerDocument) => void;
};

export function DocumentTable({
    documents,
    onApprove,
    onReject,
    onSelectDocument
}: DocumentTableProps) {


    const handleApprove = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();
        onApprove(id);
    }

    const handleReject = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();
        onReject(id);
    }

    return (
        <section className="table-card">
            <table>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Cliente</th>
                        <th>Categoria</th>
                        <th>Status</th>
                        <th>Confiança IA</th>
                        <th>Criado em</th>
                        <th>Responsável</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((document) => (
                        <tr key={document.id} onClick={() => onSelectDocument(document)}>
                            <td>
                                <strong>{document.title}</strong>
                                <small>{document.id}</small>
                            </td>
                            <td>
                                {document.customerName}
                                <small>{document.customerEmail || 'Sem e-mail cadastrado'}</small>
                            </td>
                            <td>{document.category}</td>
                            <td>
                                <StatusBadge status={document.status} />
                            </td>
                            <td>{Math.round((document.confidence || 0) * 100)}%</td>
                            <td>{formatDate(document.createdAt)}</td>
                            <td>{document.assignedTo || 'Não atribuído'}</td>
                            <td>
                                <button onClick={(e) => handleApprove(e, document.id)}>Aprovar</button>
                                <button onClick={(e) => handleReject(e, document.id)}>Rejeitar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
