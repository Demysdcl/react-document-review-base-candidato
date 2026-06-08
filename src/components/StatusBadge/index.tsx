import { memo } from 'react';
import type { DocumentStatus } from '../../types';
import './styles.css';

const statusLabels: Record<DocumentStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  reviewing: 'Em análise',
};

export const StatusBadge = memo(function StatusBadge({ status }: { status: DocumentStatus }) {
  return <span className={`badge ${status}`}>{statusLabels[status]}</span>;
});
