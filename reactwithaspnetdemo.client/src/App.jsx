import { useState, useCallback, useMemo } from 'react';

import { useReq } from '@/hooks/useReq';
import useSWRMutation from 'swr/mutation';
import { queryFetcher } from '@/api/fetcher';

import {
  Alert,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  getKeyValue,
} from '@heroui/react';

function App() {
  const [pageInput, setPageInput] = useState({
    searchText: '',
    pageNumber: 1,
    pageSize: 5,
    sortName: 'id',
    sortOrder: 'asc',
  });

  const onSearchChange = useCallback(
    (value) => {
      setPageInput({ ...pageInput, searchText: value });
    },
    [pageInput]
  );

  const onClear = useCallback(() => {
    setPageInput({ ...pageInput, searchText: '' });
  }, [pageInput]);

  const onRowsPerPageChange = useCallback(
    (value) => {
      console.log('value', value);
      setPageInput({ ...pageInput, pageSize: Number(value) });
    },
    [pageInput]
  );

  /*------------------ Fetch Data -----------------*/
  const { data, isLoading } = useReq('/user/page-list', pageInput);

  const { trigger } = useSWRMutation('/user/test', queryFetcher);

  const loadingState = isLoading ? 'loading' : 'idle';

  const renderCell = useCallback((item, columnKey) => {
    if (columnKey === 'createdAt') {
      return new Date(item[columnKey]).toISOString();
    }
    if (columnKey === 'isActive') {
      return item[columnKey] ? 'Active' : 'Inactive';
    }
    return getKeyValue(item, columnKey);
  }, []);

  const onNextPage = useCallback(() => {
    if (data?.isLast) return;
    setPageInput({ ...pageInput, pageNumber: pageInput.pageNumber + 1 });
  }, [data?.isLast, pageInput]);

  const onPreviousPage = useCallback(() => {
    if (data?.isFirst) return;
    setPageInput({ ...pageInput, pageNumber: pageInput.pageNumber - 1 });
  }, [data?.isFirst, pageInput]);

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by something...'
            // startContent={<SearchIcon />}
            value={pageInput.searchText}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>Total {data?.total || 0} users</span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-solid outline-transparent text-default-400 text-small'
              onChange={(e) => onRowsPerPageChange(e.target.value)}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [pageInput.searchText, onSearchChange, data?.total, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={pageInput.pageNumber}
          total={data?.totalPage || 0}
          onChange={(pageNumber) => {
            setPageInput({ ...pageInput, pageNumber });
          }}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button isDisabled={data?.isFirst} size='sm' variant='flat' onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={data?.isLast} size='sm' variant='flat' onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [data?.isFirst, data?.isLast, data?.totalPage, onNextPage, onPreviousPage, pageInput]);

  return (
    <div className='px-5 flex flex-col gap-y-3'>
      <h1 className='text-xl font-semibold'>Weather forecast</h1>
      <div className='flex gap-x-2'>
        <Button color='danger' onPress={async () => await trigger({ id: 1 })}>
          Test Error
        </Button>
      </div>
      <Alert
        hideIcon
        color='success'
        description='This component demonstrates fetching data from the server.'
      ></Alert>
      <Table
        aria-label='Example static collection table'
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn key='id'>Id</TableColumn>
          <TableColumn key='username'>Username</TableColumn>
          <TableColumn key='email'>Email</TableColumn>
          <TableColumn key='passwordHash'>PasswordHash</TableColumn>
          <TableColumn key='createdAt'>CreatedAt</TableColumn>
          <TableColumn key='isActive'>IsActive</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.rows ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
