import { memo } from 'react';
import './styles.css';

type SkeletonProps = {
  count?: number;
};

export const Skeleton = memo(function Skeleton({ count = 4 }: SkeletonProps) {
  return (
    <section className="skeleton-card" aria-live="polite" aria-busy="true">
      <p className="sr-only">Carregando documentos...</p>

      <div className="skeleton-header">
        <span className="skeleton-line skeleton-line--title" />
        <span className="skeleton-line skeleton-line--small" />
      </div>

      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <span className="skeleton-line skeleton-line--wide" />
          <span className="skeleton-line skeleton-line--medium" />
          <span className="skeleton-line skeleton-line--short" />
        </div>
      ))}
    </section>
  );
});
