import type { DocumentStatus } from '../types';

const statusLabels: Record<DocumentStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  reviewing: 'Em análise'
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return <span className={`badge ${status}`}>{statusLabels[status]}</span>;
}
