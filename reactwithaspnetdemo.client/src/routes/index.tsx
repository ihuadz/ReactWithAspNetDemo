import { createBrowserRouter } from 'react-router';

import Index from '@/pages';
import MaterialLayout from '@/templates/material/layouts/material-layout';
import MaterialHome from '@/templates/material/pages/home';
import SolidLayout from '@/templates/solid/layouts/solid-layout';
import SigninPage from '@/templates/solid/pages/auth/signin';
import Register from '@/templates/solid/pages/auth/signup';
import BlogPage from '@/templates/solid/pages/blog';
import SingleBlogPage from '@/templates/solid/pages/blog/detail';
import DocsPage from '@/templates/solid/pages/docs';
import ErroPage from '@/templates/solid/pages/error';
import SolidHome from '@/templates/solid/pages/home';
import SupportPage from '@/templates/solid/pages/support';
import { RouteMetadata } from '@/types/router';

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
    path: '/solid',
    element: <SolidLayout />,
    children: [
      {
        path: '/solid',
        element: <SolidHome />,
        handle: {
          title: 'Solid',
        } as RouteMetadata,
      },
      {
        path: '/solid/blog',
        element: <BlogPage />,
        handle: {
          title: 'Blog Page',
          description: 'This is Blog page for Solid Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/blog/details',
        element: <SingleBlogPage />,
        handle: {
          title: 'Blog Details Page',
          description: 'This is Blog details page for Solid Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/signin',
        element: <SigninPage />,
        handle: {
          title: 'Login Page',
          description: 'This is Login page for Startup Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/signup',
        element: <Register />,
        handle: {
          title: 'Sign Up Page',
          description: 'This is Register page for Startup Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/docs',
        element: <DocsPage />,
        handle: {
          title: 'Docs Page',
          description: 'This is Docs page for Startup Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/error',
        element: <ErroPage />,
        handle: {
          title: 'Error Page',
          description: 'This is Error page for Startup Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/support',
        element: <SupportPage />,
        handle: {
          title: 'Support Page',
          description: 'This is Support page for Startup Pro',
        } as RouteMetadata,
      },
      {
        path: '/solid/users',
        element: <UserManage />,
      },
    ],
  },
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
]);
