import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { StatusBadge } from '../components/StatusBadge';

afterEach(() => {
  cleanup();
});

describe('StatusBadge', () => {
  test('renderiza o badge de status com a classe correta', () => {
    render(<StatusBadge status="reviewing" />);

    expect(screen.getByText('Em análise')).toHaveClass('badge', 'reviewing');
  });
});
