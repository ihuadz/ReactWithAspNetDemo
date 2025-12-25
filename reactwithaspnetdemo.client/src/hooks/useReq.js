import useSWR from 'swr';
import apiClient from '@/api/apiClient';

// 定义通用 fetcher
const fetcher = (url) => apiClient.get(url);

export function useReq(url, config = {}) {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...config,
  });

  return {
    data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
