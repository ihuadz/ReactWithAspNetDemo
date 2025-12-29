import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ProblemDetails } from './base';

import { addToast } from '@heroui/react';

/**
 * 配置 Axios 实例
 */
const client: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * 响应拦截器：处理成功和失败的响应
 */
client.interceptors.response.use(
  <T = any>(response: AxiosResponse<T>) => {
    // 成功时：直接返回后端数据
    return response.data ?? ({} as T);
  },
  (error: AxiosError) => {
    // 失败时：解析 后端 返回的 ProblemDetails
    const problem = error.response?.data as ProblemDetails;

    const errorTitle = problem?.title || 'Request Failed.';
    const errorDetail = problem?.detail || 'An unexpected error occurred on the server.';

    // 处理额外信息
    const additionalInfo = problem?.additionalInfo;
    const errCode = additionalInfo?.errCode ? ` (Error Code: ${additionalInfo.errCode})` : '';

    // Toast 显示错误详细，根据UI框架调整调用方法
    addToast({
      title: errorTitle + errCode,
      description: `${errorDetail}`,
      color: 'danger',
      variant: 'flat',
      timeout: 6000,
    });

    return Promise.reject(error);
  }
);

export default client;
