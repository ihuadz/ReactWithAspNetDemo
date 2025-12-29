import client from '@/api/client';

/**
 * 查询 Fetcher
 */
export const queryFetcher = async <T>([url, params]: [string, Record<string, any> | undefined | null]): Promise<T> => {
  const res = await client.get<T>(url, {
    params: params || undefined,
  });
  return res as T;
};

/**
 * 变更 Fetcher (Mutation)
 */
export const mutationFetcher = async <T = any, R = any>(url: string, { arg }: { arg: R }): Promise<T> => {
  // 默认 POST
  const { method = 'POST', data } = (arg as any) || {};

  // 自定义配置
  const isCustomConfig = arg && typeof arg === 'object' && ('method' in arg || 'data' in arg);

  const res = await client<T>({
    url,
    method: isCustomConfig ? method : 'POST',
    data: isCustomConfig ? data : arg,
  });
  return res as T;
};

/**
 * 上传 Fetcher
 */
export const uploadFetcher = async <T>(url: string, { arg }: { arg: Record<string, any> }): Promise<T> => {
  const formData = new FormData();

  Object.entries(arg).forEach(([key, value]) => {
    // 自动处理 File 或普通字段
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(key, file));
    } else {
      formData.append(key, value);
    }
  });

  const res = await client.post<T>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res as T;
};
