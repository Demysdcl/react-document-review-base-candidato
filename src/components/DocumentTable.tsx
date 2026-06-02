import type { CustomerDocument } from '../types';
import { StatusBadge } from './StatusBadge';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

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
                <button onClick={() => onApprove(document.id)}>Aprovar</button>
                <button onClick={() => onReject(document.id)}>Rejeitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
