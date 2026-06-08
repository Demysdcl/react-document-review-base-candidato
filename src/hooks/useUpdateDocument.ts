import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentStatus } from '../api';
import { ROOT_KEY } from '../keys';
import { CustomerDocument, DocumentStatus } from '../types';

export type UseUpdateDocumentProps = {
  onSuccess?: (document: CustomerDocument) => void;
  onError?: (error: unknown) => void;
};

export const useUpdateDocument = ({ onSuccess, onError }: UseUpdateDocumentProps) => {
  const queryClient = useQueryClient();

  return useMutation<CustomerDocument, unknown, { id: string; status: DocumentStatus }>({
    mutationKey: ['updateDocumentStatus'],
    mutationFn: ({ id, status }) => updateDocumentStatus(id, status),
    onSuccess: (document) => {
      queryClient.setQueryData<CustomerDocument[]>([ROOT_KEY.DOCUMENTS], (current = []) =>
        current.map((item) => (item.id === document.id ? document : item)),
      );
      onSuccess?.(document);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
