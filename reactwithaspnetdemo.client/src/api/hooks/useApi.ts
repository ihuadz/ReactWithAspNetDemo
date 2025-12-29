import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { queryFetcher, mutationFetcher } from '@/api/fetcher';

/**
 * 用于获取数据 (GET)
 */
export function useQuery<Data = any, Error = any>(
  url: string | null,
  params: Record<string, any> | null = null,
  config: SWRConfiguration<Data, Error> = {}
) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Data, Error>(
    url ? [url, params] : null,
    queryFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      keepPreviousData: true,
      ...config,
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    refresh: mutate,
  };
}

/**
 * 用于修改数据 (POST, PUT, DELETE)
 */
export function useAction<Data = any, Error = any, Arg = any>(
  url: string,
  config?: SWRMutationConfiguration<Data, Error, string, Arg>
) {
  const { trigger, data, error, isMutating, reset } = useSWRMutation<Data, Error, string, Arg>(
    url,
    mutationFetcher,
    config
  );

  return {
    trigger,
    data,
    isMutating,
    error,
    reset,
  };
}
