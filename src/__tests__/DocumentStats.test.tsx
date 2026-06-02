import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { DocumentStats } from '../components/DocumentStats';

afterEach(() => {
  cleanup();
});

describe('DocumentStats', () => {
  test('renderiza os indicadores de forma reutilizável', () => {
    render(<DocumentStats stats={{ total: 6, pending: 2, reviewing: 2, rejected: 1 }} />);

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Pendentes')).toBeInTheDocument();
    expect(screen.getByText('Em análise')).toBeInTheDocument();
  });
});
