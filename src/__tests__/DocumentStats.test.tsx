import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { DocumentStats } from '../components/DocumentStats';
import { documents } from '../mocks/data';

afterEach(() => {
  cleanup();
});

describe('DocumentStats', () => {
  test('renderiza os indicadores de forma reutilizável', () => {
    render(<DocumentStats documents={documents} />);

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Pendentes')).toBeInTheDocument();
    expect(screen.getByText('Em análise')).toBeInTheDocument();
  });
});
