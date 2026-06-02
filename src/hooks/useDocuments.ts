import { useQuery } from '@tanstack/react-query';
import { fetchDocuments } from '../api';

export function useDocuments() {
    return useQuery({
        queryKey: ['documents'],
        queryFn: fetchDocuments,
        retry: false,
        staleTime: 30_000,
    });
}
