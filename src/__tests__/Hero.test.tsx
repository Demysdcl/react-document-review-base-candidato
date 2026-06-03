import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { Hero } from '../components/Hero';

afterEach(() => {
    cleanup();
});

describe('Hero', () => {
    test('renderiza o cabeçalho e o botão de recarregar', () => {
        render(<Hero />);

        expect(screen.getByText('Operação interna')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Documentos de clientes' })).toBeInTheDocument();
        expect(screen.getByText('Revise documentos classificados automaticamente e acompanhe pendências da operação.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Recarregar' })).toBeInTheDocument();
    });
});
