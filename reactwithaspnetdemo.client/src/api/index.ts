/**
 * src/api/index.ts
 */

// 导出所有的通用类型 (PageInput, PageResults, ProblemDetails)
export * from './base';

// 导出 Axios 实例 (如果你偶尔需要直接用 apiClient.post)
export * from './client';

// 导出 Fetchers (给 SWR 使用)
export * from './fetcher';

// 导出 Hooks (这是业务开发最常用的)
export * from './hooks/useApi';

// 导出业务模块 (可选，如果 modules 很多，也可以让组件单独引用模块)
export * from './modules/user';
