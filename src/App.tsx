import { useEffect, useMemo, useState } from 'react';
import { fetchDocuments, updateDocumentStatus } from './api';
import { DocumentDrawer } from './components/DocumentDrawer';
import { DocumentStats } from './components/DocumentStats';
import { DocumentTable } from './components/DocumentTable';
import { DocumentToolbar } from './components/DocumentToolbar';
import type { CustomerDocument, DocumentStatus } from './types';

type StatusFilter = DocumentStatus | 'all';


export default function App() {
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<CustomerDocument | null>(null);

  useEffect(() => {
    fetchDocuments()
      .then((result) => {
        setDocuments(result);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => {
    return {
      total: documents.length,
      pending: documents.filter((item) => item.status === 'pending').length,
      reviewing: documents.filter((item) => item.status === 'reviewing').length,
      rejected: documents.filter((item) => item.status === 'rejected').length
    };
  }, [documents]);

  const filteredDocuments = documents.filter((document) => {
    const matchesQuery =
      document.title.toLowerCase().includes(query.toLowerCase()) ||
      document.customerName.toLowerCase().includes(query.toLowerCase()) ||
      document.category.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === 'all' ? true : document.status === status;
    return matchesQuery && matchesStatus;
  });

  async function handleStatusChange(id: string, nextStatus: DocumentStatus) {
    const updated = await updateDocumentStatus(id, nextStatus);
    setDocuments((current) => current.map((item) => (item.id === id ? updated : item)));
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Operação interna</p>
          <h1>Documentos de clientes</h1>
          <p className="subtitle">
            Revise documentos classificados automaticamente e acompanhe pendências da operação.
          </p>
        </div>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </section>

      <DocumentStats stats={stats} />

      <DocumentToolbar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {isLoading && <p className="feedback">Carregando documentos...</p>}
      {error && <p className="feedback error">{error}</p>}

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
