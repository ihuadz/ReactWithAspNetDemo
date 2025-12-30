import { useCallback, useMemo, useState } from 'react';

import {
  Alert,
  Button,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import {
  PageInput,
  PageResults,
  USER_API,
  User,
  useAction,
  useQuery,
} from '@/api';
import { Icon } from '@iconify/react';

/**
 * 用户管理主页面组件
 * 职责：负责用户列表的展示、搜索、分页逻辑
 */
function UserManage() {
  // 状态定义
  const [pageInput, setPageInput] = useState<PageInput>({
    searchText: '',
    pageNumber: 1,
    pageSize: 5,
    sortName: 'id',
    sortOrder: 'asc',
  });

  /*------------------ Data Fetch -----------------*/
  const { data: userList, isLoading } = useQuery<PageResults<User>>(
    USER_API.PAGES,
    pageInput,
  );

  // 模拟操作：执行特定业务动作
  const { trigger: triggerTest } = useAction(USER_API.TEST);

  const loadingState = isLoading ? 'loading' : 'idle';

  /*------------------ Logical Handles -----------------*/
  // 搜索逻辑
  const onSearchChange = useCallback((value: string) => {
    setPageInput((prev) => ({ ...prev, searchText: value, pageNumber: 1 }));
  }, []);

  const onClear = useCallback(() => {
    setPageInput((prev) => ({ ...prev, searchText: '', pageNumber: 1 }));
  }, []);

  // 分页逻辑
  const onRowsPerPageChange = useCallback((value: string) => {
    setPageInput((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageNumber: 1,
    }));
  }, []);

  const onPageChange = useCallback((page: number) => {
    setPageInput((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  // 单元格渲染逻辑：处理 DTO 到 UI 的转换
  const renderCell = useCallback((item: User, columnKey: React.Key) => {
    const key = columnKey as keyof User;
    switch (key) {
      case 'createdAt':
        return new Date(item[key]).toLocaleString();
      case 'isActive':
        return item[key] ? 'Active' : 'Inactive';
      default:
        return item[key];
    }
  }, []);

  /*------------------ Sub-Components -----------------*/
  // 表格顶部：搜索栏、统计信息
  const topContent = useMemo(
    () => (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by username...'
            startContent={<Icon icon='bi:search' />}
            value={pageInput.searchText || ''}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-800 text-small'>
            Total {userList?.total || 0} users
          </span>
          <label className='flex items-center text-default-800 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-800 text-small'
              value={pageInput.pageSize}
              onChange={(e) => onRowsPerPageChange(e.target.value)}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    ),
    [
      pageInput.searchText,
      pageInput.pageSize,
      userList?.total,
      onSearchChange,
      onClear,
      onRowsPerPageChange,
    ],
  );

  // 表格底部：分页控件
  const bottomContent = useMemo(
    () => (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          isCompact
          showControls
          color='primary'
          page={pageInput.pageNumber}
          total={userList?.totalPage || 0}
          onChange={onPageChange}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={userList?.isFirst || isLoading}
            size='sm'
            variant='flat'
            onPress={() => onPageChange(pageInput.pageNumber - 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={userList?.isLast || isLoading}
            size='sm'
            variant='flat'
            onPress={() => onPageChange(pageInput.pageNumber + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    ),
    [
      userList?.totalPage,
      userList?.isFirst,
      userList?.isLast,
      pageInput.pageNumber,
      isLoading,
      onPageChange,
    ],
  );

  /*------------------ Main Render  -----------------*/
  return (
    <div className='py-6 flex flex-col gap-y-4 px-4 md:px-16 lg:px-24'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold tracking-tight'>User Management</h1>
        <Alert
          hideIcon
          color='primary'
          variant='flat'
          description='Standardized data table with SWR fetching and ProblemDetails handling.'
        />
      </header>

      <div className='flex gap-x-2'>
        <Button
          color='danger'
          variant='flat'
          onPress={() => triggerTest({ id: 1 })}
        >
          Test Error Handling
        </Button>
      </div>

      <Table
        aria-label='User data table'
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn key='id'>ID</TableColumn>
          <TableColumn key='username'>USERNAME</TableColumn>
          <TableColumn key='email'>EMAIL</TableColumn>
          <TableColumn key='passwordHash'>HASH</TableColumn>
          <TableColumn key='createdAt'>CREATED</TableColumn>
          <TableColumn key='isActive'>STATUS</TableColumn>
        </TableHeader>
        <TableBody
          items={userList?.rows ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserManage;
