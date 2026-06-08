import { useQuery } from '@tanstack/react-query';
import { fetchDocuments } from '../api';
import { ROOT_KEY } from '../keys';

export function useDocuments() {
  return useQuery({
    queryKey: [ROOT_KEY.DOCUMENTS],
    queryFn: fetchDocuments,
    retry: false,
    staleTime: 30_000,
  });
}
