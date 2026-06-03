import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { updateDocumentStatus } from './api';
import { DocumentDrawer } from './components/DocumentDrawer';
import { DocumentStats } from './components/DocumentStats';
import { DocumentTable } from './components/DocumentTable';
import { DocumentToolbar } from './components/DocumentToolbar';
import { ErrorState } from './components/ErrorState';
import { Hero } from './components/Hero';
import { Skeleton } from './components/Skeleton';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useDocuments } from './hooks/useDocuments';
import type { CustomerDocument, DocumentStatus, Stats } from './types';

type StatusFilter = DocumentStatus | 'all';

export default function App() {
  const queryClient = useQueryClient();
  const { data: documents = [], isLoading, error } = useDocuments();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 150);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [selectedDocument, setSelectedDocument] = useState<CustomerDocument | null>(null);

  const stats = useMemo<Stats>(() => {
    return {
      total: documents.length,
      pending: documents.filter((item) => item.status === 'pending').length,
      reviewing: documents.filter((item) => item.status === 'reviewing').length,
      rejected: documents.filter((item) => item.status === 'rejected').length
    };
  }, [documents]);

  const filteredDocuments = useMemo(() => documents.filter((document) => {
    const baseText = `${document.title} ${document.customerName} ${document.category}`.toLowerCase();
    const matchesQuery = baseText.includes(debouncedQuery.toLowerCase());

    const matchesStatus = status === 'all' ? true : document.status === status;
    return matchesQuery && matchesStatus;
  }), [documents, debouncedQuery, status]);

  const errorMessage = useMemo(
    () => error instanceof Error ? error.message : 'Falha ao carregar documentos',
    [error]
  );

  const handleStatusChange = useCallback(async (id: string, nextStatus: DocumentStatus) => {
    const updated = await updateDocumentStatus(id, nextStatus);

    queryClient.setQueryData<CustomerDocument[]>(['documents'], (current = []) =>
      current.map((item) => (item.id === id ? updated : item))
    );

    setSelectedDocument((current) => (current?.id === id ? updated : current));
  }, [queryClient]);

  const handleApprove = useCallback((id: string) => {
    void handleStatusChange(id, 'approved');
  }, [handleStatusChange]);

  const handleReject = useCallback((id: string) => {
    void handleStatusChange(id, 'rejected');
  }, [handleStatusChange]);

  return (
    <main className="page">
      <Hero />

      <DocumentStats stats={stats} />

      <DocumentToolbar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {isLoading && <Skeleton count={5} />}

      {error && <ErrorState message={errorMessage} />}

      {!isLoading && !error && (
        <DocumentTable
          documents={filteredDocuments}
          onApprove={handleApprove}
          onReject={handleReject}
          onSelectDocument={setSelectedDocument}
        />
      )}

      {selectedDocument && (
        <DocumentDrawer document={selectedDocument} onClose={() => setSelectedDocument(null)} />
      )}
    </main>
  );
}
