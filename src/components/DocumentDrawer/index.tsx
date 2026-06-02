import type { CustomerDocument, DocumentStatus } from '../../types';
import { formatDate } from '../../utils/date';
import './styles.css';

const statusLabels: Record<DocumentStatus, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    reviewing: 'Em análise'
};

type DocumentDrawerProps = {
    document: CustomerDocument;
    onClose: () => void;
};

export function DocumentDrawer({ document, onClose }: DocumentDrawerProps) {
    return (
        <aside className="drawer">
            <button className="close" onClick={onClose}>
                ×
            </button>
            <h2>{document.title}</h2>
            <p>
                <strong>Cliente:</strong> {document.customerName}
            </p>
            <p>
                <strong>Status:</strong> {statusLabels[document.status]}
            </p>
            <p>
                <strong>Categoria:</strong> {document.category}
            </p>
            <p>
                <strong>Criado em:</strong> {formatDate(document.createdAt)}
            </p>
        </aside>
    );
}
