type StatsProps = {
  stats: {
    total: number;
    pending: number;
    reviewing: number;
    rejected: number;
  };
};

export function DocumentStats({ stats }: StatsProps) {
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
}
