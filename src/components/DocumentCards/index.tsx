import { memo, useCallback, useState, type MouseEvent } from 'react';
import type { CustomerDocument } from '../../types';
import { formatDate } from '../../utils/date';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import './styles.css';

type DocumentCardsProps = {
  documents: CustomerDocument[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onSelectDocument: (document: CustomerDocument) => void;
  disableActions?: boolean;
};

export const DocumentCards = memo(function DocumentCards({
  documents,
  onApprove,
  onReject,
  onSelectDocument,
  disableActions = false,
}: DocumentCardsProps) {
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
    <section className="cards-grid" aria-label="Documentos em cartões">
      {documents.map((document) => (
        <article
          key={document.id}
          className="document-card"
          onClick={() => onSelectDocument(document)}
        >
          <header className="document-card__header">
            <div>
              <p className="document-card__eyebrow">{document.category}</p>
              <h3>{document.title}</h3>
              <p className="document-card__id">{document.id}</p>
            </div>
            <StatusBadge status={document.status} />
          </header>

          <dl className="document-card__details">
            <div>
              <dt>Cliente</dt>
              <dd>{document.customerName}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{document.customerEmail || 'Sem e-mail cadastrado'}</dd>
            </div>
            <div>
              <dt>Confiança IA</dt>
              <dd>{Math.round((document.confidence || 0) * 100)}%</dd>
            </div>
            <div>
              <dt>Criado em</dt>
              <dd>{formatDate(document.createdAt)}</dd>
            </div>
            <div>
              <dt>Responsável</dt>
              <dd>{document.assignedTo || 'Não atribuído'}</dd>
            </div>
          </dl>

          <footer className="document-card__actions">
            <Button
              disabled={handleDisableActions(document.id)}
              type="button"
              variant="warning"
              onClick={(event) => handleReject(event, document.id)}
            >
              Rejeitar
            </Button>
            <Button
              disabled={handleDisableActions(document.id)}
              type="button"
              onClick={(event) => handleApprove(event, document.id)}
            >
              Aprovar
            </Button>
          </footer>
        </article>
      ))}
    </section>
  );
});
