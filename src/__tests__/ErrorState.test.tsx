import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { ErrorState } from '../components/ErrorState';

afterEach(() => {
  cleanup();
});

describe('ErrorState', () => {
  test('renderiza a mensagem de erro com emoji e aviso acessível', () => {
    render(<ErrorState message="Falha ao carregar documentos" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Não foi possível carregar os documentos')).toBeInTheDocument();
    expect(screen.getByText('Falha ao carregar documentos')).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });
});
