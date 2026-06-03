import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchDocuments, updateDocumentStatus } from '../api';
import App from '../App';
import { documents } from '../mocks/data';
import type { CustomerDocument, DocumentStatus } from '../types';

vi.mock('../api', () => ({
  fetchDocuments: vi.fn(),
  updateDocumentStatus: vi.fn()
}));

const fetchDocumentsMock = vi.mocked(fetchDocuments);
const updateDocumentStatusMock = vi.mocked(updateDocumentStatus);

function cloneDocuments(): CustomerDocument[] {
  return documents.map((document) => ({ ...document }));
}

function renderApp() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function expectStat(label: string, value: string) {
  const indicators = screen.getByLabelText('Indicadores');
  const labelElement = within(indicators).getByText(label);

  expect(labelElement.previousElementSibling).toHaveTextContent(value);
}

async function waitForDocumentsToLoad() {
  expect((await screen.findAllByText('Contrato Social - ACME LTDA'))[0]).toBeInTheDocument();
}

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fetchDocumentsMock.mockResolvedValue(cloneDocuments());
    updateDocumentStatusMock.mockImplementation(async (id: string, status: DocumentStatus) => {
      const document = cloneDocuments().find((item) => item.id === id);

      if (!document) {
        throw new Error('Documento não encontrado');
      }

      return {
        ...document,
        status,
        updatedAt: '2026-06-02T12:00:00.000Z'
      };
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('renderiza a estrutura inicial e o estado de carregamento', () => {
    fetchDocumentsMock.mockReturnValue(new Promise(() => undefined));

    renderApp();

    expect(screen.getByText('Documentos de clientes')).toBeInTheDocument();
    expect(screen.getByText('Carregando documentos...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por título, cliente ou categoria')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('all');
  });

  test('carrega documentos, indicadores e valores de fallback da tabela', async () => {
    renderApp();
    await waitForDocumentsToLoad();

    expect(fetchDocumentsMock).toHaveBeenCalledTimes(1);
    expectStat('Total', '6');
    expectStat('Pendentes', '2');
    expectStat('Em análise', '2');
    expectStat('Rejeitados', '1');

    expect(screen.getAllByText('doc-001')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Sem e-mail cadastrado')).toHaveLength(6);
    expect(screen.getAllByText('Não atribuído')).toHaveLength(4);
    expect(screen.getAllByText('74%')[0]).toBeInTheDocument();
  });

  test('filtra documentos por texto de busca ignorando maiusculas e minusculas', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    await user.type(screen.getByPlaceholderText('Buscar por título, cliente ou categoria'), 'fiscal');

    await waitFor(() => {
      expect(screen.getAllByText('Nota Fiscal 98217')[0]).toBeInTheDocument();
      expect(screen.getAllByText('DANFE 445901')[0]).toBeInTheDocument();
      expect(screen.queryByText('Contrato Social - ACME LTDA')).not.toBeInTheDocument();
      expect(screen.queryByText('Comprovante de Endereço')).not.toBeInTheDocument();
    });
  });

  test('filtra documentos por status selecionado', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    await user.selectOptions(screen.getByRole('combobox'), 'reviewing');

    await waitFor(() => {
      expect(screen.getAllByText('Comprovante de Endereço')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Procuração Digitalizada')[0]).toBeInTheDocument();
      expect(screen.queryByText('Contrato Social - ACME LTDA')).not.toBeInTheDocument();
      expect(screen.queryByText('Nota Fiscal 98217')).not.toBeInTheDocument();
    });
  });

  test('combina busca textual e filtro por status', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    await user.type(screen.getByPlaceholderText('Buscar por título, cliente ou categoria'), 'fiscal');
    await user.selectOptions(screen.getByRole('combobox'), 'rejected');

    await waitFor(() => {
      expect(screen.getAllByText('DANFE 445901')[0]).toBeInTheDocument();
      expect(screen.queryByText('Nota Fiscal 98217')).not.toBeInTheDocument();
    });
  });

  test('abre e fecha o drawer de detalhes ao clicar em uma linha', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    await user.click(screen.getAllByText('Contrato Social - ACME LTDA')[0]);

    const drawer = screen.getByRole('complementary');
    expect(within(drawer).getByRole('heading', { name: 'Contrato Social - ACME LTDA' })).toBeInTheDocument();
    expect(drawer).toHaveTextContent('Cliente: ACME LTDA');
    expect(drawer).toHaveTextContent('Status: Pendente');
    expect(drawer).toHaveTextContent('Categoria: Contrato');

    await user.click(within(drawer).getByRole('button', { name: '×' }));

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  test('aprova um documento e atualiza a linha na tabela', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    const acmeRow = screen.getAllByText('Contrato Social - ACME LTDA')[0].closest('tr');
    expect(acmeRow).not.toBeNull();

    await user.click(within(acmeRow as HTMLTableRowElement).getByRole('button', { name: 'Aprovar' }));

    await waitFor(() => {
      expect(updateDocumentStatusMock).toHaveBeenCalledWith('doc-001', 'approved');
      expect(within(acmeRow as HTMLTableRowElement).getByText('Aprovado')).toBeInTheDocument();
    });
  });

  test('rejeita um documento e atualiza a linha na tabela', async () => {
    const user = userEvent.setup();

    renderApp();
    await waitForDocumentsToLoad();

    const reviewingRow = screen.getAllByText('Comprovante de Endereço')[0].closest('tr');
    expect(reviewingRow).not.toBeNull();

    await user.click(within(reviewingRow as HTMLTableRowElement).getByRole('button', { name: 'Rejeitar' }));

    await waitFor(() => {
      expect(updateDocumentStatusMock).toHaveBeenCalledWith('doc-003', 'rejected');
      expect(within(reviewingRow as HTMLTableRowElement).getByText('Rejeitado')).toBeInTheDocument();
    });
  });

  test('exibe erro de carregamento quando a API falha', async () => {
    fetchDocumentsMock.mockRejectedValue(new Error('Falha ao carregar documentos'));

    renderApp();

    expect(await screen.findByText('Falha ao carregar documentos')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
