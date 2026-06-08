import { memo, useMemo } from 'react';
import { CustomerDocument, Stats } from '../../types';
import './styles.css';

type StatsProps = {
  documents: CustomerDocument[];
};

export const DocumentStats = memo(function DocumentStats({ documents }: StatsProps) {
  const stats = useMemo<Stats>(() => {
    return {
      total: documents.length,
      pending: documents.filter((item) => item.status === 'pending').length,
      reviewing: documents.filter((item) => item.status === 'reviewing').length,
      rejected: documents.filter((item) => item.status === 'rejected').length,
    };
  }, [documents]);

  return (
    <section className="stats" aria-label="Indicadores">
      <div>
        <strong>{stats.total}</strong>
        <span>Total</span>
      </div>
      <div>
        <strong>{stats.pending}</strong>
        <span>Pendentes</span>
      </div>
      <div>
        <strong>{stats.reviewing}</strong>
        <span>Em análise</span>
      </div>
      <div>
        <strong>{stats.rejected}</strong>
        <span>Rejeitados</span>
      </div>
    </section>
  );
});
