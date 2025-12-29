/**
 * 用户模块的 API 常量
 */
const USER_API_BASE = '/users';

/**
 * 用户模块的 URL 常量
 */
export const USER_API = {
  PAGES: `${USER_API_BASE}/pages`,
  DETAIL: (id: number) => `${USER_API_BASE}/detail/${id}`,
  TEST: `${USER_API_BASE}/test`,
  TEST2: `${USER_API_BASE}/test2`,
};

/**
 * 用户数据类型
 */
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  isActive: boolean;
}
