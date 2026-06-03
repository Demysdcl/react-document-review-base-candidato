import { memo } from 'react';
import { DocumentStatus } from "../../types";
import './styles.css';

type StatusFilter = DocumentStatus | 'all';

type DocumentToolbarProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
};

export const DocumentToolbar = memo(function DocumentToolbar({ query, status, onQueryChange, onStatusChange }: DocumentToolbarProps) {
  return (
    <section className="toolbar">
      <input
        placeholder="Buscar por título, cliente ou categoria"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select value={status} onChange={(event) => onStatusChange(event.target.value as StatusFilter)}>
        <option value="all">Todos os status</option>
        <option value="pending">Pendente</option>
        <option value="reviewing">Em análise</option>
        <option value="approved">Aprovado</option>
        <option value="rejected">Rejeitado</option>
      </select>
    </section>
  );
});
