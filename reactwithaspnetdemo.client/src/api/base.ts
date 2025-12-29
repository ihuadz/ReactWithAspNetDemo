/**
 * 分页输入基类
 */
export interface PageInput<T = any> {
  pageSize: number;
  pageNumber: number;
  searchText?: string | null;
  sortName?: string | null;
  sortOrder?: string | null;
  filter?: T | null; // T 默认为 any，如果不传 T，这里就是 any | null
}

/**
 * 分页结果基类
 */
export interface PageResults<T> {
  total: number;
  totalPage: number;
  pageSize: number;
  pageNumber: number;
  rows: T[];
  readonly hasPrev: boolean;
  readonly hasNext: boolean;
  readonly isFirst: boolean;
  readonly isLast: boolean;
}

/**
 * 微软标准 ProblemDetails 类
 * 基于 RFC 7807 标准
 */
export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}
