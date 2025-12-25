import axios from 'axios';
import { addToast } from '@heroui/toast';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (response) => {
    // 成功时：直接返回后端数据
    return response.data;
  },
  (error) => {
    console.log(error);
    // 失败时：解析 GlobalExceptionHandler 返回的 ProblemDetails
    const problem = error.response?.data;
    const status = error.response?.status;

    // 提取标题和细节
    const errorTitle = problem?.title || 'Request Failed.';
    const errorDetail = problem?.detail || 'An unexpected error occurred on the server.';

    // 拿到后端的 TraceId
    const traceId = problem?.traceId || 'N/A';

    // 处理你提到的 Extensions 中的额外信息 (例如 ErrCode)
    const additionalInfo = problem?.additionalInfo;
    const errCode = additionalInfo?.ErrCode ? ` (Error Code: ${additionalInfo.ErrCode})` : '';

    addToast({
      title: errorTitle + errCode,
      description: `${errorDetail} (TraceId: ${traceId})`,
      color: status >= 500 ? 'danger' : 'warning',
      variant: 'flat',
      timeout: 6000,
    });

    return Promise.reject(error);
  }
);

export default apiClient;
