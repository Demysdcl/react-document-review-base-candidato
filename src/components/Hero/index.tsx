import { memo } from 'react';
import { Button } from '../Button';
import './styles.css';

type HeroProps = {
  isLoading?: boolean;
};

export const Hero = memo(function Hero({ isLoading }: HeroProps) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Operação interna</p>
        <h1>Documentos de clientes</h1>
        <p className="subtitle">
          Revise documentos classificados automaticamente e acompanhe pendências da operação.
        </p>
      </div>
      <Button disabled={isLoading} onClick={() => window.location.reload()}>Recarregar</Button>
    </section>
  );
});
