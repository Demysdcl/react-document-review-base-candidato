import { useRef } from 'react';
import { useOutlineClick } from '../../hooks/useOutlineClick';
import type { CustomerDocument, DocumentStatus } from '../../types';
import { formatDate } from '../../utils/date';
import { Button } from '../Button';
import './styles.css';

const statusLabels: Record<DocumentStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  reviewing: 'Em análise',
};

type DocumentDrawerProps = {
  document: CustomerDocument;
  onClose: () => void;
};

export function DocumentDrawer({ document, onClose }: DocumentDrawerProps) {
  const documentRef = useRef<HTMLElement>(null);

  useOutlineClick(documentRef, onClose);

  return (
    <aside
      className="drawer"
      ref={documentRef}
      aria-label={`Detalhes do documento ${document.title}`}
    >
      <Button className="close" onClick={onClose}>
        ×
      </Button>
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
