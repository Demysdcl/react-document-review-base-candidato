import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { DocumentCards } from '../components/DocumentCards';
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
    assignedTo: null
};

describe('DocumentCards', () => {
    test('renderiza os cards e dispara ações de aprovação e rejeição', async () => {
        const user = userEvent.setup();
        const onApprove = vi.fn();
        const onReject = vi.fn();

        render(
            <DocumentCards
                documents={[sampleDocument]}
                onApprove={onApprove}
                onReject={onReject}
                onSelectDocument={vi.fn()}
            />
        );

        await user.click(screen.getByRole('button', { name: 'Aprovar' }));
        await user.click(screen.getByRole('button', { name: 'Rejeitar' }));

        expect(onApprove).toHaveBeenCalledWith('doc-001');
        expect(onReject).toHaveBeenCalledWith('doc-001');
    });
});
