// Arquivo propositalmente incompleto. O candidato deve melhorar a modelagem.
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'reviewing';
export type DocumentCategory = 'Contrato' | 'Cadastro' | 'Fiscal' | 'Financeiro' | 'Jurídico';

export type CustomerDocument = {
  id: string;
  title: string;
  customerName: string;
  customerEmail?: string;
  status: DocumentStatus;
  category: DocumentCategory;
  createdAt: string;
  updatedAt?: string;
  confidence?: number;
  assignedTo?: string | null;
};

export type Stats = {
  total: number;
  pending: number;
  reviewing: number;
  rejected: number;
};
