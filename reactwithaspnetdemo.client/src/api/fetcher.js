import apiClient from '@/api/apiClient';

// 查询Fetcher
const queryFetcher = (url, { params }) => {
  // 这里的 params 就是你触发时传的 query 参数
  // 可以根据逻辑灵活处理 method
  return apiClient.get(url, { params });
};

// 修改数据Fetcher
const mutationFetcher = (url, { arg }) => {
  const { method = 'post', data } = arg || {};
  return apiClient({
    url,
    method,
    data,
  });
};

// 上传Fetcher
const uploadFetcher = async (url, { arg }) => {
  // arg 是调用 trigger 时传入的对象，例如 { file: File, folder: 'avatar' }
  const formData = new FormData();
  Object.keys(arg).forEach((key) => {
    formData.append(key, arg[key]);
  });

  return apiClient.post(url, formData);
};

export { queryFetcher, mutationFetcher, uploadFetcher };
