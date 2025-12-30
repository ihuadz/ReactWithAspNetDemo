import { createBrowserRouter } from 'react-router';

import Index from '@/pages';
import MaterialLayout from '@/templates/material/layouts/material-layout';
import MaterialHome from '@/templates/material/pages/home';

import UserManage from '@/pages/users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/material',
    element: <MaterialLayout />,
    children: [
      {
        path: '/material',
        element: <MaterialHome />,
      },
      {
        path: '/material/users',
        element: <UserManage />,
      },
    ],
  },
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
]);
