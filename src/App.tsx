import { useCallback, useMemo, useState } from 'react';
import { DocumentCards } from './components/DocumentCards';
import { DocumentDrawer } from './components/DocumentDrawer';
import { DocumentStats } from './components/DocumentStats';
import { DocumentTable } from './components/DocumentTable';
import { DocumentToolbar } from './components/DocumentToolbar';
import { ErrorState } from './components/ErrorState';
import { Hero } from './components/Hero';
import { Skeleton } from './components/Skeleton';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useDocuments } from './hooks/useDocuments';
import { useUpdateDocument } from './hooks/useUpdateDocument';
import type { CustomerDocument, DocumentStatus } from './types';

type StatusFilter = DocumentStatus | 'all';

export default function App() {
  const { data: documents = [], isLoading, error } = useDocuments();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 150);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [selectedDocument, setSelectedDocument] = useState<CustomerDocument | null>(null);
  const { mutate, isPending } = useUpdateDocument({
    onSuccess: (document) => {
      setSelectedDocument((current) => (current?.id === document.id ? document : current));
    },
  });

  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) => {
        const baseText =
          `${document.title} ${document.customerName} ${document.category}`.toLowerCase();
        const matchesQuery = baseText.includes(debouncedQuery.toLowerCase());

        const matchesStatus = status === 'all' ? true : document.status === status;
        return matchesQuery && matchesStatus;
      }),
    [documents, debouncedQuery, status],
  );

  const errorMessage = useMemo(
    () => (error instanceof Error ? error.message : 'Falha ao carregar documentos'),
    [error],
  );

  const handleStatusChange = useCallback(async (id: string, nextStatus: DocumentStatus) => {
    mutate({ id, status: nextStatus });
  }, []);

  const handleApprove = useCallback(
    (id: string) => {
      void handleStatusChange(id, 'approved');
    },
    [handleStatusChange],
  );

  const handleReject = useCallback(
    (id: string) => {
      void handleStatusChange(id, 'rejected');
    },
    [handleStatusChange],
  );

  return (
    <main className="page">
      <Hero isLoading={isLoading} />

      <DocumentStats documents={documents} />

      <DocumentToolbar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {isLoading && <Skeleton count={5} />}

      {error && <ErrorState message={errorMessage} />}

      {!isLoading && !error && (
        <>
          <DocumentTable
            documents={filteredDocuments}
            onApprove={handleApprove}
            onReject={handleReject}
            onSelectDocument={setSelectedDocument}
            disableActions={isPending}
          />

          <DocumentCards
            documents={filteredDocuments}
            onApprove={handleApprove}
            onReject={handleReject}
            onSelectDocument={setSelectedDocument}
            disableActions={isPending}
          />
        </>
      )}

      {selectedDocument && (
        <DocumentDrawer document={selectedDocument} onClose={() => setSelectedDocument(null)} />
      )}

      {/* <Toast visible message="Error ao atualizar o documento" /> */}
    </main>
  );
}
