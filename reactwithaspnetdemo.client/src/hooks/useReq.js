import useSWR from 'swr';
import { queryFetcher } from '@/api/fetcher';

export function useReq(url, params = null, config = {}) {
  // 如果 url 为 null，SWR 会停止请求
  // 将 params 放入 key 数组中，params 改变时自动刷新数据
  const { data, error, isLoading, mutate } = useSWR(
    url ? [url, params] : null,
    ([url, p]) => queryFetcher(url, { params: p }),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      keepPreviousData: true,
      ...config,
    }
  );

  return {
    data,
    isLoading,
    error,
    refresh: mutate,
  };
}
