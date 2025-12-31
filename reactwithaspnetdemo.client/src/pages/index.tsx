import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Listbox, ListboxItem } from '@heroui/react';

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className='w-full max-w-65 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 m-6'>
    {children}
  </div>
);

function Index() {
  const navigate = useNavigate();
  return (
    <ListboxWrapper>
      <Listbox aria-label='Actions' onAction={(key) => navigate(`/${key}`)}>
        <ListboxItem key='material'>Material</ListboxItem>
        <ListboxItem key='solid'>Solid</ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default Index;
