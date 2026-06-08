import { memo, useCallback, useState, type MouseEvent } from 'react';
import type { CustomerDocument } from '../../types';
import { formatDate } from '../../utils/date';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import './styles.css';

type DocumentTableProps = {
  documents: CustomerDocument[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  disableActions?: boolean;
  onSelectDocument: (document: CustomerDocument) => void;
};

export const DocumentTable = memo(function DocumentTable({
  documents,
  onApprove,
  onReject,
  onSelectDocument,
  disableActions = false,
}: DocumentTableProps) {
  const [onUpdateId, setOnUpdateId] = useState<string | null>(null);

  const handleApprove = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string) => {
      event.stopPropagation();
      setOnUpdateId(id);
      onApprove(id);
    },
    [onApprove],
  );

  const handleReject = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string) => {
      event.stopPropagation();
      setOnUpdateId(id);
      onReject(id);
    },
    [onReject],
  );

  const handleDisableActions = (id: string) => disableActions && onUpdateId === id;

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
                <div className="actions">
                  <Button disabled={handleDisableActions(document.id)} onClick={(e) => handleApprove(e, document.id)}>
                    Aprovar
                  </Button>
                  <Button
                    variant="warning"
                    disabled={handleDisableActions(document.id)}
                    onClick={(e) => handleReject(e, document.id)}
                  >
                    Rejeitar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
});
