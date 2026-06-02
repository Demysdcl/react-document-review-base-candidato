import type { CustomerDocument, DocumentStatus } from '../types';

const statusLabels: Record<DocumentStatus, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    reviewing: 'Em análise'
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

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
