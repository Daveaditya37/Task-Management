import { QueryClient } from "@tanstack/react-query";


// ======================================
// QUERY CLIENT
// ======================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  },
});


// ======================================
// INVALIDATE QUERY
// ======================================

export const invalidateQuery = (
  queryKey: string[]
) =>

  queryClient.invalidateQueries({
    queryKey,
  });