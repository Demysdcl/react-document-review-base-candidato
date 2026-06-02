import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { updateDocumentStatus } from './api';
import { DocumentDrawer } from './components/DocumentDrawer';
import { DocumentStats } from './components/DocumentStats';
import { DocumentTable } from './components/DocumentTable';
import { DocumentToolbar } from './components/DocumentToolbar';
import { Hero } from './components/Hero';
import { Skeleton } from './components/Skeleton';
import { useDocuments } from './hooks/useDocuments';
import type { CustomerDocument, DocumentStatus, Stats } from './types';

type StatusFilter = DocumentStatus | 'all';

export default function App() {
  const queryClient = useQueryClient();
  const { data: documents = [], isLoading, error } = useDocuments();
  const [query, setQuery] = useState('');
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
    const matchesQuery = baseText.includes(query.toLowerCase());

    const matchesStatus = status === 'all' ? true : document.status === status;
    return matchesQuery && matchesStatus;
  }), [documents, query, status]);

  const errorMessage = error instanceof Error ? error.message : 'Falha ao carregar documentos';

  async function handleStatusChange(id: string, nextStatus: DocumentStatus) {
    const updated = await updateDocumentStatus(id, nextStatus);

    queryClient.setQueryData<CustomerDocument[]>(['documents'], (current = []) =>
      current.map((item) => (item.id === id ? updated : item))
    );

    setSelectedDocument((current) => (current?.id === id ? updated : current));
  }

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

      {error && <p className="feedback error">{errorMessage}</p>}

      {!isLoading && !error && (
        <DocumentTable
          documents={filteredDocuments}
          onApprove={(id) => handleStatusChange(id, 'approved')}
          onReject={(id) => handleStatusChange(id, 'rejected')}
          onSelectDocument={setSelectedDocument}
        />
      )}

      {selectedDocument && (
        <DocumentDrawer document={selectedDocument} onClose={() => setSelectedDocument(null)} />
      )}
    </main>
  );
}
