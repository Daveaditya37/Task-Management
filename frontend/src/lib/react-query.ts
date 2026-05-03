import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  },
});

export const invalidateQuery = (queryKey: string[]) =>
  queryClient.invalidateQueries({
    queryKey,
  });
