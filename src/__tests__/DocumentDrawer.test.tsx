import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { DocumentDrawer } from '../components/DocumentDrawer';
import type { CustomerDocument } from '../types';

afterEach(() => {
  cleanup();
});

const sampleDocument: CustomerDocument = {
  id: 'doc-001',
  title: 'Contrato Social - ACME LTDA',
  customerName: 'ACME LTDA',
  customerEmail: 'financeiro@acme.com',
  status: 'pending',
  category: 'Contrato',
  createdAt: '2026-05-26T10:30:00Z',
  confidence: 0.74,
  assignedTo: null,
};

describe('DocumentDrawer', () => {
  test('renderiza o drawer com os detalhes do documento selecionado', () => {
    render(<DocumentDrawer document={sampleDocument} onClose={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Contrato Social - ACME LTDA' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Cliente: ACME LTDA'),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Status: Pendente'),
    ).toBeInTheDocument();
  });
});
